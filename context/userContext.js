import React, { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/firebase"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("userContext", user)
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
