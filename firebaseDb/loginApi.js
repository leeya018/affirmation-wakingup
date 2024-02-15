import { db, storage, auth } from "@/firebase"
import { getUserApi } from "firebaseDb"
import { signInWithEmailAndPassword } from "firebase/auth"

export const loginApi = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    console.log("login", user)
    localStorage.setItem("uid", user.uid)

    const res = await getUserApi()
    return "user logged in successfully", res.data
  } catch (error) {
    console.log(error.message)
  }
}
