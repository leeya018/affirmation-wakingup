import { db, storage, auth } from "./firebase"
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { getResponse, isSameDay } from "@/util"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { formatSeconds } from "@/util"
import { formatDate } from "@/util"
// data in fire
// affirmation
// currencAffirmation,
// voiceFile
// practices:[
// affirmation
//   date:
//   score:{
//     voice:1,
//     type:2
//   }
// ]
// }
// }
export const getUserApi = async () => {
  try {
    const uid = auth.currentUser.uid

    const userRef = doc(db, "users", uid)

    // Fetch the document
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return getResponse("user not found").NOT_FOUND
    }
    // User document data
    const userData = userSnap.data()

    return getResponse("Get the user", { ...userData, id: uid }).SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const changeAffirmationApi = async (affirmationName) => {
  try {
    const uid = auth.currentUser.uid
    const userRef = doc(db, "users", uid) // Replace 'groups' with your actual collection name

    await updateDoc(userRef, {
      affirmation: affirmationName,
    })
    return getResponse("Affirmation has changed").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const addPracticeApi = async (practice) => {
  try {
    var today = new Date()
    today.setDate(today.getDate() + 1)
    const uid = auth.currentUser.uid
    const userRef = doc(db, "users", uid) // Replace 'groups' with your actual collection name
    const userSnap = await getDoc(userRef)
    if (!userSnap.exists()) {
      return getResponse("User " + uid + " does not exist").NOT_FOUND
    }
    const user = userSnap.data()
    let practices = user.practices
    let foundPractice = practices.find((p) => p.date === formatDate(today))
    if (foundPractice) {
      foundPractice.voice += practice.voice
      foundPractice.type += practice.type
      practices.map((p) => {
        p.date === formatDate(today) ? foundPractice : p
      })
    } else {
      practices.push({ ...practice, date: formatDate(today) })
    }
    await updateDoc(userRef, {
      practices,
    })

    return getResponse("Practice added ").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

const addUser = async (user, id) => {
  const userRef = doc(db, "users", id)
  if (!userRef) return
  await setDoc(
    userRef,
    {
      ...user,
    },
    { merge: true }
  )
}

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

    await addUser(newUser, uid)

    return getResponse("signup success").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const loginApi = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    return getResponse("user logged in successfully").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}
