import React from "react";
import { useMediaQuery } from "react-responsive"
import OverdueListDesktop from "./Desktop/OverdueListDesktop";
import OverdueListMobile from "./Mobile/OverdueListMobile";

const OverdueList = () => {

  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <OverdueListDesktop/> : <OverdueListMobile/>
  )
}

export default OverdueList