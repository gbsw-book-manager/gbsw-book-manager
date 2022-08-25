import React, { useEffect, useState } from 'react'
import SideBar from "../../components/SideBar"
import Box from '@mui/material/Box';
import '../../styles/Register.scss'
import TextField from "@mui/material/TextField";
import axios from 'axios'
import Swal from 'sweetalert2'

const RegisterDesktop = () => {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const LoadData = () => {
    if (title.length > 0 && url.length > 0) {
      let data = {
        'identifyId': user.id,
        'applicant': user.name,
        "title": title,
        "url": url
      }

      axios
        .post('http://localhost:8080/api/book/application', JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          Swal.fire({
            title: 'Success',
            text: '희망도서 신청이 완료되었습니다.',
            icon: 'success',
            confirmButtonText: '확인'
          })
          setTitle('')
          setUrl('')
        })
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

            <Box>

              <div className={'applicantForm'}>

                <h1>희망도서 신청</h1>

                <div style={{height: '70px', marginTop: '60px'}}>
                  <TextField
                    id="demo-helper-text-aligned"
                    label="도서명"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={'textfield'}
                  />

                  {
                    title.length === 0 && (
                      <div className={'msg'}>
                        도서명을 입력해주세요.
                      </div>
                    )
                  }
                </div>

                <div style={{height: '70px', marginTop: '25px'}}>
                  <TextField
                    id="demo-helper-text-aligned"
                    label="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={'textfield'}
                  />

                  {
                    url.length === 0 && (
                      <div className={'msg'}>
                        URL을 입력해주세요.
                      </div>
                    )

                  }
                </div>

                <div className={'gap'}/>

                <button onClick={LoadData}
                        className={title.length > 0 && url.length > 0 ? 'applicantBtnActive' : 'applicantBtnNotActive'}>신청
                </button>
              </div>
            </Box>

          </div>
        </main>
      </div>
    </div>
  )
}

export default RegisterDesktop;