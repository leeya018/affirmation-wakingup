import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "@/firebase"

export const getFilesByUserApi = async (user, collectionName) => {
  try {
    const storageRef = ref(storage, `users/${user.uid}/${collectionName}`)
    // Get all the items (files) in the reference
    const res = await listAll(storageRef)

    const fileInfoPromises = res.items.map((itemRef) => {
      // Get the download URL for each image
      return getDownloadURL(itemRef).then((url) => {
        // Return an object containing both the name and the URL of the image
        return {
          name: itemRef.name,
          url: url,
        }
      })
    })

    // Wait for all image info to be fetched
    const files = await Promise.all(fileInfoPromises)
    console.log(files)
    return files
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
