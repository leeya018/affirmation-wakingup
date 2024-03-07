import { useEffect, useState } from "react"
import { data } from "./data"

function PrivateLoan() {
  const [money, setMoney] = useState(100000)
  const [yearsToRet, setYearsToRet] = useState(1)
  const [intrPromToCust, setIntrPromToCust] = useState(10)
  // res

  const [totalToCust, setTotalToCust] = useState(-1)
  const [totalToMe, setTotalToMe] = useState(-1)
  const [roiRatio, setRoiRatio] = useState(-1)

  useEffect(() => {
    if (money && yearsToRet && intrPromToCust) {
      const intrPromToCustRatio = intrPromToCust / 100 + 1
      const after07 = money - money * 0.007
      const netMoney = after07 - after07 * 0.035
      const totalFCust = netMoney * Math.pow(intrPromToCustRatio, yearsToRet)
      setTotalToCust(totalFCust)
      //
      const startYear = new Date().getFullYear()
      let endYear = startYear + yearsToRet
      const relationJump = data[endYear].minPrice / data[startYear].minPrice
      const totalForInvest = relationJump * netMoney
      const moneyForCustAndAltshuler = totalFCust * (4 / 3)
      const totalToMeTmp = totalForInvest - moneyForCustAndAltshuler
      setTotalToMe(totalToMeTmp)

      setRoiRatio(totalToMeTmp / money)
    }
  }, [money, yearsToRet, intrPromToCust])
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <span>loaner</span>
        <div>private</div>
      </div>
      <div className="flex flex-col">
        <span>money</span>
        <input
          type="number"
          value={money}
          onChange={(e) => setMoney(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <span>years to return</span>
        <input
          type="number"
          value={yearsToRet}
          onChange={(e) => setYearsToRet(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <span>intrest promise to customer</span>
        <input
          type="number"
          value={intrPromToCust}
          onChange={(e) => setIntrPromToCust(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <span>total for customer</span>
        <span>{totalToCust.toFixed(0)}</span>
      </div>
      <div className="flex flex-col ">
        <span className="bg-green">total for me</span>
        <span>{totalToMe.toFixed(0)}</span>
      </div>
      <div className="flex flex-col">
        <span>ROI ratio</span>
        <span>{roiRatio.toFixed(0)}</span>
      </div>
    </div>
  )
}
export default PrivateLoan
