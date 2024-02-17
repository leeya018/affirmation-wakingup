import { db, storage } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"

export const getUserApi = async (user) => {
  try {
    console.log("localStorage", user.uid)

    const userRef = doc(db, "users", user.uid)

    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return "user not found"
    }

    const userData = userSnap.data()

    return { ...userData, id: user.uid }
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
