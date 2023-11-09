import React from "react";
import Image from "next/image";
export default function MiddleAffirmations() {
  return (
    <div className="flex-5/10  w-full">
      <div className="w-full flex flex-col gap-2 ">
        <div className="flex-1/4 bg-white rounded-md flex flex-col gap-2 p-4">
          <div className="text-lg font-bold">Live report</div>
          <div className="flex justify-end items-center gap-3">
            {/* first item */}
            <div className="flex justify-center items-center h-16 gap-2">
              <div className="h-full">
                <Image
                  alt="clicks"
                  width={40}
                  height={40}
                  className="rounded-full "
                  src={"/me.jpg"}
                />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div className="font-bold text-xl">69</div>
                <div>clicks</div>
              </div>
            </div>
            {/* first item */}
            <div className="flex justify-center items-center h-16 gap-2">
              <div className="h-full">
                <Image
                  alt="clicks"
                  width={40}
                  height={40}
                  className="rounded-full "
                  src={"/me.jpg"}
                />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div className="font-bold text-xl">
                  69 <span className="text-md ">sec</span>{" "}
                </div>
                <div>clicks</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-3/4 bg-white rounded-md">trstsr</div>
      </div>
    </div>
  );
}
