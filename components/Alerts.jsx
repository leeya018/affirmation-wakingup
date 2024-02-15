import { observer } from "mobx-react-lite"
import { messageStore } from "mobx/messageStore"
import React, { useEffect } from "react"
let timeoutInter = null
const Alerts = observer(() => {
  const { message, setMessage, status } = messageStore
  useEffect(() => {
    timeoutInter = setTimeout(() => {
      setMessage("", 0)
    }, 3000)
    return () => clearInterval(timeoutInter)
  }, [message])

  const isSuccess = (status) => {
    return status === 200 || status === 201
  }
  return (
    <div
      className={`${
        status === 0 ? "hidden" : "absolute"
      }   top-0 left-0 right-0 z-50 w-screen flex justify-center  items-center h-10`}
    >
      <div
        className={`${
          isSuccess(status) ? "bg-green" : "bg-red"
        } w-full flex justify-center items-center h-full bg-opacity-75`}
      >
        {message}
      </div>
    </div>
  )
})

export default Alerts
