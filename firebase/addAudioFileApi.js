import { storage } from "firebase-admin"
import { getDownloadURL, listAll, ref } from "firebase/storage"

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
