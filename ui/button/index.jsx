import React from "react";

export default function Button({
  children,
  onClick = () => {},
  className = "",
  ref = null,
}) {
  return (
    <div
      ref={ref}
      className={`cursor-pointer 
      flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
