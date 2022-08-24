import React, {ChangeEvent, useState} from 'react'
import SideBar from "../../components/SideBar"
import Box from '@mui/material/Box';
import '../../styles/Register.scss'
import TextField from "@mui/material/TextField";

const RegisterDesktop = () => {
  const [isTitleFilled, setIsTitleFilled] = useState<boolean>(false)
  const [studentId, setStudentId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const loadData = () => {
    let data = {

    }
  }

  const checkLength = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      setIsTitleFilled(true)
    }
  }

  return (
    <div>
      <div className={'app'}>
        <SideBar/>
        <main className="content">
          <div className={'statusBar'}>
            <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
            <a href={'/register'} style={{color: '#000'}}> 희망도서 신청</a>
            <div className={'divider'}></div>

            <Box
              // className={'addBookFormContainer'}
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
              />

              <div className={'gap'}/>

              <TextField
                helperText="작가를 입력하세요."
                id="demo-helper-text-aligned"
                label="URL"
                // onChange={(e) => setAuthor(e.target.value)}
                // className={'addBookForm'}
              />

              <div className={'gap'}/>

              <TextField
                helperText="출판사를 입력하세요."
                id="demo-helper-text-aligned"
                label="Publisher"
                // className={'addBookForm'}
                // onChange={(e) => setPublisher(e.target.value)}
              />

              <button>추가</button>
            </Box>

          </div>
        </main>
      </div>
    </div>
  )
}

export default RegisterDesktop;