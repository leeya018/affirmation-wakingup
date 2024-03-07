import React, { useEffect, useState } from "react"
import PrivateLoan from "./Private"
import BankLoan from "./Bank"

export default function Loans() {
  return (
    <div>
      <div className="text-lg font-semibold">Loans</div>

      {/* content of the data  */}
      <div className="flex flex-col gap-10">
        <div className="shadow-lg p-5 rounded-lg">
          <PrivateLoan />
        </div>

        <div className="shadow-lg p-5 rounded-lg">
          <BankLoan />
        </div>
      </div>
    </div>
  )
}
