import React from "react";
import Button from ".";

export default function StandardButton({
  children,
  onClick = () => {},
  className = "",
  ref = null,
}) {
  return (
    <Button
      ref={ref}
      className={`px-4 py-4  border-2 b-white
       rounded-md 
          ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
