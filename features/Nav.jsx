import React, { useEffect, useState } from "react"
import { BiBell } from "react-icons/bi"
import Image from "next/image"
import { UserStore } from "mobx/userStore"
import Person2Icon from "@mui/icons-material/Person2"
import { observer } from "mobx-react-lite"

const Nav = observer(() => {
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoURL, setphotoURL] = useState("")
  const [displayName, setdisplayName] = useState("")

  useEffect(() => {
    setphotoURL(localStorage.getItem("photoURL"))
    setdisplayName(localStorage.getItem("displayName"))
    // if (UserStore.user?.photoURL) {
    //   setHasPhoto(true)
    // }
  }, [])

  // if (!hasPhoto) return null

  const getProfileImage = () => {
    // console.log(toJS(userStore.user))
    if (photoURL) {
      return (
        <Image
          alt="profile image"
          width={32}
          height={32}
          className="rounded-lg "
          src={photoURL}
        />
      )
    } else {
      return (
        <div className="flex gap-2 p-2  ">
          <Person2Icon
            className="w-10 h-10   ml-auto cursor-pointer"
            // onClick={login}
          />
        </div>
      )
    }
  }

  return (
    <div className="absolute top-0  py-4 px-10 bg-white w-full flex justify-between items-center text-black">
      <div>
        <Image
          alt="profile image"
          width={32}
          height={32}
          className="rounded-lg "
          src={"/trophy.png"}
        />
      </div>
      <div className="flex justify-between items-center  gap-4">
        <div>
          <BiBell size={20} color="gray" />
        </div>

        <div className="">{getProfileImage()}</div>

        <div className="font-medium">hello , {displayName}</div>
      </div>
    </div>
  )
})

export default Nav
