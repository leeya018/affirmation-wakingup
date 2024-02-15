import React, { use, useEffect, useRef, useState } from "react"
import Image from "next/image"

import { AsyncStore } from "mobx/asyncStore"
import SettingsButton from "ui/button/settings"
import { UserStore } from "mobx/userStore"
import { observer } from "mobx-react-lite"
import BasicSelect from "ui/basicSelect"
import { storageNames } from "@/util"
import {
  addAudioApi,
  updateUserApi,
  addImageApi,
  changeAffirmationApi,
  getFilesByUserApi,
} from "firebaseDb"
import { messageStore } from "mobx/messageStore"
import Alerts from "components/Alerts"

function Settings() {
  const [affirmation, setAffirmation] = useState("")
  const [isAffirmationChanged, setIsAffirmationChanged] = useState(false)
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [audioUrl, setAudioUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [audioItemOptions, setAudioItemOptions] = useState([])
  const [imageItemOptions, setImageItemOptions] = useState([])
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

  // useEffect(() => {
  //   console.log({ getFilesByUserApi })
  // }, [])
  useEffect(() => {
    setAffirmation(UserStore.user?.affirmation)
  }, [UserStore.user])

  useEffect(() => {
    getSources()
    // if (UserStore.user) {
    // }
  }, [])

  const getSources = async () => {
    const res = await Promise.all([
      getFilesByUserApi(storageNames.images),
      getFilesByUserApi(storageNames.audios),
    ])
    console.log({ res })
    setImageItemOptions(res[0])
    setAudioItemOptions(res[1])
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAffirmationStatus((prev) => ({ ...prev, image: "" }))
      setImage(event.target.files[0])
    }
  }
  const editUser = async (userInfo) => {
    try {
      console.log({ userInfo })
      const data = await updateUserApi(userInfo)
      UserStore.updateUser(userInfo)
      console.log(data)
    } catch (error) {
      console.log(error.message)
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
    try {
      if (!file) {
        updateMessage("audio", `you have to  choose audio file first `, false)

        return null
      }
      const downloadURL = await addAudioApi(file)
      UserStore.updateUser({
        audioAffirmation: downloadURL,
      })
      messageStore.setMessage("Audio added successfully", 200)
    } catch (error) {
      messageStore.setMessage("cannot upload audio ", 500)
    }
  }
  return (
    <div
      className=" p-6 gap-5  rounded-xl w-[90vw] 
     h-[85vh] flex flex-col 
     items-center  bg-white  
      text-lg font-bold shadow-md"
    >
      <div className=" flex flex-col gap-4  w-[90%] items-center md:w-[50%] p-4 md:p-5">
        <Alerts />
        {/* first */}

        <div className="flex flex-col items-center gap-2 md:mr-auto ">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
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
        <div className="flex flex-col items-center gap-2 md:mr-auto ">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <BasicSelect
              className="w-36 h-full box-content"
              handleChange={setImageUrl}
              value={imageUrl}
              options={imageItemOptions}
              name="images select"
            />
            <SettingsButton
              onClick={() => editUser({ imageAffirmation: imageUrl })}
              isDisabled={imageUrl === null}
            >
              Update Image
            </SettingsButton>
          </div>
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
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
        <div className="  flex flex-col items-center gap-2  md:mr-auto">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <BasicSelect
              className="w-36 h-full box-content"
              handleChange={setAudioUrl}
              value={audioUrl}
              options={audioItemOptions}
              name="audio select"
            />
            <SettingsButton
              onClick={() => editUser({ audioAffirmation: audioUrl })}
              isDisabled={audioUrl === null}
            >
              Update Audio
            </SettingsButton>
          </div>
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
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
