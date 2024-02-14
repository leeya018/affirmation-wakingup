import React from "react"

export default function SettingsButton({
  children,
  onClick = () => {},
  isLoading = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={
        " z-50 bg-green-500 border-[#e2e2e2] text-black  mb-2  border-2  rounded-md  py-2 px-4   font-semibold flex justify-center items-center"
      }
    >
      {children}
    </button>
  )
}
