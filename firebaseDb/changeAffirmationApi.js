import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"

export const changeAffirmationApi = async (affirmationName) => {
  try {
    const uid = localStorage.getItem("uid")

    const userRef = doc(db, "users", uid)

    await updateDoc(userRef, {
      affirmation: affirmationName,
    })
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
