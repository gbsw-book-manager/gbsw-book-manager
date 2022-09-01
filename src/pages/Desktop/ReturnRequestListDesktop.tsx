import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AdminSideBar from "../../components/AdminSideBar";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "../../utils/cookies";

const ReturnRequestListDesktop = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const {data, error} = useSWR('http://localhost:8888/api/book/return', fetcher)

  useEffect(() => {
    if (getCookie('access_token') !== undefined) {
      let decoded: any = jwt_decode(getCookie('access_token'))
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
    }
  }, [])

  const returnApproval = (id: number) => {
    axios
      .delete(`http://localhost:8888/api/book/return?id=${id}`)
      .then((res) => {
        Swal.fire({
          title: '도서 반납 승인이 완료되었습니다.',
          confirmButtonText: '확인',
          icon: 'success'
        }).then(() => {
          window.location.reload()
        })
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
                <a href={'/return-request'} style={{color: '#000'}}> 반납 신청 목록</a>
                <div className={'divider'}/>
              </div>

              {
                data.length === 0 && (
                  <div className={'noDataBox'}>
                    <div>현재 반납 신청 목록이 없습니다.</div>
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
                        <th>신청자</th>
                        <th>도서명</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>승인 여부</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Object.values(data).map((log: any, index) => (
                        <tr key={index}>
                          <td>{log.name}</td>
                          <td>{log.book.title}</td>
                          <td>{log.book.author}</td>
                          <td>{log.book.publisher}</td>
                          <td>
                            <button
                              onClick={() => {
                                returnApproval(log.id)
                              }}
                              className={'acceptBtn approvalBtn'}
                            >
                              <AiOutlineCheck style={{marginBottom: '-2px'}}/>
                              <span style={{marginLeft: '2px'}}>승인</span>
                            </button>
                          </td>
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

export default ReturnRequestListDesktop