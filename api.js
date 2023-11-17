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
import { getBlob, ref, uploadBytes } from "firebase/storage"
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
    today.setDate(today.getDate() + 8)
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

    return getResponse("user logged in successfully").SUCCESS
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}
// add file and add the audio
export const addImageApi = async (file, type = "image") => {
  const ext = type === "audio" ? "mp3" : ".png"
  try {
    const uid = auth.currentUser.uid

    const storageRef = ref(storage, `${type}s/${type}_${uid}.${ext}`)

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!")
      return getResponse("Uploaded Image successfully").SUCCESS
    })
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR
  }
}

export const getImageApi = async () => {
  try {
    const uid = auth.currentUser.uid
    const fileRef = ref(storage, `images/image_${uid}`)

    // Get the blob
    getBlob(fileRef)
      .then((blob) => {
        // Do something with the blob here
        console.log("Blob retrieved:", blob)
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error getting blob:", error)
      })
  } catch (error) {
    console.log(error.message)
    return getResponse(error.message).GENERAL_ERROR
  }
}
// export const getImageApi = async () => {
//   try {
//     const uid = auth.currentUser.uid
//     // Reference to your file in Firebase Storage
//     const location = "gs://affirmations-adde0.appspot.com/images"
//     const fileName = `image_${uid}`
//     // const path = `firebasestorage.googleapis.com/images/${fileName}?alt=media`
//     const path = `${location}/${fileName}?alt=media&token=392fe9e3-0ffb-48b0-8ec2-fbe316aff932`
//     console.log("path", path)
//     const fileRef = ref(storage, `${path}`)

//     // Get the blob
//     getBlob(fileRef)
//       .then((blob) => {
//         // Do something with the blob here
//         console.log("Blob retrieved:", blob)
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error("Error getting blob:", error)
//       })
//   } catch (error) {
//     console.log(error.message)
//     return getResponse(error.message).GENERAL_ERROR
//   }
// }
