import React, { useEffect } from "react";
import { formatSeconds } from "../util";
function Timer({ time, setTime, timeLim = 1800 }) {
  let timerId;
  useEffect(() => {
    if (time > 0 && time < timeLim) {
      timerId = setTimeout(() => {
        setTime(time + 1);
        localStorage.setItem("time", time);
      }, 1000);
      return () => clearTimeout(timerId); // Cleanup the timer
    } else {
      clearTimeout(timerId);
    }
  }, [time, setTime]);

  return <div className="font-semibold">{formatSeconds(time)}</div>;
}

export default Timer;
