import React from "react";
import './LoginButton.css'

const LoginButton = () => {
  return (
    <div>
      <button className={'loginBtn'} onClick={() => window.location.href = "/login"}>Login</button>
    </div>
  )
}

export default LoginButton;