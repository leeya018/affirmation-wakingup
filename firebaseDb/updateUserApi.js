import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"

export const updateUserApi = async (user, userInfo) => {
  try {
    const userRef = doc(db, "users", user.uid) // Replace 'groups' with your actual collection name

    await updateDoc(userRef, userInfo)
    console.log("updated user successfully")
    return "user  has changed"
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
