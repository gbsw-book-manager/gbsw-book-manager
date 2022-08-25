import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import AdminSideBar from "../../components/AdminSideBar";
import NotFound from "../NotFound";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import { BsTrash } from "react-icons/bs";

const ApplicantListDesktop = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const {data, error} = useSWR('http://localhost:8080/api/book/application', fetcher)

  console.log(data)

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

  if (error) {
    return <div>ERROR</div>
  } else if (!data) {
    return <Loading/>
  } else {
    if (isAdmin) {
      return (
        <div className={'adminpage'}>
          <div className={'app'}>
            <AdminSideBar/>
            <main className="content">
              <div className={'statusBar'}>
                <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
                <a href={'/overdue-list'} style={{color: '#000'}}>희망도서 목록</a>
                <div className={'divider'}></div>
              </div>

              <div className={'tableContainer'}>
                <table className={'mainTable'}>
                  <thead>
                  <tr>
                    <th>신청자</th>
                    <th>도서명</th>
                    <th>url</th>
                    <th>편집</th>
                  </tr>
                  </thead>
                  <tbody>
                  {Object.values(data).map((log: any, index) => (
                    <tr key={index}>
                      <td>{log.applicant}</td>
                      <td>{log.title}</td>
                      <td><a href={log.url} target={'_blank'}>{log.url}</a></td>
                      <button className={'deleteBtn'}
                              style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}}>
                        <BsTrash style={{marginBottom: '-3px'}}/>
                        <span style={{marginLeft: '2px'}}>삭제</span>
                      </button>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      )
    } else {
      return <NotFound/>
    }
  }
}


export default ApplicantListDesktop