import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AdminSideBar from "../../components/AdminSideBar";
import NotFound from "../NotFound";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import { AiOutlineCheck } from "react-icons/ai";
import { ImCancelCircle } from 'react-icons/im'
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "../../utils/cookies";

const LoanRequestListDesktop = () => {

  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const {data, error} = useSWR('https://bookmanager-api.jinhyo.dev/api/book/loan', fetcher)

  useEffect(() => {
    if (getCookie('access_token') !== undefined) {
      let decoded: any = jwt_decode(getCookie('access_token'))
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
    }
  }, [])

  const loanApproval = (id: number) => {
    axios
      .post(`https://bookmanager-api.jinhyo.dev/api/book/loan/approval?id=${id}`)
      .then((res) => {
        Swal.fire({
          title: 'Success',
          text: '승인이 완료되었습니다 !',
          icon: 'success',
          confirmButtonText: '확인'
        }).then(() => {
          window.location.reload()
        })
      })
  }

  const deleteLoanRequest = (id: number) => {
    axios.delete(`https://bookmanager-api.jinhyo.dev/api/book/loan/refuse?id=${id}`)
      .then((res) => {
        Swal.fire({
          title: 'Success',
          text: '도서 거부가 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인'
        }).then(() => {
          window.location.reload()
        })
      })
      .catch(() => {
        alert('ERROR')
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
                <a href={'/loan-request'} style={{color: '#000'}}> 대출 신청 목록</a>
                <div className={'divider'}></div>
              </div>
              {
                data.length === 0 && (
                  <div className={'noDataBox'}>
                    <div>현재 대출 신청 목록이 없습니다.</div>
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
                        <th>총 수량</th>
                        <th>남은 수량</th>
                        <th>수락 여부</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Object.values(data).map((log: any, index) => (
                        <tr key={index}>
                          <td>{log.name}</td>
                          <td>{log.book.title}</td>
                          <td>{log.book.author}</td>
                          <td>{log.book.publisher}</td>
                          <td>{log.book.quantity}</td>
                          <td>{log.book.quantityleft}</td>
                          <td>
                            <button
                              onClick={() => {
                                loanApproval(log.id)
                              }}
                              className={'acceptBtn approvalBtn'}
                            >
                              <AiOutlineCheck style={{marginBottom: '-2px'}}/>
                              <span style={{marginLeft: '2px'}}>승인</span>
                            </button>
                            <button className={'cancelBtn approvalBtn'}
                                    onClick={() => deleteLoanRequest(log.id)}
                            >
                              <ImCancelCircle style={{marginBottom: '-2px'}}/>
                              <span style={{marginLeft: '4px'}}>삭제</span>
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

export default LoanRequestListDesktop