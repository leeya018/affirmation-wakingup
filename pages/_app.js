import { GoogleOAuthProvider } from "@react-oauth/google"
import "../styles/globals.css"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { UserProvider, useUser } from "context/userContext"

export function reportWebVitals(metric) {
  if (metric.label === "web-vital") {
    console.log(metric.name, metric.value) // or send to analytics
  }
}

export default function App({ Component, pageProps }) {
  const user = useUser()
  const router = useRouter()

  return (
    <UserProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </UserProvider>
  )
}
