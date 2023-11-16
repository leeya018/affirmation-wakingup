import { navNames } from "@/util"
import { observer } from "mobx-react-lite"
import { MessageStore } from "mobx/messageStore"
import { navStore } from "mobx/navStore"
import React, { useEffect } from "react"
import MiddleAffirmations from "./MiddleAffirmations"
import Calender from "./Calender"
import Graphs from "./Graphs"

const Left = observer(
  ({ handleKeyDown, setTxt, affirmations, setTime, time, txt, inputRef }) => {
    const { selectedName } = navStore

    return (
      <>
        {selectedName === navNames.insights && <Graphs />}
        {selectedName === navNames.calender && <Calender />}
        {selectedName === navNames.home && (
          <MiddleAffirmations
            handleKeyDown={handleKeyDown}
            setTxt={setTxt}
            affirmations={affirmations}
            setTime={setTime}
            time={time}
            txt={txt}
            inputRef={inputRef}
          />
        )}
      </>
    )
  }
)
export default Left
