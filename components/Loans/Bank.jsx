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
  //
  const [prints, setPrints] = useState([])

  useEffect(() => {
    if (money && monthsToRet && moneyToRetPerMonth) {
      const moneyApart = moneyToRetPerMonth * 12 // so I can pay them on the first year
      const newMoney = money - moneyApart
      const after07 = newMoney - newMoney * 0.007
      const netMoney = after07 - after07 * 0.035
      console.log({ netMoney })
      //
      let moneyShifting = netMoney

      //
      let moneyToBankTmp = 0
      let startYear = new Date().getFullYear()
      let nextYear = startYear + 1

      let monthsLeft = monthsToRet - 12 // round which I pay from side
      while (monthsLeft > 0) {
        const relationJump = data[nextYear].minPrice / data[startYear].minPrice
        //
        moneyShifting = relationJump * moneyShifting

        //
        const lim = Math.min(12, monthsLeft)
        for (let month = 1; month <= lim; month++) {
          monthsLeft--
          const moneyOut = moneyToRetPerMonth * (4 / 3)
          moneyShifting = moneyShifting - moneyOut
          moneyToBankTmp += moneyToRetPerMonth
        }
        startYear++
        nextYear++
      }

      //
      setTotalToBank(moneyToBankTmp + moneyApart)
      setTotalToMe(moneyShifting)
      setRoiRatio(moneyShifting / money)
    }
  }, [money, monthsToRet, moneyToRetPerMonth])

  console.log(prints)
  const print = (data) => {
    setPrints((prev) => [...prev, data])
  }
  return (
    <div>
      {/* calc */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span>loaner</span>
          <div>
            Bank - not accurate <br /> (showing better results for me)
          </div>
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
            min={24}
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
        <button
          className="p-2 bg-blue rounded-lg hover:bg-blueL_bank 
      cursor-pointer"
          onClick={() => print({ money: totalToMe, years: monthsToRet / 12 })}
        >
          print
        </button>
      </div>
      {/* prints */}
      <div className="mt-10">
        <ul className="flex flex-col gap-2">
          {prints.map((print, key) => (
            <li key={key}>
              <div>
                <span className="text-xl font-semibold">
                  {print.years.toFixed(0)} years val {print.money.toFixed(0)}{" "}
                  NIS
                </span>
              </div>
            </li>
          ))}
        </ul>
        {prints.length > 0 && (
          <div className="bg-green">
            <span className="text-xl font-semibold">
              {prints.reduce(
                (maxYear, print) => Math.max(maxYear, print.years),
                -1
              )}{" "}
              years val{" "}
              {prints.reduce((acc, print) => parseInt(print.money) + acc, 0)}{" "}
              NIS
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
export default BankLoan
