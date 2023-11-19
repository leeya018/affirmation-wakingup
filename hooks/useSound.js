import React, { useState, useEffect } from "react"
import { Howl } from "howler"

function useSound(initialFileName) {
  const [sound, setSoundInstance] = useState(null)

  // This effect updates the Howl instance when the fileName changes
  useEffect(() => {
    // Create a new Howl instance with the new file
    const newSound = new Howl({
      src: [initialFileName],
      loop: true,
    })

    setSoundInstance(newSound)

    // Cleanup function to stop and unload the sound when component unmounts or source changes
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

  // setSound function to update the sound source
  const setSound = (url) => {
    // Update the state which will trigger the useEffect to recreate the Howl instance
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
