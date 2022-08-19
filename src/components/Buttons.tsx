import React from "react"
import './Buttons.css'

const Buttons = () => {
  return (
    <div className={'btnContainer'}>
      <button className={'loginBtn'} onClick={() => window.location.href = "/login"}>Login</button>
      <button className={'signupBtn'} onClick={() => window.location.href = "/signup"}>Sign Up</button>
    </div>
  )
}

export default Buttons;