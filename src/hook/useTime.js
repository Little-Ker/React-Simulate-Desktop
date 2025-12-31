import { useEffect, useState } from 'react'

const pad = n => n.toString().padStart(2, '0')

const weekMap = ['日', '一', '二', '三', '四', '五', '六']

function useTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const month = pad(time.getMonth() + 1)
  const day = pad(time.getDate())
  const hours = pad(time.getHours())
  const minute = pad(time.getMinutes())
  const second = pad(time.getSeconds())
  const week = `星期${weekMap[time.getDay()]}`

  return {
    month,
    day,
    hours,
    minute,
    second,
    week,
  }
}

export default useTime
