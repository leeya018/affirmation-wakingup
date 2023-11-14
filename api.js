import { db, storage, auth } from "./firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getResponse } from "util";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
  const uid = auth.currentUser.uid;

  const userRef = doc(db, "users", uid);

  // Fetch the document
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // User document data
    const userData = userSnap.data();

    return userData;
  } else {
    // Handle the case where the document does not exist
    console.error("User does not exist");
    throw new Error("User does not exist");
  }
};

export const changeAffirmationApi = async (affirmationName) => {
  try {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid); // Replace 'groups' with your actual collection name

    await updateDoc(userRef, {
      affirmation: affirmationName,
    });
    return getResponse("Affirmation has changed").SUCCESS;
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR;
  }
};

export const addPracticeApi = async (practice) => {
  try {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid); // Replace 'groups' with your actual collection name
    const userSnap = await getDoc(userRef);
    const user = userSnap.doc();
    if ((user.practices, length === 0)) {
      await updateDoc(userRef, {
        practices: arrayUnion(practice),
      });
    }
    // }else{
    //   const len = user.practices.length
    //   user.practices[len-1].
    // }
    return getResponse("Practice added ").SUCCESS;
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR;
  }
};

const addUser = async (user, id) => {
  const userRef = doc(db, "users", id);
  if (!userRef) return;
  await setDoc(
    userRef,
    {
      ...user,
    },
    { merge: true }
  );
};

export const signupApi = async (user) => {
  const { email, password, name } = user;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    const newUser = { email, name };

    await addUser(newUser, uid);

    return getResponse("signup success").SUCCESS;
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR;
  }
};

export const loginApi = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return getResponse("user logged in successfully").SUCCESS;
  } catch (error) {
    return getResponse(error.message).GENERAL_ERROR;
  }
};
