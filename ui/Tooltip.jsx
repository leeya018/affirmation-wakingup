import { Tooltip, Button } from "@material-tailwind/react"

export function TooltipDefault({ children, text }) {
  return (
    <Tooltip content={text}>
      <Button>{children}</Button>
    </Tooltip>
  )
}
