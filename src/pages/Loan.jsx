import React from "react";
import { useMediaQuery } from 'react-responsive';
import LoanDesktop from "./Desktop/LoanDesktop";
import LoanMobile from "./Mobile/LoanMobile";

const Loan = () => {
  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <LoanDesktop/> : <LoanMobile/>
  )
}

export default Loan
