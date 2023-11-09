import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { navStore } from "mobx/navStore";
import { navNames } from "/util";
import { observer } from "mobx-react-lite";

const LeftNav = observer(() => {
  const { setSelectedName, selectedName } = navStore;

  console.log("selectedName", selectedName);
  return (
    <div
      className="flex-1/10 shadow-md bg-white flex flex-col gap-2  p-3
     rounded-xl h-[85vh]"
    >
      {/*  */}

      <HiOutlineHome
        name={navNames.home}
        onClick={() => {
          setSelectedName(navNames.home);
        }}
        size={40}
        className={`${
          selectedName === navNames.home
            ? "text-[#7ED5FE] bg-[#DFF4FD] bg-opacity-50"
            : "text-[#CFCFD0]"
        } p-2 rounded-md cursor-pointer`}
      />

      <BsGraphUpArrow
        name={navNames.insights}
        onClick={() => {
          setSelectedName(navNames.insights);
        }}
        size={40}
        className={`${
          selectedName === navNames.insights
            ? "text-[#7ED5FE] bg-[#DFF4FD] bg-opacity-50"
            : "text-[#CFCFD0]"
        } p-2 rounded-md cursor-pointer `}
      />

      <SlCalender
        name={navNames.calender}
        onClick={() => {
          setSelectedName(navNames.calender);
        }}
        size={40}
        className={`${
          selectedName === navNames.calender
            ? "text-[#7ED5FE] bg-[#DFF4FD] bg-opacity-50"
            : "text-[#CFCFD0]"
        } p-2 rounded-md cursor-pointer `}
      />

      <IoSettingsOutline
        name={navNames.settings}
        onClick={() => {
          setSelectedName(navNames.settings);
        }}
        size={40}
        className={`${
          selectedName === navNames.settings
            ? "text-[#7ED5FE] bg-[#DFF4FD] bg-opacity-50"
            : "text-[#CFCFD0]"
        } p-2 rounded-md cursor-pointer `}
      />
    </div>
  );
});
export default LeftNav;
