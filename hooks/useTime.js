import React, { useEffect, useMemo, useState } from "react"
import { Howl } from "howler"

function useTime() {
  const [time, setTime] = useState(0)
  const [isStart, setIsStart] = useState(false)

  useEffect(() => {
    if (!isStart) return
    const interval = setTimeout(() => {
      setTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [time, isStart])

  const startTime = () => {
    setIsStart(true)
  }
  const stopTime = () => {
    setIsStart(false)
  }

  return {
    time,
    startTime,
    stopTime,
  }
}

export default useTime
