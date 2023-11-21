import { useState, useEffect } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { formatDate } from "@/util"
import { UserStore } from "mobx/userStore"
import PieChart from "./PieChart"
import moment from "moment"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
const maxPoints = 3

const Calender = observer(() => {
  const [currDate, setCurrDate] = useState(moment())
  const [data, setData] = useState([])

  useEffect(() => {
    if (!UserStore.user?.practices) return
    console.log("UserStore.user", toJS(UserStore.user))
    const data = getPractices()
    console.log("data", data)
    setData(data)
  }, [currDate, UserStore.user])

  const getPractices = () => {
    console.log("getPractices s")

    const foundPractice = UserStore.user?.practices.find(
      (p) => p.date === formatDate(currDate)
    )
    if (!foundPractice) return [0, 0, maxPoints]

    const voice = foundPractice.voice
    const type = foundPractice.type
    let notDone = maxPoints - voice - type
    notDone = notDone > 0 ? notDone : 0
    console.log("getPractices e")
    return [type, voice, notDone]
  }
  return (
    <div className=" flex gap-4     flex-col justify-center md:flex-row md:h-[85vh] overflow-y-auto md:overflow-hidden md:w-[90vw]">
      <div className="   rounded-xl flex flex-col bg-white items-center gap-4 shadow-md md:w-[45vw]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            orientation="portrait"
            // value={new Date()}
            onChange={(value) => {
              console.log("date", value)
              setCurrDate(new Date(value))
            }}
          />
        </LocalizationProvider>
      </div>
      <div className=" bg-white rounded-xl flex justify-center items-center shadow-md  md:w-[45vw]">
        <PieChart items={data} />
      </div>
    </div>
  )
})
export default Calender
