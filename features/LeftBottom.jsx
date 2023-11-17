import { navNames } from "@/util"
import { observer } from "mobx-react-lite"
import { MessageStore } from "mobx/messageStore"
import { navStore } from "mobx/navStore"
import React, { useEffect } from "react"
import MiddleAffirmations from "../components/MiddleAffirmations"
import Calender from "../components/Calender"
import Graphs from "../components/Graphs"

const Left = observer(
  ({ handleKeyDown, setTxt, affirmations, txt, inputRef }) => {
    const { selectedName } = navStore

    return (
      <>
        {selectedName === navNames.insights && <Graphs />}
        {/* {selectedName === navNames.calender && <Calender />} */}
        {selectedName === navNames.home && (
          <MiddleAffirmations
            handleKeyDown={handleKeyDown}
            setTxt={setTxt}
            affirmations={affirmations}
            txt={txt}
            inputRef={inputRef}
          />
        )}
      </>
    )
  }
)
export default Left
