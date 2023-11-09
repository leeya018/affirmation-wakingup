import React, { use, useState } from "react";
import Nav from "components/Nav";
import LeftNav from "components/LeftNav";
import MiddleAffirmations from "components/MiddleAffirmations";
import Image from "next/image";
import RightNav from "components/RightNav";

export default function index() {
  const [affirmations, setAffirmations] = useState([
    1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
  ]);

  return (
    <div
      className="w-full border-2 h-[100vh] flex  items-center
     overflow-hidden bg-[#F3F3F7]"
    >
      {/* nav  */}
      <Nav />
      {/* all other */}
      <div className="w-full flex justify-around h-[80vh] gap-5 mx-6">
        {/* left */}
        <LeftNav />
        {/* middle */}
        <MiddleAffirmations affirmations={affirmations} />

        {/* right */}
        <RightNav />
      </div>
    </div>
  );
}
