import React from "react";
import { useMediaQuery } from 'react-responsive';
import LoanRequestListDesktop from "./Desktop/LoanRequestListDesktop";
import LoanRequestListMobile from "./Mobile/LoanRequestListMobile";

const LoanRequestList = () => {
  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <LoanRequestListDesktop/> : <LoanRequestListMobile/>
  )
}

export default LoanRequestList