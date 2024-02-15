import { db } from "@/firebase"

import { doc, setDoc } from "firebase/firestore"

export const addUserApi = async (user, id) => {
  try {
    const userRef = doc(db, "users", id)
    if (!userRef) return
    await setDoc(
      userRef,
      {
        ...user,
      },
      { merge: true }
    )
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
