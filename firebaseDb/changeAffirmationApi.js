import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"

export const changeAffirmationApi = async (affirmationName) => {
  try {
    const uid = localStorage.getItem("uid")

    const userRef = doc(db, "users", uid) // Replace 'groups' with your actual collection name

    await updateDoc(userRef, {
      affirmation: affirmationName,
    })
    return "Affirmation has changed"
  } catch (error) {
    console.log(error.message)
  }
}
