import React from "react";

export default function CloseButton({
  children,
  onClick = () => {},
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-white   border-2 border-[#e2e2e2] font-bold 
      rounded-md py-2 px-4 text-black
     flex justify-center items-center`}
    >
      {children}
    </button>
  );
}
