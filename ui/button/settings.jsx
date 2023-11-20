import React from "react"

export default function SettingsButton({
  children,
  onClick = () => {},
  isDisabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`border-white text-white border-2
      rounded-md   py-1 px-4 font-semibold
    flex justify-center items-center  ${
      isDisabled ? "bg-nav_gray_offwhite" : "bg-blue hover:bg-opacity-90"
    } `}
    >
      {children}
    </button>
  )
}
