import React, { useEffect, useRef, useState } from "react"
import { BiBell } from "react-icons/bi"
import Image from "next/image"
import { AiOutlinePlayCircle } from "react-icons/ai"
import { BiTime } from "react-icons/bi"
import { LiaStopCircle } from "react-icons/lia"
import useSound from "hooks/useSound"
import Timer from "../components/Timer"
import SuccessModal from "../components/modal/message/success"
import ApproveButton from "ui/button/modal/approve"
import { addImageApi, changeAffirmationApi } from "api"
import { AsyncStore } from "mobx/asyncStore"
import ApproveButton1 from "ui/button/modal/settings"
import { Alert } from "@mui/material"
import { MessageStore } from "mobx/messageStore"
import Alerts from "components/Alerts"
import SettingsButton from "ui/button/modal/settings"
import AddFileInput from "ui/input/addFile"

export default function Settings({}) {
  const [affirmation, setAffirmation] = useState("")
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  // const [isSuccess, setIsSuccess] = useState({
  //   affirmation: false,
  //   image: false,
  //   audio: false,
  // })

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }
  const changeAffirmation = async () => {
    if (!affirmation) return
    AsyncStore.setIsLoading(true)
    const data = await changeAffirmationApi(affirmation)
    if (data.isSuccess) {
      MessageStore.setSuccess(`affirmation updated successfully`)
    } else {
      MessageStore.setError("problem updating affirmation")
    }
    console.log(data)
    AsyncStore.setIsLoading(false)
  }

  const addImage = async (image, type) => {
    const res = await addImageApi(image, type)
    if (res.isSuccess) {
      MessageStore.setSuccess(`added ${type} successfully`)
    } else {
      MessageStore.setSuccess(`added ${type} failed`)
    }
  }
  return (
    <div
      className=" p-6 gap-5  w-full rounded-xl
     h-[85vh] flex flex-col 
     items-center  bg-green  
      text-lg font-bold"
    >
      <Alerts />
      <input
        dir="rtl"
        ref={inputRef}
        type="text"
        value={affirmation}
        onChange={(e) => setAffirmation(e.target.value)}
        placeholder="Type your short suggestion"
        className="border-2 border-[#d4d6db] rounded-md w-[20rem] h-10 pr-2"
      />
      <SettingsButton
        onClick={changeAffirmation}
        className="bg-red w-10 h-10 border-2"
      >
        Update affirmation
      </SettingsButton>
      <div>
        <input type="file" onChange={onImageChange} className="filetype" />

        <Image
          width={32}
          height={32}
          className="rounded-lg "
          alt="preview image"
          src={image ? image : ""}
        />
      </div>
      <SettingsButton
        onClick={() => addImage(image, "image")}
        className="bg-red w-10 h-10 border-2"
      >
        Upload Image
      </SettingsButton>

      <input type="file" onChange={onImageChange} className="filetype" />
      {/* {isSuccess.image && <Alert>Image uploaded</Alert>} */}
      <SettingsButton
        onClick={() => addImage(image, "voice")}
        className="bg-red w-10 h-10 border-2"
      >
        Upload Image
      </SettingsButton>
    </div>
  )
}
