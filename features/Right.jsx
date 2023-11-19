import React, { useEffect, useState } from "react"
import { BiBell } from "react-icons/bi"
import Image from "next/image"
import { AiOutlinePlayCircle } from "react-icons/ai"
import { BiTime } from "react-icons/bi"
import { LiaStopCircle } from "react-icons/lia"
import useSound from "hooks/useSound"
import Timer from "../components/Timer"
import SuccessModal from "../components/modal/message/success"
import { addPracticeApi, getImageApi } from "api"
import SuccessButton from "ui/button/modal/success"
import { modalStore } from "mobx/modalStore"
import { modals } from "@/util"
import useTime from "hooks/useTime"
import { UserStore } from "mobx/userStore"
import { observer } from "mobx-react-lite"
const timeLimAudio = 1800

const EModalType = {
  success: "success",
  basic: "basic",
  none: "none",
}

function Right({ affirmations, setAffirmations }) {
  const { stopSound, playSound, sound } = useSound("./Teeth_suggestion.mp3")
  const [timeAudio, setTimeAudio] = useState(0)
  const [currModal, setCurrModal] = useState(EModalType.none)
  const { time, startTime, stopTime } = useTime()
  const [modalMessage, setModalMessage] = useState("")
  console.log("imageAffirmation", UserStore.user?.imageAffirmation)

  useEffect(() => {
    if (time > timeLimAudio) {
      stopTime()
      stopSound()
      modalStore.openModal(modals.db_add)
    }
  }, [time])

  const playSuggestion = () => {
    playSound()
    startTime()
  }
  const stopSuggestion = () => {
    stopSound()
    stopTime()
  }
  const addPractice = async () => {
    const data = await addPracticeApi({ voice: 1, type: 0 })
    console.log(data)
    setModalMessage(data.message)
    modalStore.openModal(modals.success_message)
  }
  return (
    <div className="  w-[45vw] rounded-xl h-[85vh] flex flex-col items-center gap-4">
      {/* <SuccessButton
        onClick={async () => {
          modalStore.openModal(modals.success_message)
        }}
      >
        Done
      </SuccessButton>
      <SuccessButton
        onClick={async () => {
          localStorage.setItem("affirmations", "[]")
          setAffirmations([])
        }}
      >
        Reset
      </SuccessButton>
      {
        <SuccessModal
          isVisble={EModalType.success === currModal}
          message={"You finish the voice"}
          onClick={() => addPracticeApi({ voice: 0, type: 1 })}
        />
      } */}
      <div className="p-6 bg-white w-full rounded-xl h-[10rem] flex items-center justify-around text-lg font-bold">
        <div className="flex justify-center items-center gap-2">
          <SuccessModal
            title={"Message"}
            modalName={modals.success_message}
            message={modalMessage}
            onClick={() => modalStore.closeModal()}
            btnTxt={"Done"}
          />
          <SuccessModal
            title={"Done workout"}
            modalName={modals.db_add}
            message={"You finish the voice workout "}
            onClick={addPractice}
            btnTxt={"Save Score"}
          />
          <BiTime size={30} onClick={playSuggestion} />
          <Timer time={time} />
        </div>
        <div>affirmation name</div>
        {sound.playing() ? (
          <LiaStopCircle
            size={30}
            className="cursor-pointer text-[#CFCFD0]"
            onClick={stopSuggestion}
          />
        ) : (
          <AiOutlinePlayCircle
            size={30}
            onClick={playSuggestion}
            className="cursor-pointer text-[#7ED5FE]"
          />
        )}
      </div>
      <div
        className="p-6 bg-white w-full rounded-xl 
      h-full flex justify-center items-center"
      >
        <Image
          alt="profile image"
          width={500}
          height={500}
          className={`rounded-lg
   
        `}
          style={{
            opacity: 1,
          }}
          src={UserStore.user?.imageAffirmation}
          // src={"/smile.png"}
        />
      </div>
    </div>
  )
}
export default observer(Right)
