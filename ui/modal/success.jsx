import React from "react";

export default function SuccessButton({ children, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className=" border-[#e2e2e2] mb-2  border-2  rounded-md bg-[#4B6DCF]  py-2 px-4 text-white 
    font-semibold flex justify-center items-center "
    >
      {children}
    </button>
  );
}
