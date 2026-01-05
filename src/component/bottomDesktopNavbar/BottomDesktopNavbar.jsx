import React from 'react'
import { desktopBottomRoutes } from '@/router/routes'
import styles from './bottomDesktopNavbar.module.sass'

export default function BottomDesktopNavbar() {
  return (
    <nav className={styles.root}>
      {desktopBottomRoutes?.map((cur) => {
        const IconComponent = cur.icon
        return (
          <div key={cur.id} className={styles.dockItem}>
            <IconComponent />
          </div>
        )
      })}
    </nav>
  )
}
