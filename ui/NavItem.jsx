import { navStore } from "mobx/navStore"
import React from "react"

export default function NavItem({
  children,
  name,
  onClick = () => {},
  className,
}) {
  const { selectedName } = navStore

  return (
    <div
      className={` border-b-2 border-transparent hover:border-blue-500 
      duration-75 box-border  border-black
         cursor-pointer 
      w-20 h-10 flex justify-center items-center ${
        selectedName === name && "border-blue-500"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
