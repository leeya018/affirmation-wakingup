import React from "react";

export default function Button({
  children,
  onClick = () => {},
  disabled = false,
  className = "",
}) {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
