import React, { useEffect, useState } from "react"
import { BiTime } from "react-icons/bi"
import { SiCounterstrike } from "react-icons/si"
import { getTime, modals } from "@/util"
import useTime from "hooks/useTime"
import { ModalStore } from "mobx/modalStore"
import SuccessModal from "components/modal/message/success"
import { addPracticeApi } from "api"
import { UserStore } from "mobx/userStore"
import { observer } from "mobx-react-lite"
import Timer from "components/Timer"

const affirmationsLim = 100
const timeLimAudio = 5
const Left = observer(
  ({ setAffirmations, affirmations, handleKeyDown, inputRef, setTxt, txt }) => {
    const [modalMessage, setModalMessage] = useState("")

    const { time, startTime, stopTime } = useTime()

    useEffect(() => {
      if (affirmations.length === 1) {
        startTime()
      }
      if (affirmations.length === affirmationsLim) {
        stopTime()

        console.log("UserStore.user", UserStore.user)
        ModalStore.openModal(modals.db_add)
      }
    }, [affirmations])

    const addPractice = async () => {
      const data = await addPracticeApi({ voice: 0, type: 1 })
      console.log(data)
      setModalMessage(data.message)
      ModalStore.openModal(modals.success_message)
    }

    return (
      <div className=" w-[45vw] shadow-rl h-[85vh] ">
        <div className="w-full flex flex-col gap-4 h-full">
          <SuccessModal
            title={"Message"}
            modalName={modals.success_message}
            message={modalMessage}
            onClick={() => {
              setAffirmations([])
              localStorage.removeItem("affirmations")
              ModalStore.closeModal()
            }}
            btnTxt={"Done"}
          />
          <SuccessModal
            title={"Done workout"}
            modalName={modals.db_add}
            message={"You finish the typing workout "}
            onClick={addPractice}
            btnTxt={"Save Score"}
          />
          {/* first block */}
          <div
            className="flex-1/4 bg-white shadow-md rounded-xl flex 
        flex-col gap-4 p-6"
          >
            <div className="text-lg font-bold">
              {UserStore.user?.affirmation}
            </div>
            <div className="flex justify-end items-center gap-3">
              <div className="h-full mr-auto">
                <input
                  dir="rtl"
                  ref={inputRef}
                  type="text"
                  value={txt}
                  onChange={(e) => setTxt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your short suggestion"
                  className="border-2 border-[#d4d6db]  rounded-md w-[20rem] h-10 pr-2"
                />
              </div>
              <div className="flex justify-end items-center gap-6">
                {/* first item */}
                <div className="flex justify-center items-center h-16 gap-3">
                  <div className="h-full">
                    <SiCounterstrike size={30} />
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    <div className="font-bold text-xl">
                      {affirmations.length}
                    </div>
                    <div>Strikes</div>
                  </div>
                </div>
                {/* second item */}
                <div className="flex  justify-center items-center rounded-md h-16 gap-3">
                  <div className="h-full">
                    <BiTime size={30} />
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    <Timer time={time} />
                    {/* <div className="font-bold text-xl">{formatSeconds(time)}</div> */}
                    <div>Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* second block */}
          <div className=" bg-white shadow-md rounded-xl h-full ">
            <div className=" rounded-lg p-1">
              <ul
                className="flex flex-col gap-2 pt-2 overflow-y-scroll 
            scrollbar scrollbar-thumb-[#d4d6db] scrollbar-track-white 
            scrollbar-thumb-rounded "
              >
                {affirmations.length > 0 &&
                  affirmations
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((affirmation, key) => (
                      <li
                        key={key}
                        className="mx-10 p-3 flex flex-col  rounded-xl
                  font-semibold bg-[#F5F8FD] gap-1"
                      >
                        {/* <div className="text-xl">this is good</div>
                    <div className="text-sm ">10:20:40</div> */}
                        <div className="text-xl">{affirmation.name}</div>
                        <div className="text-xl">
                          {" "}
                          {getTime(affirmation.date)}
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
export default Left
