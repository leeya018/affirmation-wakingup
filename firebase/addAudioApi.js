import { db, storage } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"

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
    return "Uploaded file audio successfully", downloadURL
  } catch (error) {
    console.log(error.message)
  }
}
