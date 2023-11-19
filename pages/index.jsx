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

import { addPracticeApi, getUserApi } from "api"
import { create } from "mobx-persist"
import { UserStore } from "mobx/userStore"
import { modalStore } from "mobx/modalStore"
import { modals } from "@/util"
import Left from "features/LeftBottom"

import Right from "features/Right"
import Settings from "features/Settings"
import { auth, db } from "@/firebase"
import ApproveButton from "ui/button/modal/approve"
import { collection, getDocs, onSnapshot, query } from "firebase/firestore"

const index = () => {
  const [affirmations, setAffirmations] = useState([])
  const { selectedName } = navStore
  const [txt, setTxt] = useState("")
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    // setTimeout(() => {
    getUser()
    // }, 3000)

    const localAffirmations = localStorage.getItem("affirmations") || "[]"
    const localTime = localStorage.getItem("time") || 0
    console.log(parseInt(localTime))
    setAffirmations(JSON.parse(localAffirmations))
    // test()
  }, [])

  // const test = async () => {
  //   // const userDocRef = collection(db, "users", "dOav3JCkRKgIO2chpJSlOUpxlTa2")

  //   const q = query(collection(db, "users"))

  //   const querySnapshot = await getDocs(q)
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data())
  //   })
  // }
  useEffect(() => {
    if (affirmations.length === process.env.LIM_AFFIRMATIONS) {
      modalStore.openModal(modals.success_message)
    }
  }, [affirmations])

  const addPractice = async () => {
    const data = await addPracticeApi({ voice: 0, type: 1 })
    console.log(data)
    modalStore.openModal(modals.success_message)
  }
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
        {/* <ApproveButton onClick={test}>test</ApproveButton> */}
        <ApproveButton onClick={addPractice}>addPractice</ApproveButton>
        {/* left */}
        {/* do not touch */}
        <LeftNav />
        {/* middle */}
        {selectedName === navNames.home && (
          <>
            <Left
              handleKeyDown={handleKeyDown}
              setTxt={setTxt}
              affirmations={affirmations}
              txt={txt}
              inputRef={inputRef}
            />

            {/* right */}

            <Right
              affirmations={affirmations}
              setAffirmations={setAffirmations}
            />
          </>
        )}
        {selectedName === navNames.calender && <Calender />}
        {selectedName === navNames.insights && <Graphs />}
        {selectedName === navNames.settings && <Settings />}
      </div>
    </div>
  )
}
export default observer(index)
