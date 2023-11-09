import React from "react"

export default function Title({ children, className }) {
  return (
    <div
      className={`mb-6 flex justify-center 
      text-4xl font-bold border-b-2 ${className}`}
    >
      {children}
    </div>
  )
}
