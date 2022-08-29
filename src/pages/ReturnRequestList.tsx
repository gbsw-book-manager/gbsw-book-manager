import React from "react";
import { useMediaQuery } from "react-responsive";
import ReturnRequestListDesktop from "./Desktop/ReturnRequestListDesktop";
import ReturnRequestListMobile from "./Mobile/ReturnRequestListMobile";

const ReturnRequestList = () => {

  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <ReturnRequestListDesktop/> : <ReturnRequestListMobile/>
  )
}

export default ReturnRequestList