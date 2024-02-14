import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"

export const updateUserApi = async (userInfo) => {
  try {
    const uid = localStorage.getItem("uid")

    const userRef = doc(db, "users", uid) // Replace 'groups' with your actual collection name

    await updateDoc(userRef, userInfo)
    console.log("updated user successfully")
    return "user  has changed"
  } catch (error) {
    console.log(error.message)
  }
}
