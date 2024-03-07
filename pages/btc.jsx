import Alerts from "components/Alerts"
import React, { useEffect, useState } from "react"

import Altshuler from "components/Altshuler"
import Loans from "components/Loans"

const BtcPage = () => {
  return (
    <div
      className="w-full  h-[100vh] flex flex-col  items-center   border-2
 overflow-y-scroll bg-[#F3F3F7] "
    >
      <div className="flex flex-col">
        <Altshuler />
        <Loans />
      </div>
    </div>
  )
}

export default BtcPage
