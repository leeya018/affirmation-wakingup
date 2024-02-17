// import {
//   addPracticeApi,
//   changeAffirmationApi,
//   getUserApi,
//   loginApi,
//   signupApi,
// } from "firebaseDb"
// import { messageStore } from "mobx/messageStore"
// import React, { useEffect } from "react"

// export default function index() {
//   const signUp = async () => {
//     const data = await signupApi(user,{
//       name: "adi",
//       email: "ida2@gmail.com",
//       password: "password2121",
//     })
//     console.log(data)
//   }

//   const login = async () => {
//     const data = await loginApi(user,{
//       email: "ida2@gmail.com",
//       password: "password2121",
//     })
//     console.log(data)
//   }
//   const getUser = async () => {
//     const data = await getUserApi(user,"ZEGQUOnJlEZwwT19qQKInHtwz5m2")
//     console.log(data)
//   }

//   const changeAffirmation = async () => {
//     tryca
//      await changeAffirmationApi(user,"I am the king")
//     console.log(data)
//   }
//   const addPractice = async () => {
//     try {
//       const data = await addPracticeApi(user,{
//         voice: 1,
//         type: 0,
//       })
//       console.log(data)
//       messageStore.setMessage("Practice added successfully", 200)
//     } catch (error) {
//       messageStore.setMessage("Could not add Practice ", 500)
//     }
//   }

//   return (
//     <div
//       className="w-full  h-[100vh] flex flex-col  justify-center items-center gap-10
//     "
//     >
//       <div className="font-bold text-xl">affirmations-firebase</div>
//       <div>
//         <button
//           onClick={signUp}
//           className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
//         >
//           signup
//         </button>
//         <button
//           onClick={login}
//           className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
//         >
//           login
//         </button>
//         <button
//           onClick={getUser}
//           className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
//         >
//           getUserApi
//         </button>
//         <button
//           onClick={changeAffirmation}
//           className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
//         >
//           changeAffirmation
//         </button>
//         <button
//           onClick={addPractice}
//           className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
//         >
//           addPractice
//         </button>
//       </div>
//     </div>
//   )
// }
