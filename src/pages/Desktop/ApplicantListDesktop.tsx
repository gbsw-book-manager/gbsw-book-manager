import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import AdminSideBar from "../../components/AdminSideBar";
import NotFound from "../NotFound";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "../../utils/cookies";

const ApplicantListDesktop = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const {data, error} = useSWR('https://bookmanager-api.jinhyo.dev/api/book/application', fetcher)

  useEffect(() => {
    if (getCookie('access_token') !== undefined) {
      let decoded: any = jwt_decode(getCookie('access_token'))
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
    }
  }, [])

  const deleteApplication = (id: number) => {
    axios
      .delete(`https://bookmanager-api.jinhyo.dev/api/book/application?id=${id}`)
      .then(() => {
        Swal.fire({
          text: '삭제가 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인'
        }).then(() => {
          window.location.reload()
        })
      })
      .catch(() => {
        alert('Error')
      })
  }

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

              {
                data.length === 0 && (
                  <div className={'noDataBox'}>
                    <div>현재 희망 도서 목록이 없습니다.</div>
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
                        <th style={{background: '#f09409'}}>신청자</th>
                        <th style={{background: '#f09409'}}>도서명</th>
                        <th style={{background: '#f09409'}}>url</th>
                        <th style={{background: '#f09409'}}>편집</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Object.values(data).map((log: any, index) => (
                        <tr key={index}>
                          <td>{log.applicant}</td>
                          <td>{log.title}</td>
                          <td><a href={log.url} target={'_blank'}>{log.url}</a></td>
                          <button className={'deleteBtn'}
                                  style={{marginRight: 'auto', marginLeft: 'auto', display: 'block', marginTop: '4px'}}
                                  onClick={() => deleteApplication(log.id)}>
                            <BsTrash style={{marginBottom: '-3px'}}/>
                            <span style={{marginLeft: '2px'}}>삭제</span>
                          </button>
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
    } else {
      return <NotFound/>
    }
  }
}


export default ApplicantListDesktop