import {
  React, useEffect, useState, useCallback
} from 'react'
import { MdArrowForward } from 'react-icons/md'
import clsx from 'clsx'
import loginStore from '@/zustand/loginStore'
import useTime from '@/hook/useTime'
import { useNavigate } from 'react-router-dom'
import styles from './loginView.module.sass'

const LOADING_TIME = 1.5 // 秒

function LoginView() {
  const { useName } = loginStore()
  const {
    month, day, hours, minute, week,
  } = useTime()
  const navigate = useNavigate()

  // stage: 'idle' | 'progress' | 'welcome'
  const [stage, setStage] = useState('idle')
  const [isMounted, setIsMounted] = useState(false)

  const handleClick = useCallback(() => {
    if (stage !== 'idle') return
    setStage('progress')
    setTimeout(() => {
      setStage('welcome')
      setTimeout(() => {
        navigate('/desktopView') // 動畫結束後跳到 /desktop
      }, LOADING_TIME * 1000)
    }, LOADING_TIME * 1000)
  }, [stage, navigate])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className={styles.root}>
      {/* 時間區塊 */}
      <div className={clsx(styles.timeContent, isMounted && styles.fadeIn)}>
        <p className={styles.date}>{`${month}月${day}日 ${week}`}</p>
        <p className={styles.time}>{`${hours}:${minute}`}</p>
      </div>

      {/* 登入區塊 */}
      <div className={clsx(styles.loginContent, isMounted && styles.fadeIn)}>
        {/* 大頭貼 */}
        <img
          className={clsx(styles.photo, stage === 'welcome' && styles.breath)}
          src="https://picsum.photos/seed/picsum/200/300"
          alt=""
        />

        <div className={styles.bottom}>
          <div className={styles.welcomeArea}>
            {stage !== 'progress'
              ? (
                <p className={styles.welcome}>
                  {stage === 'idle'
                    ? `Hello ${useName || 'User'}` : `Welcome ${useName || 'User'} !`}
                </p>
              ) : (
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ '--loading-time': `${LOADING_TIME}s` }}
                  />
                </div>
              )}
          </div>

          {/* 按鈕只在 idle 狀態出現 */}
          {stage === 'idle' && (
            <button type="button" className={styles.button} onClick={handleClick}>
              <MdArrowForward className={styles.btnIcon} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginView
