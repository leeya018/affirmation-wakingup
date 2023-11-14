import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BiTime } from "react-icons/bi";
import { SiCounterstrike } from "react-icons/si";
import { getTime } from "@/util";
import { formatSeconds } from "@/util";
import Timer from "./Timer";
import useSound from "hooks/useSound";

const affirmationsLim = 100;
const timeLimAudio = 5;
export default function MiddleAffirmations({
  affirmations,
  setAffirmations,
  handleKeyDown,
  inputRef,
  setTxt,
  setTime,
  txt,
  time,
}) {
  const { stopSound, playSound } = useSound("./Teeth_suggestion.mp3");

  return (
    <div className=" w-[45vw] shadow-rl h-[80vh] ">
      <div className="w-full flex flex-col gap-4 ">
        {/* first block */}
        <div
          className="flex-1/4 bg-white rounded-xl flex 
        flex-col gap-4 p-6"
        >
          <div className="text-lg font-bold">
            נוח לי בפה ויש לי שיניים ישרות ויפות
          </div>
          <div className="flex justify-end items-center gap-3">
            <div className="h-full mr-auto">
              <input
                dir="rtl"
                ref={inputRef}
                type="text"
                value={txt}
                onChange={(e) => setTxt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your short suggestion"
                className="border-2 border-[#d4d6db] rounded-md w-[20rem] h-10 pr-2"
              />
            </div>
            <div className="flex justify-end items-center gap-6">
              {/* first item */}
              <div className="flex justify-center items-center h-16 gap-3">
                <div className="h-full">
                  <SiCounterstrike size={30} />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div className="font-bold text-xl">{affirmations.length}</div>
                  <div>Strikes</div>
                </div>
              </div>
              {/* second item */}
              <div className="flex justify-center items-center rounded-md h-16 gap-3">
                <div className="h-full">
                  <BiTime size={30} />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <Timer
                    time={time}
                    setTime={setTime}
                    stop={affirmations.length >= affirmationsLim}
                  />
                  {/* <div className="font-bold text-xl">{formatSeconds(time)}</div> */}
                  <div>Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* second block */}
        <div className="flex-3/4 bg-white rounded-xl">
          <div className=" rounded-lg p-1">
            <ul
              className="flex flex-col gap-2 pt-2 overflow-y-scroll 
            scrollbar scrollbar-thumb-[#d4d6db] scrollbar-track-white 
            scrollbar-thumb-rounded h-[36rem]"
            >
              {affirmations.length > 0 &&
                affirmations
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((affirmation, key) => (
                    <li
                      key={key}
                      className="mx-10 p-3 flex flex-col  rounded-xl
                  font-semibold bg-[#F5F8FD] gap-1"
                    >
                      {/* <div className="text-xl">this is good</div>
                    <div className="text-sm ">10:20:40</div> */}
                      <div className="text-xl">{affirmation.name}</div>
                      <div className="text-xl">
                        {" "}
                        {getTime(affirmation.date)}
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
