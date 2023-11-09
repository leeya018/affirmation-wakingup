import React from "react";
import Image from "next/image";
import { BiTime } from "react-icons/bi";
import { SiCounterstrike } from "react-icons/si";

export default function MiddleAffirmations({ affirmations }) {
  return (
    <div className="flex-5/10  w-full shadow-rl h-[80vh] ">
      <div className="w-full flex flex-col gap-4 ">
        {/* first block */}
        <div
          className="flex-1/4 bg-white rounded-xl flex 
        flex-col gap-4 p-6"
        >
          <div className="text-lg font-bold">Live report</div>
          <div className="flex justify-end items-center gap-3">
            <div className="h-full mr-auto">
              <input
                type="text"
                placeholder="Type your short suggestion"
                className="border-2 border-[#d4d6db] rounded-md w-[30rem] h-10 pl-2"
              />
            </div>
            <div className="flex justify-end items-center gap-6">
              {/* first item */}
              <div className="flex justify-center items-center h-16 gap-3">
                <div className="h-full">
                  <SiCounterstrike size={30} />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div className="font-bold text-xl">69</div>
                  <div>Strikes</div>
                </div>
              </div>
              {/* second item */}
              <div className="flex justify-center items-center rounded-md h-16 gap-3">
                <div className="h-full">
                  <BiTime size={30} />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div className="font-bold text-xl">69</div>
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
                affirmations.map((affirmation, key) => (
                  <li
                    key={key}
                    className="mx-10 p-3 flex flex-col  rounded-xl
                  font-semibold bg-[#F5F8FD] gap-1"
                  >
                    <div className="text-xl">this is good</div>
                    <div className="text-sm ">10:20:40</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
