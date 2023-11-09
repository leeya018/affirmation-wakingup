import React, { useMemo } from "react"
import { Howl } from "howler"

function useSound(fileName) {
  // Memoize the Howl instance to prevent re-creation on every render
  const sound = useMemo(() => {
    return new Howl({
      src: [fileName],
    })
  }, [fileName])

  const playSound = () => {
    sound.play()
  }

  return {
    sound,
    playSound,
  }
}

export default useSound
