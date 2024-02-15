import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { formatDate } from "@/util"

export const addPracticeApi = async (practice) => {
  try {
    var today = new Date()
    // today.setDate(today.getDate() - 8)
    const uid = localStorage.getItem("uid")

    const userRef = doc(db, "users", uid) // Replace 'groups' with your actual collection name
    const userSnap = await getDoc(userRef)
    if (!userSnap.exists()) {
      return "User " + uid + " does not exist"
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
    console.log("practices added")
    return practices
  } catch (error) {
    console.log(error.message)
  }
}
