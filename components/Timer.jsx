import { formatSeconds } from "../util"
function Timer({ time }) {
  return <div className="font-semibold">{formatSeconds(time)}</div>
}

export default Timer
