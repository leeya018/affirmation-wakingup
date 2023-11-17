import React, { useEffect, useRef, useState } from "react"
import Nav from "features/Nav"
import LeftNav from "features/LeftNav"
import MiddleAffirmations from "components/MiddleAffirmations"
import Image from "next/image"
import RightNav from "features/Right"
import Graphs from "components/Graphs"
import { navStore } from "mobx/navStore"
import { navNames } from "@/util"
import { observer } from "mobx-react-lite"
import Calender from "components/Calender"
import PieChart from "components/PieChart"

import { useRouter } from "next/router"

import { getUserApi } from "api"
import { create } from "mobx-persist"
import { UserStore } from "mobx/userStore"
import { modalStore } from "mobx/modalStore"
import { modals } from "@/util"

import Left from "features/LeftBottom"

import Right from "features/Right"
import Settings from "features/Settings"

const index = () => {
  const [affirmations, setAffirmations] = useState([])
  const { selectedName } = navStore
  const [txt, setTxt] = useState("")
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      getUser()
    }, 1000)

    const localAffirmations = localStorage.getItem("affirmations") || "[]"
    const localTime = localStorage.getItem("time") || 0
    console.log(parseInt(localTime))
    setAffirmations(JSON.parse(localAffirmations))
  }, [])

  useEffect(() => {
    if (affirmations.length === process.env.LIM_AFFIRMATIONS) {
      modalStore.openModal(modals.success_message)
    }
  }, [affirmations])

  const getUser = async () => {
    const data = await getUserApi()
    console.log(data)
    if (data.isSuccess) {
      UserStore.setUser(data.data)
    }
  }

  const handleKeyDown = (e) => {
    console.log("handleKeyDown")
    console.log(e.code === "Enter")
    if (e.code === "Enter") {
      if (txt.length < 20) return null
      setAffirmations((prev) => [...prev, { name: txt, date: new Date() }])
      setTxt("")
      localStorage.setItem("affirmations", JSON.stringify(affirmations))
    }
  }

  return (
    <div
      className="w-full border-2 h-[100vh] flex  items-center
     overflow-hidden bg-[#F3F3F7]"
    >
      {/* modals */}

      {/* nav  */}
      <Nav />
      {/* all other */}
      <div className="w-full flex justify-around h-[80vh] gap-5 mx-6">
        {/* left */}
        {/* do not touch */}
        <LeftNav />
        {/* middle */}

        <Left
          handleKeyDown={handleKeyDown}
          setTxt={setTxt}
          affirmations={affirmations}
          txt={txt}
          inputRef={inputRef}
        />

        {/* right */}

        {selectedName === navNames.home && (
          <Right
            affirmations={affirmations}
            setAffirmations={setAffirmations}
          />
        )}
        {selectedName === navNames.calender && <Calender />}
        {selectedName === navNames.settings && <Settings />}
        {/* {selectedName === navNames.insights && ( */}
      </div>
    </div>
  )
}
export default observer(index)
