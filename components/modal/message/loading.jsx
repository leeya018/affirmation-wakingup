import { useState } from "react"

import { ModalStore } from "mobx/modalStore"
import { observer } from "mobx-react-lite"

const LoadingModal = observer(({ message, modalName, title }) => {
  return (
    <div
      className={`absolute h-screen top-0 left-0 
     right-0 bottom-0 bg-black shadow-md  
     flex justify-center items-center z-10 bg-opacity-70 ${
       ModalStore.modalName === modalName ? "visible" : "invisible"
     } `}
    >
      <div
        className={`relative bg-white flex flex-col items-center
       justify-center w-[50vh] h-[30vh] border-2 border-[#e2e2e2]`}
      >
        <div className="text-xl font-bold text-center  text-[#35d08c]">
          {message}
        </div>
      </div>
    </div>
  )
})

export default LoadingModal
