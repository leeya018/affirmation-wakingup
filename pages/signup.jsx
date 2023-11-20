import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { signupApi } from "api"
import { MessageStore } from "mobx/messageStore"
import Alerts from "components/Alerts"
import { useFormik } from "formik"
import * as Yup from "yup"
import FormikBoxErr from "ui/FormikBoxErr"

export default function signup() {
  const router = useRouter()
  const inputRef = useRef(null)
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const { setSuccess, setError } = MessageStore

  const formik = useFormik({
    initialValues: {
      name: "",
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
      name: Yup.string().required("Name is required"),
    }),
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const signup = async () => {
    const { name, email, password } = formik.values
    setIsLoading(true)
    const data = await signupApi({
      email,
      name,
      password,
    })

    console.log(data)
    if (data.isSuccess) {
      setSuccess(data.message)
      router.push("/login")
    } else {
      setError(data.message)
    }
    setIsLoading(false)
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
            <div className="text-4xl font-bold mb-2">Sign up</div>
            <div className="mb-10 font-semibold">
              Fill your name, email and password{" "}
            </div>

            {/*  form  */}
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Full Name"
                  className="mb-2  border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue"
                />
              </div>
              <div>
                <input
                  ref={inputRef}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Email"
                  className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue"
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
                  className="mb-4 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2  w-full focus:border-[#4B6DCF]"
                />
                <button
                  type="submit"
                  onClick={signup}
                  disabled={isLoading}
                  className={`${
                    isLoading ? "bg-gray" : "bg-[#4B6DCF]"
                  }  border-2  rounded-xl w-full py-2 text-white font-semibold flex justify-center items-center`}
                >
                  Sign up
                </button>
                <FormikBoxErr>
                  {formik.errors.name &&
                    formik.touched.name &&
                    formik.errors.name}
                </FormikBoxErr>
                <FormikBoxErr>
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </FormikBoxErr>
                <FormikBoxErr>
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </FormikBoxErr>
              </div>
            </form>
            <Alerts />
          </div>
          {/* end */}
          <div className="flex flex-col items-center text-sm ">
            <div className="text-gray_dark">Already have an account? </div>
            <div
              className="text-[#4B6DCF] underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
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
  )
}
// {/* left */}
// <div className="h-full border-r-2 border-gray w-[50%] flex justify-center">
//   <div className="text-4xl font-bold ">Google Account</div>
//   <button onClick={googleLogin}>Sign in</button>
// </div>
// {/* right */}
// <div className="h-full border-gray w-[50%]">1</div>
