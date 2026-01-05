import { useEffect, useState } from 'react'

const pad = n => n.toString().padStart(2, '0')

const weekMap = ['日', '一', '二', '三', '四', '五', '六']

const monthList = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
}

function useTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const year = pad(time.getFullYear())
  const month = pad(time.getMonth() + 1)
  const day = pad(time.getDate())
  const hours = pad(time.getHours())
  const minute = pad(time.getMinutes())
  const second = pad(time.getSeconds())
  const week = `星期${weekMap[time.getDay()]}`

  return {
    year,
    month,
    day,
    hours,
    minute,
    second,
    week,
    monthText: monthList[month],
  }
}

export default useTime
