import React, { useEffect } from "react";
import Title from "ui/Title";
import { useRouter } from "next/router";
import StandardButton from "ui/button/standard";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { userStore } from "mobx/userStore";
import { initUserRecordsApi } from "api";

export default function loginOption() {
  const router = useRouter();
  const { setLoginUser, setToken, getToken } = userStore;

  // useEffect(() => {
  //   const newToken = getToken()
  //   if (newToken) {
  //     setToken(newToken)
  //     const user = parseJwt(newToken)
  //     const newUser = {
  //       photoURL: user.picture,
  //       displayName: user.name,
  //       uid: user.user_id,
  //     }
  //     setLoginUser(newUser)
  //     console.log({ user })
  //   }
  // }, [getToken, setLoginUser])

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const someToken = credential.accessToken;
        // console.log(token)

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setToken(user.accessToken);
        console.log(user.photoURL);
        console.log(user.displayName);
        console.log(user.uid);
        setLoginUser(user);
        initUserRecordsApi(user.displayName);
        // debtStore.addUser(user.uid, user.displayName)
        router.push("/");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="text-black h-[100vh] w-screen flex flex-col justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center   gap-2">
        <Title className={"text-xl"}>Choose Login method:</Title>

        <StandardButton onClick={login} className="w-[60%] text-black">
          Google
        </StandardButton>
        <StandardButton
          onClick={() => router.push(`/login`)}
          className="w-[60%] text-black "
        >
          Email & Password
        </StandardButton>
        <button>end</button>
      </div>
    </div>
  );
}
