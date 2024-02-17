import { db, storage, auth } from "@/firebase"
import { getUserApi } from "firebaseDb"
import { signInWithEmailAndPassword } from "firebase/auth"
import { messageStore } from "mobx/messageStore"

export const loginApi = async ({ email, password }) => {
  try {
    console.log({ email, password })
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    console.log("login", user)("uid", user.uid)
    messageStore.setMessage("Sign in successfully ", 200)
  } catch (error) {
    messageStore.setMessage(error.message, 500)
  }
}
