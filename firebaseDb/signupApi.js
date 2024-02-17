import { auth, db, storage } from "@/firebase"
import { addUserApi } from "firebaseDb"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { messageStore } from "mobx/messageStore"

export const signupApi = async (user) => {
  const { email, password, name } = user
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const uid = userCredential.user.uid

    const newUser = { email, name, practices: [] }

    await addUserApi(user, newUser, uid)

    messageStore.setMessage("SignUp successfully ", 200)
  } catch (error) {
    messageStore.setMessage(error.message, 500)
  }
}
