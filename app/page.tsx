"use client"
import React, { useState } from "react"
import { Provider } from "react-redux"
import store from "./store/store"
import SigninComponent from "./components/signin"
// import DashboardComponent from "./components/dashboard"

export default function Page() {
  const [isSignin, setIsSignin] = useState(false)
  const handleSigninSuccess = () => {
    setIsSignin(true)
  }
  const handleSignout = () => {
    setIsSignin(false)
  }

  return (
    <>
      <Provider store={store}>
        <SigninComponent onSigninSuccess={handleSigninSuccess} />
        {/* {isSignin ? (
        <DashboardComponent onSignout={handleSignout} />
      ) : (
        <SigninComponent onSigninSuccess={handleSigninSuccess} />
      )} */}
      </Provider>
    </>
  )
}
