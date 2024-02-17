import { storage } from "@/firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

export const addAudioFileApi = async (user, file) => {
  const metadata = {
    contentType: "audio/mp3",
  }

  file
    .readAsDataURL(file.externalDataDirectory, "fileName")
    .then((fileData) => {
      const voiceRef = ref(storage, `voices/${"fileName"}`)
      uploadString(voiceRef, fileData, "data_url", metadata)
        .then((snapshot) => {
          console.log("Upload completed")
          return getDownloadURL(snapshot.ref)
        })
        .then((downloadURL) => {
          console.log("File available at", downloadURL)
        })
        .catch((error) => {
          console.error("Upload failed", error)
        })
    })
}
