import React, { useEffect } from 'react'
import TopDesktopNavbar from '@/component/topDesktopNavbar'
import BottomDesktopNavbar from '@/component/bottomDesktopNavbar'
// import Window from '@/view/window'
import clsx from 'clsx'
import loginStore from '@/zustand/loginStore'
import { desktopAppRoutes } from '@/router/routes'
// import useDesktopStore from '@/zustand/desktopStore'
import styles from './desktopView.module.sass'

function Desktop() {
  const { tableCloth } = loginStore()
  // const { windowList, setWindowList } = useDesktopStore()

  // useEffect(() => {
  //   setWindowList([{
  //     id: 'win1', title: '專案 A', zIndex: 100, isProject: true,
  //   }, {
  //     id: 'win2', title: '專案 B', zIndex: 101, isProject: true,
  //   }])
  // }, [setWindowList])

  // const handleClose = (id) => {
  //   setWindowList(prev => prev.filter(w => w.id !== id))
  // }

  // const handleFocus = (id) => {
  //   setWindowList((prev) => {
  //   // 找到目前的最高 zIndex
  //     const maxZ = Math.max(...prev.map(w => w.zIndex))

  //     return prev.map((w) => {
  //       if (w.id === id) {
  //       // 如果已經是最高了就不用改，否則設為最高 + 1
  //         return { ...w, zIndex: maxZ + 1 }
  //       }
  //       return w
  //     })
  //   })
  // }

  // const maxZ = Math.max(...windowList.map(w => w.zIndex))

  return (
    <div className={styles.root}>
      <TopDesktopNavbar />
      {/* 桌布 */}
      <div
        className={clsx('bg-fit', styles.backgroundCanvas)}
        style={{ backgroundImage: `url('${tableCloth}')` }}
      />

      {/* 圖示區域 */}
      <div className={styles.iconGrid}>
        {desktopAppRoutes?.map(icon => (
          <div key={icon.id} className={styles.desktopIcon}>
            <div className={styles.iconImage}>{icon.icon}</div>
            <span className={styles.iconName}>{icon.name}</span>
          </div>
        ))}
      </div>

      {/* {windowList?.map((win, index) => (
        <Window
          key={win.id}
          zIndex={win.zIndex}
          x={50 + index * 40}
          y={50 + index * 40}
          isProject={win?.isProject}
          // onFocus={() => handleFocus(win.id)}
          isActive={win.zIndex === maxZ}
          // onClose={() => handleClose(win.id)}
        />
      ))} */}

      {/* 底部工具欄 Dock */}
      <BottomDesktopNavbar />
    </div>
  )
}

export default Desktop
