import { formatSeconds } from "../util"
function Timer({ time }) {
  return <div className="font-semibold w-16">{formatSeconds(time)}</div>
}

export default Timer
