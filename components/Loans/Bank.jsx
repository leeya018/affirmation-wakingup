import { useEffect, useState } from "react"
import { data } from "./data"

function BankLoan() {
  const [money, setMoney] = useState(100000)
  const [monthsToRet, setMonthsToRet] = useState(1)
  const [moneyToRetPerMonth, setMoneyToRetPerMonth] = useState(1)

  // res

  const [totalToBank, setTotalToBank] = useState(-1)
  const [totalToMe, setTotalToMe] = useState(-1)
  const [roiRatio, setRoiRatio] = useState(-1)

  useEffect(() => {
    if (money && monthsToRet && moneyToRetPerMonth) {
      const moneyApart = moneyToRetPerMonth * 12 // so I can pay them on the first year
      const newMoney = money - moneyApart
      const after07 = newMoney - newMoney * 0.007
      const netMoney = after07 - after07 * 0.035
      console.log({ netMoney })
      //
      let moneyShifting = netMoney
      const startYear = new Date().getFullYear()
      const nextYear = startYear + 1
      const relationJump = data[nextYear].minPrice / data[startYear].minPrice
      //
      moneyShifting = relationJump * moneyShifting
      let moneyToBankTmp = 0
      //
      for (let month = 1; month <= 12; month++) {
        const moneyOut = moneyToRetPerMonth * (4 / 3)
        moneyShifting = moneyShifting - moneyOut
        moneyToBankTmp += moneyToRetPerMonth
      }
      //
      setTotalToBank(moneyToBankTmp + moneyApart)
      setTotalToMe(moneyShifting)
      setRoiRatio(moneyShifting / money)
    }
  }, [money, monthsToRet, moneyToRetPerMonth])
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <span>loaner</span>
        <div>Bank</div>
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
        <span>months to return</span>
        <input
          type="number"
          value={monthsToRet}
          onChange={(e) => setMonthsToRet(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <span>return the bank per month</span>
        <input
          type="number"
          value={moneyToRetPerMonth}
          onChange={(e) => setMoneyToRetPerMonth(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <span>total for bank</span>
        <span>{totalToBank.toFixed(0)}</span>
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
export default BankLoan
