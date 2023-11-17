import React from "react";
import { BiBell } from "react-icons/bi";
import Image from "next/image";

export default function Nav() {
  return (
    <div className="absolute top-0  py-4 px-10 bg-white w-full flex justify-between items-center text-black">
      <div>
        <Image
          alt="profile image"
          width={32}
          height={32}
          className="rounded-lg "
          src={"/trophy.png"}
        />
      </div>
      <div className="flex justify-between items-center  gap-4">
        <div>
          <BiBell size={20} color="gray" />
        </div>
        <div>
          <Image
            alt="profile image"
            width={32}
            height={32}
            className="rounded-lg "
            src={"/me.jpg"}
          />
        </div>
        <div className="font-medium">hello , Lee Yahav</div>
      </div>
    </div>
  );
}
