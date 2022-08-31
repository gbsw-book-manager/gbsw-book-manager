import React, { useEffect, useState } from 'react'
import AdminSideBar from "../../components/AdminSideBar";
import jwt_decode from "jwt-decode";
import NotFound from "../NotFound";
import { getCookie } from "../../utils/cookies";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";

const OverdueListDesktop = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const {data, error} = useSWR('http://localhost:8080/api/book/overdue', fetcher)

  const overdueDays = (strDate: string) => {
    let year = Number(strDate.slice(0, 4))
    let month = Number(strDate.slice(5, 7)) - 1
    let day = Number(strDate.slice(8, 10))

    let date = new Date(year, month, day);
    let nowDate = new Date()

    let overedDays: string = String((nowDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24)
    return parseInt((overedDays))
  }

  useEffect(() => {
    if (getCookie('access_token') !== undefined) {
      let decoded: any = jwt_decode(getCookie('access_token'))
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
    }
  }, [])

  if (isAdmin) {
    if (error) {
      return <div>ERROR</div>
    } else if (!data) {
      return <Loading/>
    } else {
      return (
        <div className={'adminpage'}>
          <div className={'app'}>
            <AdminSideBar/>
            <main className="content">
              <div className={'statusBar'}>
                <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
                <a href={'/overdue-list'} style={{color: '#000'}}> 연체자 목록</a>
                <div className={'divider'}></div>
              </div>
              {
                data.length === 0 && (
                  <div className={'noDataBox'}>
                    <div>현재 연체자가 없습니다.</div>
                    <button onClick={() => window.location.reload()} className={'reloadBtn'}>새로고침</button>
                  </div>
                )
              }

              {
                data.length > 0 && (
                  <div className={'tableContainer'}>
                    <table className={'mainTable'}>
                      <thead>
                      <tr>
                        <th style={{background: '#31954c'}}>이름</th>
                        <th style={{background: '#31954c'}}>학번</th>
                        <th style={{background: '#31954c'}}>도서명</th>
                        <th style={{background: '#31954c'}}>대출 일자</th>
                        <th style={{background: '#31954c'}}>연체 기간</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Object.values(data).map((log: any, index) => (
                        <tr key={index}>
                          <td>{log.name}</td>
                          <td>{log.studentId}</td>
                          <td>{log.bookTitle}</td>
                          <td>{log.loanDate}</td>
                          <td>{overdueDays(log.loanDate)}일</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </main>
          </div>
        </div>
      )
    }
  } else {
    return <NotFound/>
  }
}

export default OverdueListDesktop