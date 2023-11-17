import React from "react"

export default function ApproveButton({
  children,
  onClick = () => {},
  isLoading = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${
        isLoading ? "bg-gray" : "bg-[#35d08c]"
      } border-[#e2e2e2] mb-2  border-2  rounded-md  py-2 px-4 text-white 
    font-semibold flex justify-center items-center bg-red `}
    >
      {children}
    </button>
  )
}
