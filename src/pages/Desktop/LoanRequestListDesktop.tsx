import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AdminSideBar from "../../components/AdminSideBar";
import NotFound from "../NotFound";

const LoanRequestListDesktop = () => {

  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  let user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (user.access_token !== undefined) {
      let decoded: any = jwt_decode(user.access_token)
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
    }
  }, [])

  if (isAdmin) {
    return (
      <div className={'adminpage'}>
        <div className={'app'}>
          <AdminSideBar/>
          <main className="content">
            <div className={'statusBar'}>
              <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
              <a href={'/loan-request'} style={{color: '#000'}}> 대출 신청 목록</a>
              <div className={'divider'}></div>
            </div>
          </main>
        </div>
      </div>
    )
  } else {
    return <NotFound/>
  }
}

export default LoanRequestListDesktop