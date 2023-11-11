import React, { useEffect, useRef, useState } from "react";
import Title from "ui/Title";
import { useRouter } from "next/router";
import StandardButton from "ui/button/standard";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export default function signup() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const googleLogin = () => {
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

        console.log(user.photoURL);
        console.log(user.displayName);
        console.log(user.uid);

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
    <div
      className="w-full  h-[100vh] flex  items-center justify-center 
   overflow-hidden bg-[#F3F3F7]"
    >
      <div className="w-[80%] h-[80vh]  bg-white flex items-center justify-between rounded-xl shadow-xl p-3">
        <div className="flex flex-col items-center justify-between h-full ">
          {/* title */}
          <div className="text-lg font-bold text-left w-full p-2">
            My Affirmations
          </div>
          {/* signin */}
          <div className="w-[80%]">
            <div className="text-4xl font-bold mb-2">Sign up</div>
            <div className="mb-10 font-semibold">
              Choose email and password{" "}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue"
            />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type Password"
              className="mb-4 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2  w-full focus:border-[#4B6DCF]"
            />
            <button className="  border-2 bg-[#4B6DCF] rounded-xl w-full py-2 text-white font-semibold flex justify-center items-center">
              Sign up
            </button>
          </div>
          {/* end */}
          <div className="flex flex-col items-center text-sm ">
            <div className="text-gray_dark">Already have an account? </div>
            <div className="text-[#4B6DCF] underline cursor-pointer">
              Sign in{" "}
            </div>
          </div>
        </div>
        <div className="bg-my_affirmations h-full w-[60%] rounded-xl shadow-lg flex items-center justify-center">
          <div className="text-white font-bold text-5xl rotate-12">
            My Affirmations
          </div>
        </div>
      </div>
    </div>
  );
}
// {/* left */}
// <div className="h-full border-r-2 border-gray w-[50%] flex justify-center">
//   <div className="text-4xl font-bold ">Google Account</div>
//   <button onClick={googleLogin}>Sign in</button>
// </div>
// {/* right */}
// <div className="h-full border-gray w-[50%]">1</div>
