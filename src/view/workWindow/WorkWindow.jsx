import React from 'react'
import useWindowStore from '@/zustand/windowStore'
import PropTypes from 'prop-types'
import WorkMenu from '@/component/workMenu'

function WorkWindow({
  id = null, isActive = false,
}) {
  const {
    setIsLoadingList, setProjectTitleList, setIsMenuOpenList, isMenuOpenList, iframeUrlList,
    setIframeUrlList,
  } = useWindowStore()

  const handleWorkChange = ({ url, workTitle }) => {
    if (url === iframeUrlList[id]) return // 避免重複點擊相同連結

    setIsLoadingList(id, true)
    setIframeUrlList(id, url)
    setIsMenuOpenList(id, false)
    setProjectTitleList(id, workTitle)
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* 左側作品選單 */}
      <WorkMenu
        handleWorkChange={handleWorkChange}
        isMenuOpen={isMenuOpenList[id]}
      />

      <iframe
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        src={iframeUrlList[id]}
        style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        title="window-content"
        onLoad={() => setIsLoadingList(id, false)}
      />
    </div>
  )
}

export default WorkWindow

WorkWindow.propTypes = {
  id: PropTypes.string,
  isActive: PropTypes.bool,
}
