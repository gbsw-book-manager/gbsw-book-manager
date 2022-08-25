import React from 'react'
import { useMediaQuery } from 'react-responsive';
import ApplicantListDesktop from "./Desktop/ApplicantListDesktop";
import ApplicantListMobile from "./Mobile/ApplicantListMobile";

const ApplicantList = () => {

  const isPC = useMediaQuery({
    query: '(min-width: 900px)'
  })

  return (
    isPC ? <ApplicantListDesktop/> : <ApplicantListMobile/>
  )
}

export default ApplicantList