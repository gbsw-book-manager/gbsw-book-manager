import React from "react";
import {useMediaQuery} from "react-responsive"
import MyPageDesktop from "./Desktop/MyPageDesktop";
import MyPageMobile from "./Mobile/MyPageMobile";

const MyPage = () => {

  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <MyPageDesktop/> : <MyPageMobile/>
  )
}

export default MyPage