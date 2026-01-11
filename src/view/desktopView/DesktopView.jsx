import React, { useCallback } from 'react'
import TopDesktopNavbar from '@/component/topDesktopNavbar'
import BottomDesktopNavbar from '@/component/bottomDesktopNavbar'
import Window from '@/view/window'
import clsx from 'clsx'
import loginStore from '@/zustand/loginStore'
import { desktopAppRoutes } from '@/router/routes'
import useDesktopStore from '@/zustand/desktopStore'
import styles from './desktopView.module.sass'

function Desktop() {
  const { tableCloth } = loginStore()
  const {
    windowList, openWindow, getWindowMaxZ,
  } = useDesktopStore()

  const onOpenApp = useCallback(() => {
    openWindow({
      title: 'vivi\'s side project',
      isProject: true,
    })
  }, [openWindow])

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
          <div key={icon.id} onDoubleClick={onOpenApp} className={styles.desktopIcon}>
            <div className={styles.iconImage}>{icon.icon}</div>
            <span className={styles.iconName}>{icon.name}</span>
          </div>
        ))}
      </div>

      {windowList?.map((win, index) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          zIndex={win.zIndex}
          x={50 + index * 40}
          y={50 + index * 40}
          isProject={win?.isProject}
          isActive={win.zIndex === getWindowMaxZ()}
        />
      ))}

      {/* 底部工具欄 Dock */}
      <BottomDesktopNavbar />
    </div>
  )
}

export default Desktop
