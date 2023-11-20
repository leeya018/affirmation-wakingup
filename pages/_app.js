import { GoogleOAuthProvider } from "@react-oauth/google"
import "../styles/globals.css"
// import { UserProvider } from "context/userContext"

export function reportWebVitals(metric) {
  if (metric.label === "web-vital") {
    console.log(metric.name, metric.value) // or send to analytics
  }
}

export default function App({ Component, pageProps }) {
  return (
    // <UserProvider>
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
    // </UserProvider>
  )
}
