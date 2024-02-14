import { auth, db, storage } from "@/firebase"
import { addUserApi } from "api copy"
import { createUserWithEmailAndPassword } from "firebase/auth"

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

    await addUserApi(newUser, uid)

    return "signup success"
  } catch (error) {
    console.log(error.message)
  }
}
