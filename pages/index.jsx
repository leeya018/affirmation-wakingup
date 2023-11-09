import React from "react";
import Nav from "components/Nav";
import LeftNav from "components/LeftNav";
import MiddleAffirmations from "components/MiddleAffirmations";

export default function index() {
  return (
    <div className="w-full border-2 h-[100vh] flex  items-center overflow-hidden bg-[#F3F3F7]">
      {/* nav  */}
      <Nav />
      {/* all other */}
      <div className="w-full flex justify-around h-[80vh] gap-5 mx-6">
        {/* left */}
        <LeftNav />
        {/* middle */}
        <MiddleAffirmations />

        {/* right */}
        <div className="flex-4/10 bg-white w-full">3</div>
      </div>
    </div>
  );
}
