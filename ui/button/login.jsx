import React from "react"
import Button from "."

export default function LoginButton({ children, onClick = () => {} }) {
  return (
    <Button
      className="bg-blue-500 border-2
       border-black rounded-lg  
      py-10 px-20 "
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
