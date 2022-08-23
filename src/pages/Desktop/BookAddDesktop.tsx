import React, { useEffect, useState } from "react";
import axios, {AxiosResponse} from "axios";
import AdminSideBar from "../../components/AdminSideBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import jwt_decode from "jwt-decode";
import NotFound from "../NotFound";

const BookAddDesktop = () => {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [publisher, setPublisher] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
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

  const checkNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    setQuantity(Number(onlyNumber))
  }


  const addBook = () => {
    if (title.length > 0 && author.length > 0 && publisher.length && quantity > 0) {
      let data = {
        "title": title,
        "author": author,
        "publisher": publisher,
        "quantity": quantity,
      }
      axios
        .post('http://localhost:8080/api/book', JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res: AxiosResponse<any>) => {
          alert('도서 추가가 완료되었습니다.')
          window.location.reload()
        });
    }
  }

  if (isAdmin) {
    return (
      <div className={'adminpage'}>
        <div className={'app'}>
          <AdminSideBar/>
          <main className="content">
            <div className={'statusBar'}>
              <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
              <a href={'/book-add'} style={{color: '#000'}}> 도서 추가</a>
              <div className={'divider'}></div>

              <Box
                className={'addBookFormContainer'}
                // sx={{
                //   display: 'flex',
                //   alignItems: 'center',
                //   '& > :not(style)': { m: 1 },
                // }}
              >
                <TextField
                  helperText="책 제목을 입력하세요."
                  id="demo-helper-text-aligned"
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  className={'addBookForm'}
                />

                <div className={'gap'}/>

                <TextField
                  helperText="작가를 입력하세요."
                  id="demo-helper-text-aligned"
                  label="Author"
                  onChange={(e) => setAuthor(e.target.value)}
                  className={'addBookForm'}
                />

                <div className={'gap'}/>

                <TextField
                  helperText="출판사를 입력하세요."
                  id="demo-helper-text-aligned"
                  label="Publisher"
                  className={'addBookForm'}
                  onChange={(e) => setPublisher(e.target.value)}
                />

                <div className={'gap'}/>

                <TextField
                  helperText="책 수량을 입력해주세요."
                  id="standard-number"
                  label="책 수량"
                  type="number"
                  value={quantity}
                  variant="standard"
                  className={'addBookForm'}
                  onChange={checkNumber}
                />

                <button
                  className={title.length > 0 && author.length > 0 && publisher.length && quantity > 0 ? 'addBookBtnActive' : 'addBookBtnNotActive'}
                  onClick={addBook}>추가
                </button>

              </Box>
            </div>
          </main>
        </div>
      </div>
    )
  } else {
    return <NotFound/>
  }
}

export default BookAddDesktop