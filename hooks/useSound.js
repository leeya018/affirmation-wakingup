import React, { useMemo } from "react";
import { Howl } from "howler";

function useSound(fileName) {
  // Memoize the Howl instance to prevent re-creation on every render
  const sound = useMemo(() => {
    return new Howl({
      src: [fileName],
      // autoplay: true,
      loop: true,
    });
  }, [fileName]);

  const playSound = () => {
    sound.play();
  };
  const stopSound = () => {
    sound.stop();
  };

  return {
    sound,
    playSound,
    stopSound,
  };
}

export default useSound;
