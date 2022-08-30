import React, { useEffect, useState } from 'react'
import { getCookie } from "../../utils/cookies";
import jwt_decode from "jwt-decode";
import NotFound from "../NotFound";
import '../../styles/AdminPage.css'

const ApplicantListMobile = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    if (getCookie('access_token') !== undefined) {
      let decoded: any = jwt_decode(getCookie('access_token'))
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
    }
  }, [])

  if (!isAdmin) {
    return (
      <NotFound/>
    )
  } else {
    return (
        <div className={'minSize'}>화면 크기를 늘여주세요.</div>
    )
  }
}

export default ApplicantListMobile