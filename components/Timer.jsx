import React, { useEffect } from "react";
import { formatSeconds } from "../util";

function Timer({ time, setTime }) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTime(time + 1);
      localStorage.setItem("time", time);
    }, 1000);
    return () => clearTimeout(timerId); // Cleanup the timer
  }, [time, setTime]);

  return <div className="font-semibold">{formatSeconds(time)}</div>;
}

export default Timer;
