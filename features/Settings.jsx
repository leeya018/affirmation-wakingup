import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { addAudioApi, changeAffirmationApi } from "api"
import { AsyncStore } from "mobx/asyncStore"
import { MessageStore } from "mobx/messageStore"
import Alerts from "components/Alerts"
import SettingsButton from "ui/button/modal/settings"
import { UserStore } from "mobx/userStore"
import { observer } from "mobx-react-lite"

function Settings() {
  const [affirmation, setAffirmation] = useState("")
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)

  useEffect(() => {
    setAffirmation(UserStore.user?.affirmation)
  }, [UserStore.user])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }
  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }
  const changeAffirmation = async () => {
    if (!affirmation) return
    AsyncStore.setIsLoading(true)
    const data = await changeAffirmationApi(affirmation)
    if (data.isSuccess) {
      UserStore.setUser({ ...UserStore.user, affirmation })
      MessageStore.setSuccess(`affirmation updated successfully`)
    } else {
      MessageStore.setError("problem updating affirmation")
    }
    console.log(data)
    AsyncStore.setIsLoading(false)
  }

  const addImage = async () => {
    if (!image) {
      MessageStore.setError(`You have to  choose file first `)
      return null
    }
    const res = await addAudioApi(image)

    if (res.isSuccess) {
      UserStore.setUser({
        ...UserStore.user,
        imageAffirmation: res.data,
      })
      MessageStore.setSuccess(`added image successfully`)
    } else {
      MessageStore.setError(`added image failed`)
    }
  }
  const addAudio = async () => {
    if (!file) {
      MessageStore.setError(`You have to  choose file first `)
      return null
    }
    const res = await addAudioApi(file)

    if (res.isSuccess) {
      UserStore.setUser({
        ...UserStore.user,
        audioAffirmation: res.data,
      })
      MessageStore.setSuccess(`added file successfully`)
    } else {
      MessageStore.setError(`added file failed`)
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
          src={image ? URL.createObjectURL(image) : ""}
        />
      </div>
      <SettingsButton onClick={addImage} className="bg-red w-10 h-10 border-2">
        Upload Image
      </SettingsButton>

      <input type="file" onChange={onFileChange} className="filetype" />
      {/* {isSuccess.image && <Alert>Image uploaded</Alert>} */}
      <div>{file?.name}</div>
      <SettingsButton onClick={addAudio} className="bg-red w-10 h-10 border-2">
        Upload File
      </SettingsButton>
    </div>
  )
}
export default observer(Settings)
