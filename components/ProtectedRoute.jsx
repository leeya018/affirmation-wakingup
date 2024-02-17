"use client"
import { auth } from "@/firebase"
import userStore from "@/mobx/userStore"
import { NavNames } from "@/util"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function ProtectedRout({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        setIsAuthenticated(true)
        userStore.setUser(user)
      } else {
        userStore.setUser(null)
        router.push(NavNames.login)
      }
      setIsLoading(false)
    })

    return () => unSub()
  }, [])

  if (isLoading) {
    return <div>Loading ....</div>
  }
  return isAuthenticated ? <div>{children}</div> : null
}
