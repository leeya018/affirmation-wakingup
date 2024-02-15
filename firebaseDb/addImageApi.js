import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
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
    return downloadURL
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
