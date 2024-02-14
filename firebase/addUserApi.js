import { db } from "@/firebase"

import { doc, setDoc } from "firebase/firestore"

export const addUserApi = async (user, id) => {
  const userRef = doc(db, "users", id)
  if (!userRef) return
  await setDoc(
    userRef,
    {
      ...user,
    },
    { merge: true }
  )
}
