import React, { useEffect, useRef, useState } from "react"
import Nav from "features/Nav"
import LeftNav from "features/LeftNav"
import Graphs from "components/Graphs"
import { navStore } from "mobx/navStore"
import { navNames } from "@/util"
import { observer } from "mobx-react-lite"
import Calender from "components/Calender"
import { useRouter } from "next/router"

import { addPracticeApi, getFilesByUserApi, getUserApi } from "firebaseDb"

import { UserStore } from "mobx/userStore"
import { ModalStore } from "mobx/modalStore"
import { modals } from "@/util"
import Left from "features/Left"

import Right from "features/Right"
import Settings from "features/Settings"
import { AudioStore } from "mobx/audioStore"
import { messageStore } from "mobx/messageStore"

import ProtectedRoute from "components/ProtectedRoute"

const index = () => {
  const [affirmations, setAffirmations] = useState([])
  // const [isClient, setIsClient] = useState(false)
  const { selectedName } = navStore
  const [txt, setTxt] = useState("")
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (affirmations.length === process.env.LIM_AFFIRMATIONS) {
      ModalStore.openModal(modals.success_message)
    }
  }, [affirmations])
  useEffect(() => {
    if (affirmations.length === process.env.LIM_AFFIRMATIONS) {
      ModalStore.openModal(modals.success_message)
    }
  }, [affirmations])

  const addPractice = async () => {
    try {
      const data = await addPracticeApi(UserStore.user, { voice: 0, type: 1 })
      console.log(data)
      messageStore.setMessage("Practice added successfully", 200)

      ModalStore.openModal(modals.success_message)
    } catch (error) {
      messageStore.setMessage("Could not add Practice ", 500)
    }
  }
  const getUser = async () => {
    const data = await getUserApi(UserStore.user)
    console.log(data)
    if (data.isSuccess) {
      UserStore.setUser(data.data)
    }
  }

  const handleKeyDown = (e) => {
    console.log("handleKeyDown")
    console.log(e.code === "Enter")
    if (e.code === "Enter") {
      if (txt.split(" ").length < 3) return null
      setAffirmations((prev) => [...prev, { name: txt, date: new Date() }])
      setTxt("")("affirmations", JSON.stringify(affirmations))
    }
  }
  if (!UserStore.user) {
    return null
  }
  return (
    <ProtectedRoute>
      <div
        className="w-full h-[100vh] flex flex-col  items-center
      overflow-hidden bg-[#F3F3F7]  "
      >
        {/* modals */}
        {/* nav  */}
        <Nav />
        {/* all other */}
        <div
          className="w-full flex h-[85vh] mt-5 flex-col gap-2 
        md:flex-row md:justify-around md:gap-0 md:px-5 "
        >
          {/* left */}
          {/* do not touch */}
          <LeftNav />
          {/* middle */}

          {selectedName === navNames.home && (
            <div className="flex justify-around gap-4 md:w-[90vw]">
              <Left
                handleKeyDown={handleKeyDown}
                setTxt={setTxt}
                affirmations={affirmations}
                setAffirmations={setAffirmations}
                txt={txt}
                inputRef={inputRef}
              />

              <Right
                affirmations={affirmations}
                setAffirmations={setAffirmations}
              />
            </div>
          )}

          {selectedName === navNames.calender && <Calender />}
          {selectedName === navNames.insights && <Graphs />}
          {selectedName === navNames.settings && <Settings />}
        </div>
      </div>
    </ProtectedRoute>
  )
}
export default observer(index)
