import React, { useEffect, useState } from "react"
import AdminSideBar from "../../components/AdminSideBar";
import jwt_decode from "jwt-decode";
import NotFound from "../NotFound";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineInfoCircle } from 'react-icons/ai'

const StudentManagementDesktop = () => {
  const {data, error} = useSWR('http://localhost:8080/api/users', fetcher)

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

  const getUserLoanBooks = (name: string, id: number) => {
    axios.
      get(`http://localhost:8080/api/user?id=${id}`)
      .then((res) => {
        let books: string = ''
        for (let i = 0; i < res.data.length; i++) {
          books += res.data[i].title + ', '
        }

        books = books.slice(0, -1);
        books = books.slice(0, -1);

        Swal.fire({
          title: `${name}님의 대출 도서 정보`,
          text: `도서 목록 : ${books}`,
          confirmButtonText: '확인',
        })
      })
  }

  if (error) {
    return <div>ERROR</div>
  }
  else if (!data) {
    return <Loading/>
  }
  else {
    if (isAdmin) {
      return (
        <div className={'adminpage'}>
          <div className={'app'}>
            <AdminSideBar/>
            <main className="content">
              <div className={'statusBar'}>
                <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
                <a href={'/book-management'} style={{color: '#000'}}> 학생 관리</a>
                <div className={'divider'}></div>
                <div className={'tableContainer'} style={{height: '50vh'}}>
                  <table className={'mainTable'}>

                    <thead>
                    <tr>
                      <th style={{width: '200px', backgroundColor: '#8e279b'}} >이름</th>
                      <th style={{ backgroundColor: '#8e279b' }}>학번</th>
                      <th style={{ backgroundColor: '#8e279b' }}>이메일</th>
                      <th style={{ backgroundColor: '#8e279b' }}>대출 도서 수</th>
                    </tr>
                    </thead>

                    <tbody>
                    {Object.values(data).map((log: any, index) => (
                      <tr key={index}>
                        <td>{log.name}</td>
                        <td>{log.studen_id}</td>
                        <td>{log.username}</td>
                        <td>{log.books.length}권 <button onClick={() => getUserLoanBooks(log.name, log.id)} className={'moreInfo'}><AiOutlineInfoCircle style={{ marginBottom: '-3px', fontSize: '15px' }}/> </button></td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
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

export default StudentManagementDesktop