import React from "react";
import {useMediaQuery} from "react-responsive";
import ReturnDesktop from "./Desktop/ReturnDesktop";
import ReturnMobile from "./Mobile/ReturnMobile";

const Return = () => {

  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <ReturnDesktop/> : <ReturnMobile/>
  )
}

export default Return