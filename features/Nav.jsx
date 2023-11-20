import React, { useEffect, useState } from "react"
import Image from "next/image"
import { UserStore } from "mobx/userStore"
import Person2Icon from "@mui/icons-material/Person2"
import { observer } from "mobx-react-lite"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/router"
import { IoMdExit } from "react-icons/io"
import { TooltipDefault } from "ui/Tooltip"

const Nav = observer(() => {
  const [photoURL, setPhotoURL] = useState("")
  const [displayName, setDisplayName] = useState("")
  const router = useRouter()

  // const user = useUser()

  useEffect(() => {
    setPhotoURL(localStorage.getItem("photoURL"))
    setDisplayName(localStorage.getItem("displayName"))
  }, [])

  // if (!hasPhoto) return null

  const logout = () => {
    signOut(auth)
    UserStore.setUser(null)

    localStorage.removeItem("affirmations")
    localStorage.removeItem("photoURL")
    localStorage.removeItem("displayName")
    localStorage.removeItem("uid")
    router.push("/login")
  }
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
          <Person2Icon className="w-10 h-10   ml-auto cursor-pointer" />
        </div>
      )
    }
  }

  return (
    <div className="absolute top-0  py-4 px-10 bg-white w-full flex justify-between items-center text-black">
      <div className="flex items-center gap-2">
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
          <TooltipDefault text="Logout">
            <IoMdExit size={20} color="gray" onClick={logout} />
          </TooltipDefault>
        </div>

        <div className="">{getProfileImage()}</div>

        <div className="font-medium">hello , {displayName}</div>
      </div>
    </div>
  )
})

export default Nav
