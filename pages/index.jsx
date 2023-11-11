import React, { use, useEffect, useRef, useState } from "react";
import Nav from "components/Nav";
import LeftNav from "components/LeftNav";
import MiddleAffirmations from "components/MiddleAffirmations";
import Image from "next/image";
import RightNav from "components/RightNav";
import Graphs from "components/Graphs";
import { navStore } from "mobx/navStore";
import { navNames } from "/util";
import { observer } from "mobx-react-lite";
import Calender from "components/Calender";
import PieChart from "components/PieChart";
import { auth } from "../firebase";

import { useRouter } from "next/router";

const index = observer(() => {
  const [affirmations, setAffirmations] = useState([]);
  const { selectedName } = navStore;
  const [txt, setTxt] = useState("");
  const [time, setTime] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // if (!auth?.currentUser?.uid) {
    //   router.push("/login");
    // }
    inputRef.current.focus();
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
  // if (!auth?.currentUser?.uid) {
  //   return null;
  // }
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
        {selectedName === navNames.home && (
          <MiddleAffirmations
            handleKeyDown={handleKeyDown}
            setTxt={setTxt}
            affirmations={affirmations}
            setTime={setTime}
            time={time}
            txt={txt}
            inputRef={inputRef}
          />
        )}
        {selectedName === navNames.insights && <Graphs />}
        {selectedName === navNames.calender && <Calender />}

        {/* right */}
        {selectedName === navNames.home && <RightNav />}
        {selectedName === navNames.insights && <RightNav />}
        {selectedName === navNames.calender && <PieChart />}
      </div>
    </div>
  );
});
export default index;