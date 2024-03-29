import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/firebase"
import { addUserApi, loginApi } from "firebaseDb"
import { MessageStore, messageStore } from "mobx/messageStore"
import Alerts from "components/Alerts"
import Image from "next/image"
import { useFormik } from "formik"
import * as Yup from "yup"
import FormikBoxErr from "ui/FormikBoxErr"

import { ModalStore } from "mobx/modalStore"
import { modals } from "@/util"
import LoadingModal from "components/modal/message/loading"
import { UserStore } from "mobx/userStore"

export default function login() {
  const router = useRouter()
  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("onSubmit", values)
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short"),
    }),
  })

  const login = async () => {
    try {
      const { email, password } = formik.values
      setIsLoading(true)
      // ModalStore.openModal(modals.loading)

      const user = await loginApi({
        email,
        password,
      })
      UserStore.setUser(user)
      setIsLoading(false)
      ModalStore.closeModal()
      messageStore.setMessage("User Logged in successfully", 200)
    } catch (error) {
      messageStore.setMessage(error.message, 500)
    }
  }

  // const googleLogin = () => {
  //   const provider = new GoogleAuthProvider()
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       ModalStore.openModal(modals.loading)

  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result)
  //       const someToken = credential.accessToken
  //       // console.log(token)

  //       // The signed-in user info.
  //       const user = result.user
  //       console.log(user)

  //       console.log(user.photoURL)
  //       console.log(user.displayName)
  //       console.log(user.uid)("photoURL", user.photoURL)("uid", user.uid)(
  //         "displayName",
  //         user.displayName
  //       )

  //       addUserApi(
  //         user,
  //         { email: user.email, name: user.displayName, practices: [] },
  //         user.uid
  //       )
  //         .then(() => {
  //           router.push("/")
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //           // console.log('there was an error connect with google account')
  //           MessageStore.setMessage(err.message, 500)
  //         })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       ModalStore.closeModal()
  //       // Handle Errors here.
  //       const errorCode = error.code
  //       const errorMessage = error.message
  //       // The email of the user's account used.
  //       // const email = error.customData.email
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error)
  //       // ...
  //     })
  // }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (UserCredentialImp) => {
        const { email, displayName, uid } = UserCredentialImp.user
        const newUser = { email, name: displayName, uid, practices: [] }
        console.log(newUser)
        await addUserApi(newUser)
        router.push("/")
      })
      .catch((err) => {
        console.log(err.message)
        throw err
      })
  }

  return (
    <div
      className="w-full  h-[100vh] flex  items-center justify-center 
   overflow-hidden bg-[#F3F3F7]"
    >
      <LoadingModal
        message="Loading..."
        modalName={modals.loading}
        title="Loading"
      />
      <Alerts />
      <div className="w-[80%] h-[80vh]  bg-white flex items-center justify-between rounded-xl shadow-xl p-3">
        <div className="flex flex-col items-center justify-between h-full w-[90%] md:w-[50%] lg:w-[30%] ">
          {/* title */}
          <div className="text-lg font-bold text-left w-full p-2">
            My Affirmations
          </div>
          {/* signin */}
          <div className="w-[80%]">
            <div className="text-4xl font-bold mb-2">Sign in</div>
            <div className="mb-10 font-semibold">Enter email and password </div>
            {/* form */}

            <div>
              <input
                ref={inputRef}
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Email"
                className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 
                  pl-2 w-full focus:border-custom-blue"
              />
            </div>

            <div>
              <input
                type="text"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Type Password"
                className="mb-4  border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2  w-full focus:border-[#4B6DCF]"
              />
            </div>
            <button
              type="submit"
              onClick={login}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray" : "bg-[#4B6DCF]"
              } mb-2  border-2  rounded-xl w-full py-2 text-white font-semibold flex justify-center items-center`}
            >
              Sign in
            </button>
            <button
              onClick={googleSignIn}
              className="bg-[##4284F3]
              mb-2  border-2 border-black  rounded-xl
              w-full py-2 text-white
              font-semibold flex justify-center items-center gap-2"
            >
              <Image
                alt="google image"
                width={32}
                height={32}
                className="rounded-lg "
                src={"/google.png"}
              />
              <div className="text-black">Sign in with Google</div>
            </button>

            <Alerts />
          </div>
          {/* end */}
          <div className="flex flex-col items-center text-sm  mb-5 lg:mb-2">
            <div className="text-gray_dark">Dont have an account? </div>
            <div
              className="text-[#4B6DCF] underline cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign up{" "}
            </div>
          </div>
        </div>

        <div
          className="hidden bg-my_affirmations h-full w-[60%] rounded-xl
         shadow-lg  items-center justify-center  sm:flex  "
        >
          <div className="text-white font-bold text-5xl rotate-12">
            My Affirmations
          </div>
        </div>
      </div>
    </div>
  )
}
