import { navNames } from "@/util"
import { observer } from "mobx-react-lite"
import { MessageStore } from "mobx/messageStore"
import { navStore } from "mobx/navStore"
import React, { useEffect } from "react"
import MiddleAffirmations from "../components/MiddleAffirmations"
import Calender from "../components/Calender"
import Graphs from "../components/Graphs"

const Left = observer(
  ({ handleKeyDown, setTxt, affirmations, setAffirmations, txt, inputRef }) => {
    const { selectedName } = navStore

    return (
      <>
        <MiddleAffirmations
          handleKeyDown={handleKeyDown}
          setTxt={setTxt}
          affirmations={affirmations}
          txt={txt}
          setAffirmations={setAffirmations}
          inputRef={inputRef}
        />
      </>
    )
  }
)
export default Left
