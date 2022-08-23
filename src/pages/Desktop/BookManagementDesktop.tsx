import React, { useEffect, useState } from 'react'
import AdminSideBar from "../../components/AdminSideBar";
import '../../styles/AdminPage.css'
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import {BsTrash} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import TextField from '@mui/material/TextField';
import jwt_decode from "jwt-decode";
import NotFound from "../NotFound";

const BookManagementDesktop = () => {
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

  const ariaLabel = {'aria-label': 'description'};
  const [showEditBox, setShowEditBox] = useState<boolean>(false)
  const {data, error} = useSWR('http://localhost:8080/api/book', fetcher)

  const deleteItem = (e: any) => {
    let valueId = e.target.id
    let isTrue = window.confirm('정말로 삭제하시겠습니까?')

    if (isTrue) {
      fetch(`http://localhost:8080/api/book?id=${valueId}`, {method: 'DELETE'})
        .then(() => {
          alert('삭제되었습니다.')
          window.location.reload()
        })
    }
  }

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
                <a href={'/book-management'} style={{color: '#000'}}> 도서 관리</a>
                <div className={'divider'}></div>

                <div className={'tableContainer'} style={{height: '50vh'}}>
                  <table className={'mainTable'}>

                    <thead>
                    <tr>
                      <th style={{width: '200px'}}>제목</th>
                      <th>저자</th>
                      <th>출판사</th>
                      <th>총 수량</th>
                      <th>남은 수량</th>
                      <th style={{width: '120px'}}>관리</th>
                    </tr>
                    </thead>

                    <tbody>
                    {Object.values(data).map((log: any) => (
                      <tr key={1}>
                        <td>{log.title}</td>
                        <td>{log.author}</td>
                        <td>{log.publisher}</td>
                        <td>{log.quantity}</td>
                        <td>{log.quantityleft}</td>
                        <td>
                          <button id={log.id} onClick={deleteItem} className={'deleteBtn'}>
                            <BsTrash style={{marginBottom: '-3px'}}/>
                            <span style={{marginLeft: '2px'}}>삭제</span>
                          </button>
                          <button id={log.id} className={'editBtn'}>
                            <AiFillEdit style={{marginBottom: '-3px'}}/>
                            <span style={{marginLeft: '2px'}} onClick={() => setShowEditBox(true)}>수정</span></button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {
                showEditBox === true && (
                  <div className={'editBox'}>
                    <br/><br/><br/>
                    <div className={'editTextFieldContainer'}>
                      <TextField
                        className={'standard-textarea'}
                        id="standard-textarea"
                        label="제목"
                        placeholder="title"
                        multiline
                        variant="standard"
                      />

                      <TextField
                        style={{ marginLeft: '40px' }}
                        className={'standard-textarea edit-textarea'}
                        id="standard-textarea"
                        label="저자"
                        placeholder="Placeholder"
                        multiline
                        variant="standard"
                      />

                      <TextField
                        style={{ marginLeft: '40px' }}
                        className={'standard-textarea edit-textarea'}
                        id="standard-textarea"
                        label="출판사"
                        placeholder="Placeholder"
                        multiline
                        variant="standard"
                      />

                      <TextField
                        style={{ marginLeft: '40px' }}
                        className={'number-textarea edit-textarea'}
                        id="standard-textarea"
                        label="총 수량"
                        placeholder="99"
                        multiline
                        variant="standard"
                      />

                      <TextField
                        style={{ marginLeft: '40px' }}
                        className={'number-textarea edit-textarea'}
                        id="standard-textarea"
                        label="남은 수량"
                        placeholder="99"
                        multiline
                        variant="standard"
                      />
                    </div>
                    <br/><br/>
                    <div className={'editBtnContainer'}>
                      <button onClick={() => setShowEditBox(false)} className={'btn1'}>취소</button>
                      <button className={'btn2'}>수정</button>
                    </div>
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

export default BookManagementDesktop