import { userStore } from "mobx/userStore";
import { db, storage } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const getRecordsApi = async () => {
  const userRef = doc(db, "users", userStore.uid);

  // Fetch the document
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // User document data
    const userData = userSnap.data();

    return userData.records;
  } else {
    // Handle the case where the document does not exist
    console.error("User does not exist");
    throw new Error("User does not exist");
  }
};

const addRecordApi = async (record) => {
  const userRef = doc(db, "users", userStore.uid);
  if (!userRef) return;
  // First, get the current balance
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  if (userData.records[record.level] < record.score) {
    let tmpRecs = { ...userData.records };
    tmpRecs[record.level] = record.score;
    // Finally, update the balance in the database
    await setDoc(
      userRef,
      {
        records: tmpRecs,
      },
      { merge: true }
    );
  }
};
const initUserRecordsApi = async (name) => {
  const userRef = doc(db, "users", userStore.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      name: name,
      records: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    });
  }
};

const getAllUsersRecordsApi = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const usersDocs = querySnapshot.docs.map((doc) => doc.data());
  return usersDocs;
};

export {
  getRecordsApi,
  addRecordApi,
  initUserRecordsApi,
  getAllUsersRecordsApi,
};
