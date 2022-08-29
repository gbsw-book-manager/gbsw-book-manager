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
import Swal from "sweetalert2";
import { getCookie } from "../../utils/cookies";

const BookManagementDesktop = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [editId, setEditId] = useState<number>(0)
  const [deleteId, setDeleteId] = useState<string>('')
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

  const checkQuantityOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    setQuantity(onlyNumber)
  }

  const checkQuantityLeftOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    setQuantityLeft(onlyNumber)
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

  const [showEditBox, setShowEditBox] = useState<boolean>(false)
  const {data, error} = useSWR('http://localhost:8080/api/book', fetcher)

  const deleteItem = (id: string, title: string) => {
    Swal.fire({
      title: `'${title}' 도서를 삭제하시겠습니까?`,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/book?id=${id}`)
          .then((res) => {
            if (res.data.length === 0) {
              Swal.fire( {
                text: `${title} 도서를 삭제 했습니다.` ,
                confirmButtonText: '확인',
                icon: 'success'
              }).then(() => {window.location.reload()})
            } else {
              let str: any = ''
              for (let i in res.data) {
                str += `${res.data[i]}, `
              }

              str = str.slice(0, -1);
              str = str.slice(0, -1);

              Swal.fire( {
                text: `${str} 님이 도서를 대출중이여서 삭제 할 수 없습니다.` ,
                confirmButtonText: '확인',
                icon: 'error'
              })
            }
          })
      }
    })
  }

  const edit = () => {
    if (Number(quantity) < Number(quantityLeft)) {
      alert(`촘 수량보다 남은 수량이 더 많습니다. 다시 시도해주세요. 총 수량 : ${quantity}, 남은 수량 : ${quantityLeft} ${quantity < quantityLeft}`)
    } else if (Number(quantity) >= Number(quantityLeft)) {
      Swal.fire({
        title: `'${placeHolderTitle}' 도서를 수정하시겠습니까?`,
        showDenyButton: true,
        confirmButtonText: '확인',
        denyButtonText: '취소',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            "id": editId,
            "title": title.length === 0 ? placeHolderTitle : title,
            "author": author.length === 0 ? placeHolderAuthor : author,
            "publisher": publisher.length === 0 ? placeHolderPublisher : publisher,
            "quantity": Number(quantity) === 0 ? Number(placeHolderQuantity) : quantity,
            "quantityleft": quantityLeft.length === 0 ? Number(placeHolderQuantityLeft) : quantityLeft
          }
          axios
            .put('http://localhost:8080/api/book', JSON.stringify(data), {
              headers: {
                "Content-Type": `application/json`,
              },
            })
            .then((res: AxiosResponse<any>) => {
              Swal.fire('수정 되었습니다.', '', 'success')
                .then(() => {
                  window.location.reload()
                })
            })
        }
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
                    {Object.values(data).map((log: any, index) => (
                      <tr key={index}>
                        <td>{log.title}</td>
                        <td>{log.author}</td>
                        <td>{log.publisher}</td>
                        <td>{log.quantity}</td>
                        <td>{log.quantityleft}</td>
                        <td>
                          <button onClick={(e) => {
                            setDeleteId(log.id)
                            deleteItem(log.id, log.title)
                          }} className={'deleteBtn'}>
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
                        onChange={checkQuantityOnlyNumber}
                        inputProps={{maxLength: 3}}
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
                        onChange={checkQuantityLeftOnlyNumber}
                        inputProps={{maxLength: 3}}
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