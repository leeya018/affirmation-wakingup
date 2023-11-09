import React from "react";
import { BiBell } from "react-icons/bi";
import Image from "next/image";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiTime } from "react-icons/bi";

export default function RightNav() {
  return (
    <div className="  w-[45vw] rounded-xl h-[85vh] flex flex-col items-center gap-4">
      <div className="p-6 bg-white w-full rounded-xl h-[10rem] flex items-center justify-around text-lg font-bold">
        <div className="flex justify-center items-center gap-2">
          <BiTime size={30} />
          <div>time</div>
        </div>
        <div>affirmation name</div>
        <AiOutlinePlayCircle
          size={30}
          className="cursor-pointer text-[#7ED5FE]"
        />
      </div>
      <div className="p-6 bg-white w-full rounded-xl h-full flex justify-center items-center">
        <Image
          alt="profile image"
          width={500}
          height={500}
          className="rounded-lg  "
          src={"/smile.png"}
        />
      </div>
    </div>
  );
}
