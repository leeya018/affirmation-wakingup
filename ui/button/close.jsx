import React from "react"
import Button from "."

export default function CloseButton({ onClick = () => {} }) {
  return (
    <Button
      className=" w-5 h-5 text-lg flex justify-center items-center absolute top-0 right-0"
      onClick={onClick}
    >
      x
    </Button>
  )
}
