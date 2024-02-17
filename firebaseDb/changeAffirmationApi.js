import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"

export const changeAffirmationApi = async (user, affirmationName) => {
  try {
    const userRef = doc(db, "users", user.uid)

    await updateDoc(userRef, {
      affirmation: affirmationName,
    })
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
