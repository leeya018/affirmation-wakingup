import React, { useEffect, useRef, useState } from "react"
import Title from "ui/Title"
import { useRouter } from "next/router"
import StandardButton from "ui/button/standard"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firebase"
import { loginApi } from "api"
import { MessageStore } from "mobx/messageStore"
import Alerts from "components/Alerts"
import Image from "next/image"
import { useFormik } from "formik"
import * as Yup from "yup"

export default function login() {
  const router = useRouter()
  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setSuccess, setError } = MessageStore

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("onSubmit", values)
    },
    // validate: (values) => {
    //   const errors = {}
    //   if (!values.email) errors.email = "email is required"
    //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    //     errors.email = "Invalid email address"
    //   if (!values.password) errors.password = "password is required"
    //   if (values.password.length < 6)
    //     errors.password = "password has to be at least 6 characters"
    //   return errors
    // },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short"),
    }),
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const login = async () => {
    const { email, password } = formik.values
    setIsLoading(true)

    const data = await loginApi({
      email,
      password,
    })
    if (data.isSuccess) {
      setSuccess(data.message)

      router.push("/")
    } else {
      setError(data.message)
    }
    console.log(data)
    setIsLoading(false)
  }

  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const someToken = credential.accessToken
        // console.log(token)

        // The signed-in user info.
        const user = result.user
        console.log(user)

        console.log(user.photoURL)
        console.log(user.displayName)
        console.log(user.uid)

        // debtStore.addUser(user.uid, user.displayName)
        router.push("/")
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        // const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

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
            <div className="text-4xl font-bold mb-2">Sign in</div>
            <div className="mb-10 font-semibold">Enter email and password </div>
            {/* form */}
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Email"
                  className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue"
                />
                <div className="error text-red">
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Type Password"
                  className="mb-4 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2  w-full focus:border-[#4B6DCF]"
                />
                <div className="error text-red">
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </div>
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
                onClick={googleLogin}
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
            </form>
            <Alerts />
          </div>
          {/* end */}
          <div className="flex flex-col items-center text-sm ">
            <div className="text-gray_dark">Dont have an account? </div>
            <div
              className="text-[#4B6DCF] underline cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign up{" "}
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
  )
}
