import React from "react"

export default function index({
  onChange = () => {},
  onKeyDown = () => {},
  value = "",
  placeholder = "",
  name = "",
}) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="rounded-md w-[100%] mb-2
  h-10 ring hover:ring-blue-300 focus:ring-blue-400
  focus:outline-none  "
    />
  )
}
