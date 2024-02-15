import { db, storage } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"

export const getUserApi = async () => {
  try {
    const uid = localStorage.getItem("uid")
    console.log("localStorage", uid)

    const userRef = doc(db, "users", uid)

    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return "user not found"
    }

    const userData = userSnap.data()

    return { ...userData, id: uid }
  } catch (error) {
    console.log(error.message)
  }
}
