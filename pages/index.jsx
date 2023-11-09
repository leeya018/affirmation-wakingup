import React, { use, useState } from "react";
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

const index = observer(() => {
  const [affirmations, setAffirmations] = useState([
    1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
  ]);
  const { selectedName } = navStore;

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
          <MiddleAffirmations affirmations={affirmations} />
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
