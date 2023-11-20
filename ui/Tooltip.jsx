import { Tooltip, Button } from "@material-tailwind/react"

export function TooltipDefault({ children, text }) {
  return (
    <Tooltip content={text}>
      <Button className="shadow-none">{children}</Button>
    </Tooltip>
  )
}
