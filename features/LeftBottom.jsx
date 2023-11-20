import { observer } from "mobx-react-lite"
import { navStore } from "mobx/navStore"
import React from "react"
import MiddleAffirmations from "../components/MiddleAffirmations"

const Left = observer(
  ({ handleKeyDown, setTxt, affirmations, setAffirmations, txt, inputRef }) => {
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
