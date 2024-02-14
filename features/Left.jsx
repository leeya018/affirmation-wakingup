import React, { useEffect, useState } from "react"
import { BiTime } from "react-icons/bi"
import { SiCounterstrike } from "react-icons/si"
import { getTime, modals } from "@/util"
import { ModalStore } from "mobx/modalStore"
import SuccessModal from "components/modal/message/success"
import { addPracticeApi } from "api"
import { UserStore } from "mobx/userStore"
import { observer } from "mobx-react-lite"
import Timer from "components/Timer"

const Left = observer(
  ({ setAffirmations, affirmations, handleKeyDown, inputRef, setTxt, txt }) => {
    const [modalMessage, setModalMessage] = useState("")

    const addPractice = async () => {
      const data = await addPracticeApi({ voice: 0, type: 1 })
      console.log(data)
      setAffirmations([])
      localStorage.setItem("affirmations", "[]")
      setModalMessage(data.message)
      ModalStore.openModal(modals.success_message_type)
    }

    return (
      <div className=" w-[45vw] shadow-rl h-[85vh] hidden lg:flex">
        <div className="w-full flex flex-col gap-4 h-full">
          <SuccessModal
            title={"Message type"}
            modalName={modals.success_message_type}
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
            modalName={modals.db_add_type}
            message={"You finish the typing workout "}
            onClick={addPractice}
            btnTxt={"Save Score"}
          />
          {/* first block */}
          <div
            className="flex-1/4 bg-white shadow-md rounded-xl flex 
        flex-col gap-4 px-6 py-3"
          >
            <div className="text-lg font-bold">
              {UserStore.user?.affirmation}
            </div>
            <div className="flex justify-end items-center gap-3">
              <div className="h-full mr-auto  w-full">
                <input
                  dir="rtl"
                  ref={inputRef}
                  type="text"
                  value={txt}
                  onChange={(e) => setTxt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your short suggestion"
                  className="border-2 border-[#d4d6db]  rounded-md w-[90%] h-10 pr-2"
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
