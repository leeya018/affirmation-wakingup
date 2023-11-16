import { navNames } from "@/util"
import { observer } from "mobx-react-lite"
import { MessageStore } from "mobx/messageStore"
import { navStore } from "mobx/navStore"
import React, { useEffect } from "react"
import MiddleAffirmations from "./MiddleAffirmations"
import RightNav from "./RightHome"
import PieChart from "./PieChart"
import Image from "next/image"
import RightHome from "./RightHome"

const Right = observer(({ affirmations, setAffirmations }) => {
  const { selectedName } = navStore
  const getCalenderGraph = () => {
    return <PieChart />
  }

  return (
    <>
      {selectedName === navNames.home && (
        <RightHome
          affirmations={affirmations}
          setAffirmations={setAffirmations}
        />
      )}
      {selectedName === navNames.calender && getCalenderGraph()}
      {/* {selectedName === navNames.insights && ( */}
    </>
  )
})
export default Right
