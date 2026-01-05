import React from 'react'
import clsx from 'clsx'
import useTime from '@/hook/useTime'
import loginStore from '@/zustand/loginStore'
import styles from './topDesktopNavbar.module.sass'

export default function TopDesktopNavbar() {
  const { useName } = loginStore()
  const {
    year, monthText, day, hours, minute, second,
  } = useTime()

  return (
    <div className={styles.root}>
      <div className={styles.leftArea}>
        <img
          className={clsx(styles.photo)}
          src="https://picsum.photos/seed/picsum/200/300"
          alt=""
        />
        <p>{useName || 'User'}</p>
      </div>
      <div className={styles.rightArea}>
        <p>{`${monthText} ${day} ${year}, ${hours}:${minute}:${second}`}</p>
      </div>
    </div>
  )
}
