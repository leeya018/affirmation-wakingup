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
import {
  getBlob,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage"
import { UserStore } from "mobx/userStore"

export const getUserApi = async () => {
  try {
    const uid = localStorage.getItem("uid")
    console.log("localStorage", uid)

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
    const uid = localStorage.getItem("uid")

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
    // today.setDate(today.getDate() - 8)
    const uid = localStorage.getItem("uid")

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
    UserStore.setUser({ ...UserStore.user, practices })
    await updateDoc(userRef, {
      practices,
    })

    return getResponse("Practice added ").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const addUserApi = async (user, id) => {
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

    await addUserApi(newUser, uid)

    return getResponse("signup success").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const addAudioFileApi = async (file) => {
  let storageRef = storage.ref()
  let metadata = {
    contentType: "audio/mp3",
  }
  let filePath = `${file.externalDataDirectory}` + `${"fileName"}`
  file.readAsDataURL(file.externalDataDirectory, "fileName").then((file) => {
    let voiceRef = storageRef
      .child(`voices/${"fileName"}`)
      .putString(file, storage.StringFormat.DATA_URL)
    voiceRef.on(
      storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log("uploading")
      },
      (e) => {
        console.log(e)
        console.log(JSON.stringify(e, null, 2))
      },
      () => {
        var downloadURL = voiceRef.snapshot.downloadURL
        console.log(downloadURL)
      }
    )
  })
}

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
    return getResponse("user logged in successfully", res.data).SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}
// add file and add the audio
export const addImageApi = async (file) => {
  try {
    const uid = localStorage.getItem("uid")

    const storageRef = ref(storage, `users/${uid}/images/${file.name}`)

    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)

    console.log(`File available at: ${downloadURL}`, db)
    const userRef = doc(db, "users", uid)
    updateDoc(userRef, {
      imageAffirmation: downloadURL,
    })
    return getResponse("Uploaded file image successfully", downloadURL).SUCCESS
  } catch (error) {
    console.log(error.message)
    return getResponse(error.message).GENERAL_ERROR
  }
}
export const addAudioApi = async (file) => {
  try {
    const uid = localStorage.getItem("uid")

    const storageRef = ref(storage, `users/${uid}/audios/${file.name}`)

    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)

    console.log(`File available at: ${downloadURL}`, db)
    const userRef = doc(db, "users", uid)
    updateDoc(userRef, {
      audioAffirmation: downloadURL,
    })
    return getResponse("Uploaded file audio successfully", downloadURL).SUCCESS
  } catch (error) {
    console.log(error.message)
    return getResponse(error.message).GENERAL_ERROR
  }
}
