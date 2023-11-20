import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { addAudioApi, addImageApi, changeAffirmationApi } from "api"
import { AsyncStore } from "mobx/asyncStore"
import SettingsButton from "ui/button/settings"
import { UserStore } from "mobx/userStore"
import { observer } from "mobx-react-lite"

function Settings() {
  const [affirmation, setAffirmation] = useState("")
  const [isAffirmationChanged, setIsAffirmationChanged] = useState(false)
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [txtColor, setTxtColor] = useState({
    text: "text-green",
    image: "text-green",
    audio: "text-green",
  })
  const [affirmationStatus, setAffirmationStatus] = useState({
    text: "",
    image: "",
    audio: "",
  })

  useEffect(() => {
    setAffirmation(UserStore.user?.affirmation)
  }, [UserStore.user])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAffirmationStatus((prev) => ({ ...prev, image: "" }))
      setImage(event.target.files[0])
    }
  }
  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAffirmationStatus((prev) => ({ ...prev, file: "" }))
      setFile(event.target.files[0])
    }
  }
  const updateMessage = (type, message, isSuccess) => {
    setAffirmationStatus((prev) => ({ ...prev, [type]: message }))
    const textColor = isSuccess ? "text-green" : "text-red"
    setTxtColor((prev) => ({ ...prev, [type]: textColor }))
  }
  const changeAffirmation = async () => {
    if (!affirmation) return
    AsyncStore.setIsLoading(true)
    const data = await changeAffirmationApi(affirmation)
    if (data.isSuccess) {
      setIsAffirmationChanged(false)
      UserStore.setUser({ ...UserStore.user, affirmation })
      updateMessage("text", `affirmation updated successfully`, true)
    } else {
      updateMessage("text", `problem updating affirmation`, false)
    }
    console.log(data)
    AsyncStore.setIsLoading(false)
  }

  const addImage = async () => {
    if (!image) {
      updateMessage("image", `You have to  choose file first `, false)

      return null
    }
    const res = await addImageApi(image)

    if (res.isSuccess) {
      UserStore.setUser({
        ...UserStore.user,
        imageAffirmation: res.data,
      })

      updateMessage("image", `added image successfully `, true)
    } else {
      updateMessage("image", `added image failed `, false)
    }
  }
  const addAudio = async () => {
    if (!file) {
      updateMessage("audio", `you have to  choose audio file first `, false)

      return null
    }
    const res = await addAudioApi(file)

    if (res.isSuccess) {
      UserStore.setUser({
        ...UserStore.user,
        audioAffirmation: res.data,
      })
      updateMessage("audio", `added audio successfully `, true)
    } else {
      updateMessage("audio", `added audio failed `, false)
    }
  }
  return (
    <div
      className=" p-6 gap-5  rounded-xl w-[90vw] 
     h-[85vh] flex flex-col 
     items-center  bg-white  
      text-lg font-bold shadow-md"
    >
      <div className="w-[50%]  flex flex-col gap-4 p-5">
        {/* first */}
        <div className="mr-auto flex flex-col items-center gap-2">
          <div className="flex gap-2 items-center">
            <input
              dir="rtl"
              ref={inputRef}
              type="text"
              value={affirmation}
              onChange={(e) => {
                setAffirmationStatus((prev) => ({ ...prev, text: "" }))
                setAffirmation(e.target.value)
                setIsAffirmationChanged(true)
              }}
              placeholder="Type your short suggestion "
              className="border-2 border-[#d4d6db] rounded-md w-[20rem] h-12 pr-2"
            />
            <SettingsButton
              onClick={changeAffirmation}
              isDisabled={!isAffirmationChanged || affirmation.length === 0}
            >
              Update affirmation
            </SettingsButton>
          </div>
          <SettingsAlert
            text={affirmationStatus.text}
            txtColor={txtColor.text}
          />
        </div>
        {/* second */}
        <div className=" mr-auto flex flex-col items-center gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="file"
              onChange={onImageChange}
              className="filetype  border-[#d4d6db] rounded-md w-[20rem] h-12 pr-2"
            />

            <SettingsButton isDisabled={image === null} onClick={addImage}>
              Upload Image
            </SettingsButton>
            <Image
              width={32}
              height={32}
              className="rounded-lg "
              alt="preview image"
              src={image ? URL.createObjectURL(image) : ""}
            />
          </div>
          <SettingsAlert
            text={affirmationStatus.image}
            txtColor={txtColor.image}
          />
        </div>
        {/* third */}
        <div className=" mr-auto flex flex-col items-center gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="file"
              onChange={onFileChange}
              className="filetype border-[#d4d6db] rounded-md w-[20rem] h-12 pr-2"
            />

            <SettingsButton onClick={addAudio} isDisabled={file === null}>
              Upload Audio
            </SettingsButton>
          </div>

          <SettingsAlert
            text={affirmationStatus.audio}
            txtColor={txtColor.audio}
          />
        </div>
      </div>
    </div>
  )
}
export default observer(Settings)

function SettingsAlert({ txtColor, text }) {
  return <div className={`h-5 w-full ${txtColor}`}>{text}</div>
}
