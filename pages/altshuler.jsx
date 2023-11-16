import React, { useState } from "react"
import Freecurrencyapi from "@everapi/freecurrencyapi-js"
import { getUrl } from "@/util"
import axios from "axios"

const freecurrencyapi = new Freecurrencyapi(
  process.env.NEXT_PUBLIC_CURRENCY_KEY
)

const Currency = {
  ILS: "ILS",
  USD: "USD",
  EUR: "EUR",
}

export default function altshuler() {
  const [nis, setNis] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState("")

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
  const fromDollarToBtc = async (dollar) => {
    try {
      const data = await axios.get(getUrl() + "/api/convert")
      console.log(data)
      return data
    } catch (error) {
      console.log(error.message)
    }
  }

  const getBtc = async () => {
    try {
      setIsLoading(true)
      const after07 = nis - nis * 0.007
      const dollar = await fromNisToDollar(after07)
      const after35 = dollar - dollar * 0.035
      const data = await fromDollarToBtc(after35)
      const btc = data.data
      //   console.log("btc", btc)
      setResult(btc)
      setIsLoading(false)
      return btc
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }
  return (
    <div
      className="w-full  h-[100vh] flex flex-col  items-center  
 overflow-hidden bg-[#F3F3F7] "
    >
      <div className="w-36 flex flex-col items-center gap-5">
        <div className="text-lg font-semibold underline mt-20">altshuler</div>
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
        <div>result: {result} BTC</div>
        <div className="text-red h-10">{error}</div>
      </div>
    </div>
  )
}
