import React from "react";
import {useMediaQuery} from "react-responsive"
import RegisterDesktop from "./Desktop/RegisterDesktop"
import RegisterMobile from "./Mobile/RegisterMobile"

const Register = () => {

  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <RegisterDesktop/> : <RegisterMobile/>
  )
}

export default Register