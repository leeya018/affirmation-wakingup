import React from "react"
import Button from "."

export default function TrashButton({ children, onClick = () => {} }) {
  return (
    <Button style="bg-red-500" onClick={onClick}>
      {children}
    </Button>
  )
}
