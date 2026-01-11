import React, {
  useMemo, useState, useCallback, useEffect
} from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
  MdOutlineHorizontalRule, MdOutlineSquare, MdClose, MdOutlineFilterNone, MdOutlineArrowBackIos
} from 'react-icons/md'
import useDesktopStore from '@/zustand/desktopStore'
import useWindowStore from '@/zustand/windowStore'
import LoadingAnim from '@/component/loadingAnim'
import WorkWindow from '../workWindow'
import styles from './window.module.sass'

function Window({
  id = null, title = '', children = null, zIndex = null,
  x = 0, y = 0, icon = null, isProject = false, isActive = false,
}) {
  const {
    closeWindow, focusWindow,
  } = useDesktopStore()
  const {
    minWindowSize, resizeHandlerList, getefaultWindowSize, onMouseMovePos,
    onMouseResize, isLoadingList, setProjectTitleList, projectTitleList, isMenuOpenList,
    setIsMenuOpenList, iframeUrlList,
  } = useWindowStore()

  const [size, setSize] = useState({
    width: getefaultWindowSize().width,
    height: getefaultWindowSize().height,
  })
  const [pos, setPos] = useState({ x, y })
  const [isMaximized, setIsMaximized] = useState(false)
  const [shouldTransition, setShouldTransition] = useState(false)
  const [isOperating, setIsOperating] = useState(false)

  useEffect(() => {
    setProjectTitleList(id, title)
    if (isProject) setIsMenuOpenList(id, true)
  }, [id, setProjectTitleList, title, isProject, setIsMenuOpenList])

  // 視窗處理拖曳 (加入邊界限制)
  const handleMovePos = (e) => {
    focusWindow(id)
    if (isMaximized) return
    setShouldTransition(false)

    onMouseMovePos(e, pos, size, setPos)
  }

  // 視窗處理縮放
  // type: 'width' (右拉), 'height' (下拉), 'both' (右下拉)
  const handleResize = (e, type) => {
    focusWindow(id)
    setShouldTransition(false)
    setIsOperating(true)

    onMouseResize(e, size, setSize, type, pos, setIsOperating)
  }

  const toggleMaximize = useCallback(() => {
    setShouldTransition(true)
    setIsMaximized(!isMaximized)
  }, [isMaximized])

  const handleMinimizeSize = useCallback((e) => {
    e.stopPropagation() // 阻止事件冒泡到 Header
    setShouldTransition(true) // 開啟滑順動畫
    setIsMaximized(false) // 如果原本是最大化，先取消最大化

    // 直接設定為你要求的最小尺寸
    setSize(minWindowSize)
  }, [minWindowSize])

  const rightButtonList = useMemo(() => [{
    onClickFn: handleMinimizeSize,
    icon: <MdOutlineHorizontalRule />,
  }, {
    onClickFn: toggleMaximize,
    icon: isMaximized ? <MdOutlineFilterNone /> : <MdOutlineSquare />,
  }, {
    onClickFn: (e) => {
      e.stopPropagation()
      closeWindow(id)
    },
    icon: <MdClose />,
  }], [closeWindow, handleMinimizeSize, id, isMaximized, toggleMaximize])

  return (
    <div
      role="presentation"
      className={clsx(styles.windowContainer, { [styles.maximized]: isMaximized })}
      style={{
        zIndex,
        left: isMaximized ? 0 : pos.x,
        top: isMaximized ? 0 : pos.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? '100vh' : size.height,
        transition: shouldTransition ? 'all 0.3s ease' : 'none',
        minWidth: minWindowSize.width,
        minHeight: minWindowSize.height,
      }}
      onMouseDown={() => { focusWindow(id) }}
    >
      {/* Header */}
      <div
        role="presentation"
        className={styles.windowHeader}
        onDoubleClick={toggleMaximize}
        onMouseDown={handleMovePos}
      >
        <div className={styles.hearderLeft}>
          {isProject ? (
            <button
              type="button"
              onClick={() => setIsMenuOpenList(id, !isMenuOpenList[id])}
              className={clsx(styles.workMenu, isMenuOpenList[id] && styles.workMenuOpen)}
              onDoubleClick={e => e.stopPropagation()}
            >
              <MdOutlineArrowBackIos />
            </button>
          ) : <p className={styles.icon}>{icon ?? ''}</p>}

          <p className={styles.hearderTitle}>{isProject ? projectTitleList[id] : title}</p>
        </div>

        <div className={styles.hearderRight}>
          {rightButtonList.map((cur, index) => (
            <button
              key={`${index.toString()}`}
              type="button"
              onMouseDown={e => e.stopPropagation()}
              onClick={cur.onClickFn}
            >
              {cur.icon}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.windowContent}>

        {isProject ? (
          <WorkWindow
            id={id}
            isActive={isActive}
          />
        ) : (
          children
        )}

        {/* 遮罩，避免縮放時按到iframe 的內容 */}
        {isOperating && (<div className={styles.overlay} />)}

        {(isLoadingList[id] || iframeUrlList[id] === undefined) && (
          <LoadingAnim
            isLoading={isLoadingList[id]}
            loadingText={'載入中...'}
            notLoadingText={'請選擇要檢視的作品'}
          />
        )}
      </div>

      {/* 縮放控制區域 */}
      {!isMaximized && resizeHandlerList?.map(cur => (
        <div
          key={cur.type}
          aria-hidden="true"
          onMouseDown={e => handleResize(e, cur.type)}
          className={styles.resizeHandlerContent}
          style={{ ...cur.style }}
        />
      ))}
    </div>
  )
}

export default Window

Window.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  zIndex: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  icon: PropTypes.node,
  isProject: PropTypes.bool,
  isActive: PropTypes.bool,
}
