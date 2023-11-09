import React from "react";
import Nav from "components/Nav";
import LeftNav from "components/LeftNav";

export default function index() {
  return (
    <div className="w-full border-2 h-[100vh] flex  items-center overflow-hidden bg-[#F3F3F7]">
      {/* nav  */}
      <Nav />
      {/* all other */}
      <div className="w-full flex justify-around ">
        {/* left */}
        <LeftNav />
        {/* middle */}

        <div className="flex-5/10 bg-white">2</div>
        {/* right */}
        <div className="flex-4/10 bg-white">3</div>
      </div>
    </div>
  );
}
