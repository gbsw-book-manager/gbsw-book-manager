import React, { useEffect, useState } from 'react'
import AdminSideBar from "../../components/AdminSideBar";
import '../../styles/AdminPage.css'
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import { BsTrash } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import TextField from '@mui/material/TextField';
import jwt_decode from "jwt-decode";
import NotFound from "../NotFound";
import axios, { AxiosResponse } from "axios";

const BookManagementDesktop = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [editId, setEditId] = useState<number>(0)
  const [placeHolderTitle, setPlaceHolderTitle] = useState<string>('')
  const [placeHolderAuthor, setPlaceHolderAuthor] = useState<string>('')
  const [placeHolderPublisher, setPlaceHolderPublisher] = useState<string>('')
  const [placeHolderQuantity, setPlaceHolderQuantity] = useState<string>('')
  const [placeHolderQuantityLeft, setPlaceHolderQuantityLeft] = useState<string>('')

  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [publisher, setPublisher] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [quantityLeft, setQuantityLeft] = useState<string>('')

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (user.access_token !== undefined) {
      let decoded: any = jwt_decode(user.access_token)
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
    }
  }, [])

  const [showEditBox, setShowEditBox] = useState<boolean>(false)
  const {data, error} = useSWR('http://localhost:8080/api/book', fetcher)

  const deleteItem = (e: any) => {
    let valueId = e.target.id
    let isTrue = window.confirm('정말로 삭제하시겠습니까?')

    if (isTrue) {
      fetch(`http://localhost:8080/api/book?id=${valueId}`, {method: 'DELETE'})
        .then((res) => {
          console.log(res)
          alert('삭제되었습니다.')
          // window.location.reload()
        })
    }
  }

  const edit = () => {
    let value = window.confirm(`'${placeHolderTitle}' 도서를 수정하시겠습니까?`)

    if (value) {
      let data = {
        "id": editId,
        "title": title,
        "author": author,
        "publisher": publisher,
        "quantity": Number(quantity),
        "quantityleft": Number(quantityLeft)
      }
      axios
        .put('http://localhost:8080/api/book', JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res: AxiosResponse<any>) => {
          alert('수정이 완료되었습니다.')
          window.location.reload()
        });
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
                    {Object.values(data).map((log: any, index) => (
                      <tr key={index}>
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
                          <button id={log.id} name={log.id} className={'editBtn'} onClick={async () => {
                            setEditId(log.id)
                            setPlaceHolderTitle(log.title)
                            setPlaceHolderAuthor(log.author)
                            setPlaceHolderPublisher(log.publisher)
                            setPlaceHolderQuantity(log.quantity)
                            setPlaceHolderQuantityLeft(log.quantityleft)
                            setShowEditBox(true)
                          }}>
                            <AiFillEdit style={{marginBottom: '-3px'}}/>
                            <span style={{marginLeft: '2px'}}>수정</span></button>
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
                        value={title}
                        placeholder={placeHolderTitle}
                        multiline
                        onChange={(e) => setTitle(e.target.value)}
                        variant="standard"
                      />

                      <TextField
                        style={{marginLeft: '40px'}}
                        className={'standard-textarea edit-textarea'}
                        id="standard-textarea"
                        label="저자"
                        value={author}
                        placeholder={placeHolderAuthor}
                        multiline
                        onChange={(e) => setAuthor(e.target.value)}
                        variant="standard"
                      />

                      <TextField
                        style={{marginLeft: '40px'}}
                        className={'standard-textarea edit-textarea'}
                        id="standard-textarea"
                        label="출판사"
                        value={publisher}
                        placeholder={placeHolderPublisher}
                        multiline
                        onChange={(e) => setPublisher(e.target.value)}
                        variant="standard"
                      />

                      <TextField
                        style={{marginLeft: '40px'}}
                        className={'number-textarea edit-textarea'}
                        id="standard-textarea"
                        label="총 수량"
                        value={quantity}
                        placeholder={placeHolderQuantity}
                        multiline
                        onChange={(e) => setQuantity(e.target.value)}
                        variant="standard"
                      />

                      <TextField
                        style={{marginLeft: '40px'}}
                        className={'number-textarea edit-textarea'}
                        id="standard-textarea"
                        label="남은 수량"
                        value={quantityLeft}
                        placeholder={placeHolderQuantityLeft}
                        multiline
                        onChange={(e) => setQuantityLeft(e.target.value)}
                        variant="standard"
                      />
                    </div>
                    <br/><br/>
                    <div className={'editBtnContainer'}>
                      <button onClick={() => setShowEditBox(false)} className={'btn1'}>취소</button>
                      <button className={'btn2'} onClick={edit}>수정</button>
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