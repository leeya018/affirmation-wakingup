import React, { useState, useEffect } from "react"
import { Howl } from "howler"

function useSound(initialFileName) {
  const [sound, setSoundInstance] = useState(null)

  useEffect(() => {
    const newSound = new Howl({
      src: [initialFileName],
      loop: true,
    })

    setSoundInstance(newSound)

    return () => {
      newSound.stop()
      newSound.unload()
    }
  }, [initialFileName])

  const playSound = () => {
    sound?.play()
  }

  const stopSound = () => {
    sound?.stop()
  }

  const setSound = (url) => {
    setSoundInstance(
      new Howl({
        src: [url],
        loop: true,
      })
    )
  }

  return {
    sound,
    playSound,
    stopSound,
    setSound,
  }
}

export default useSound
