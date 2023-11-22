import React, { useEffect, useState } from "react"
import Freecurrencyapi from "@everapi/freecurrencyapi-js"
import { getUrl } from "@/util"
import axios from "axios"
import SuccessModal from "components/modal/message/success"
import Image from "next/image"

const freecurrencyapi = new Freecurrencyapi(
  process.env.NEXT_PUBLIC_CURRENCY_KEY
)

const Currency = {
  ILS: "ILS",
  USD: "USD",
  EUR: "EUR",
}

export default function altshuler() {
  const [nis, setNis] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [btcValue, setBtcValue] = useState("")
  const [resultWR, setResultWR] = useState("")
  const [resultNR, setResultNR] = useState("")
  const [nisDiff, setNisDiff] = useState("")
  const [showCommitions, setShowCommitions] = useState(false)

  useEffect(() => {
    setBtcValue(localStorage.getItem("btcValue"))
    setNis(localStorage.getItem("nis"))
  }, [])

  const fromNisToDollar = async (nis) => {
    const response = await freecurrencyapi.latest({
      base_currency: Currency.ILS,
      currencies: Currency.USD,
    })
    console.log(Currency)

    const rate = response.data[Currency.USD]
    console.log("dollars: ", rate * nis)
    return rate * nis
  }
  const fromDollarToNis = async (dollar) => {
    const response = await freecurrencyapi.latest({
      base_currency: Currency.USD,
      currencies: Currency.ILS,
    })
    console.log(Currency)

    const rate = response.data[Currency.ILS]
    console.log("dollars: ", rate * dollar)
    return rate * dollar
  }

  const getAltshulerRate = (nisStr) => {
    const nis = parseInt(nisStr)
    if (nis >= 80000) return 0.035
    if (nis >= 40000 && nis < 80000) return 0.04
    if (nis >= 20000 && nis < 40000) return 0.045
    if (nis >= 4000 && nis < 20000) return 0.05
  }
  const getBtc = async () => {
    localStorage.setItem("nis", nis)
    localStorage.setItem("btcValue", btcValue)
    try {
      setIsLoading(true)

      const after07 = nis - nis * 0.007
      const dollar = await fromNisToDollar(after07)
      const after35 = dollar - dollar * getAltshulerRate(nis)
      setResultWR(after35 / btcValue)

      const dollar1 = await fromNisToDollar(nis)
      setResultNR(dollar1 / btcValue)

      // get diff
      const valDiff = await fromDollarToNis(
        (dollar1 / btcValue - after35 / btcValue) * btcValue
      )
      setNisDiff(valDiff)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  return (
    <div
      className="w-full  h-[100vh] flex flex-col  items-center   border-2
 overflow-hidden bg-[#F3F3F7] "
    >
      {showCommitions && (
        <Image
          alt="altshuler_commitions image"
          width={600}
          height={600}
          className="rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={"/altshuler_commitions.png"}
        />
      )}
      <div className="w-[60%] flex flex-col items-center gap-5">
        <div className="text-lg font-semibold underline mt-20">altshuler</div>
        <div
          className="underline text-md"
          onClick={() => {
            if (showCommitions) {
              setShowCommitions(false)
            } else {
              setShowCommitions(true)
            }
          }}
        >
          {showCommitions ? "hide commitions" : "show commitions"}
        </div>
        <div className="flex flex-col items-center">
          <input
            type="number"
            name="btcValue"
            value={btcValue}
            onChange={(e) => setBtcValue(e.target.value)}
            placeholder="Enter Btc rate in dollars"
            className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2  focus:border-custom-blue"
          />
          <input
            type="number"
            name="nis"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            placeholder="Enter Nis"
            className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2  focus:border-custom-blue"
          />
          <button
            type="submit"
            onClick={getBtc}
            className={`${
              isLoading ? "bg-gray" : "bg-[#4B6DCF]"
            } mb-2  border-2  rounded-xl w-full py-2 text-white font-semibold flex justify-center items-center`}
          >
            Covert
          </button>
        </div>

        <div className="flex flex-col justify-start gap-2 ">
          {resultNR && (
            <div className="border-2 shadow-md p-2 rounded-lg">
              {" "}
              <span className="font-bold">raw result:</span> {resultNR} BTC
              (before taxes)
            </div>
          )}
          {resultWR && (
            <div className="border-2 shadow-md p-2 rounded-lg bg-nav_gray ">
              {" "}
              <span className="font-bold">result:</span> {resultWR} BTC (after
              taxes)
            </div>
          )}
          {resultWR && resultNR && (
            <div className="border-2 shadow-md p-2 rounded-lg">
              {" "}
              <span className="font-bold">diff:</span> {resultNR - resultWR} BTC
              (diff between before and after taxes)
            </div>
          )}
          {resultWR && resultNR && (
            <div className="border-2 shadow-md p-2 rounded-lg">
              {" "}
              <span className="font-bold">value diff:</span>{" "}
              {(resultNR - resultWR) * btcValue} dollars (money in dollars that
              is going to altshuler)
            </div>
          )}
          {resultWR && resultNR && (
            <div className="border-2 shadow-md p-2 rounded-lg">
              {" "}
              <span className="font-bold">value diff:</span> {nisDiff} NIS
              (money in NIS that is going to altshuler)
            </div>
          )}
          <div className="text-red h-10">{error}</div>
        </div>
      </div>
    </div>
  )
}
