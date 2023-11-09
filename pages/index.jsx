import Timer from "components/Timer";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getTime } from "util";

const myAffirmations = "שיניים ישרות יפות ונוח בפה";
export default function index() {
  const [affirmations, setAffirmations] = useState([]);
  const [txt, setTxt] = useState("");
  const [time, setTime] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
    const localAffirmations = localStorage.getItem("affirmations") || "[]";
    const localTime = localStorage.getItem("time") || 0;
    console.log(parseInt(localTime));
    setTime(parseInt(localTime));
    setAffirmations(JSON.parse(localAffirmations));
  }, []);

  const handleKeyDown = (e) => {
    console.log("handleKeyDown");
    console.log(e.code === "Enter");
    if (e.code === "Enter") {
      if (txt.length < 20) return null;
      setAffirmations((prev) => [...prev, { name: txt, date: new Date() }]);
      setTxt("");
      localStorage.setItem("affirmations", JSON.stringify(affirmations));
    }
  };
  const reset = () => {
    setAffirmations([]);
    setTime(0);
  };
  return (
    <div className="w-full border-2 h-[100vh] flex flex-col items-center overflow-hidden">
      <button
        onClick={reset}
        className="border-2 rounded-md font-semibold text-xl px-3 py-2 absolute top-1 left-1"
      >
        reset
      </button>
      <Timer time={time} setTime={setTime} />
      <div className="mt-10 text-xl font-bold text-center">affirmations</div>
      <div className="flex justify-center items-center gap-5 text-xl font-bold">
        <div className="">{myAffirmations}</div>
        <div>({affirmations.length})</div>
      </div>
      <div className="w-full flex justify-center mt-20">
        <input
          dir="rtl"
          ref={ref}
          type="text"
          value={txt}
          className="border-2 h-14 px-4 border-black rounded-md w-[30%]"
          onChange={(e) => setTxt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <ul className="mt-20 w-[30%] overflow-scroll h-[50%]">
        {affirmations?.length > 0 &&
          affirmations.reverse().map((affirmation, key) => (
            <li
              key={key}
              className="border-2 border-black flex justify-between items-center py-2 px-3"
            >
              <div>{affirmation.name}</div>
              <div>{getTime(affirmation.date)}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
