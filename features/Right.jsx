import React, { useEffect, useState } from "react"
import Image from "next/image"
import { AiOutlinePlayCircle } from "react-icons/ai"
import { BiTime } from "react-icons/bi"
import { LiaStopCircle } from "react-icons/lia"
import useSound from "hooks/useSound"
import Timer from "../components/Timer"
import SuccessModal from "../components/modal/message/success"
import { addPracticeApi } from "api"
import { ModalStore } from "mobx/modalStore"
import { modals } from "@/util"
import useTime from "hooks/useTime"
import { UserStore } from "mobx/userStore"
import { observer } from "mobx-react-lite"
import { TfiAnnouncement } from "react-icons/tfi"
import SuccessButton from "ui/button/modal/success"

const EModalType = {
  success: "success",
  basic: "basic",
  none: "none",
}

function Right({ affirmations, setAffirmations }) {
  const { stopSound, playSound, sound, setSound } = useSound(
    "./Teeth_suggestion.mp3"
  )
  const { time, startTime, stopTime, setTime } = useTime()
  const [modalMessage, setModalMessage] = useState("")
  console.log("imageAffirmation", UserStore.user?.imageAffirmation)

  useEffect(() => {
    if (time > process.env.NEXT_PUBLIC_AUDIO_LIM) {
      stopTime()
      stopSound()
      ModalStore.openModal(modals.db_add_voice)
    }
  }, [time])

  useEffect(() => {
    if (UserStore?.user?.audioAffirmation) {
      setSound(UserStore?.user?.audioAffirmation)
    }
  }, [UserStore?.user?.audioAffirmation])

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
    stopSuggestion()
    setTime(0)
    ModalStore.openModal(modals.success_message_voice)
  }
  return (
    <div className="   rounded-xl  flex flex-col items-center  gap-4 w-full  md:w-[45vw] md:h-[85vh]">
      {/* <SuccessButton
        onClick={async () => {
          ModalStore.openModal(modals.success_message_voice)
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
      {/* <SuccessButton onClick={addPractice}>add practice</SuccessButton> */}
      <div className="p-6 bg-white w-full rounded-xl  shadow-md flex items-center justify-around text-lg font-bold">
        {/* first div */}

        <div className="flex justify-center items-center gap-2 w-full ">
          <SuccessModal
            title={"Message voice"}
            modalName={modals.success_message_voice}
            message={modalMessage}
            onClick={() => ModalStore.closeModal()}
            btnTxt={"Done"}
          />
          <SuccessModal
            title={"Done workout"}
            modalName={modals.db_add_voice}
            message={"You finish the voice workout "}
            onClick={addPractice}
            btnTxt={"Save Score"}
          />

          <div className="flex justify-between  items-center gap-2 w-full">
            <div className="flex gap-2">
              <BiTime size={30} onClick={playSuggestion} />
              <Timer time={time} />
            </div>

            <div>{"my affirmation sound"}</div>
            {sound?.playing() ? (
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
        </div>
      </div>
      {/* second div */}
      <div
        className="p-6 bg-white w-full rounded-xl  relative h-full
        justify-center items-center shadow-md flex"
      >
        <div className="absolute top-1 left-1/2 -translate-x-1/2  flex items-center gap-2 ">
          <TfiAnnouncement size={20} />
          <div>Image will get clearer with typing more</div>
        </div>
        <Image
          alt="affirmation image"
          width={400}
          height={400}
          className={`rounded-lg
   
        `}
          style={{
            opacity:
              affirmations.length /
              parseInt(process.env.NEXT_PUBLIC_AFFIRMATION_LIM),
          }}
          src={UserStore.user?.imageAffirmation}
          // src={"/smile.png"}
        />
      </div>
    </div>
  )
}
export default observer(Right)
