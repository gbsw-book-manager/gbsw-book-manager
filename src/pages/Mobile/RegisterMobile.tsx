import React, { useEffect, useState } from 'react'
import '../../styles/Register.scss'
import HamburgerMenu from "../../components/HamburgerMenu";
import Box from "@mui/material/Box";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";
import axios from "axios";
import jwt_decode from "jwt-decode";

const RegisterMobile = () => {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [userId, setUserId] = useState<string>()
  const [username, setUsername] = useState<string>()

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      Swal.fire({
        title: '로그인 후 이용해 주세요.',
        confirmButtonText: '확인',
      }).then(() => {
        window.location.replace('/')
      })
    } else {
      let decoded: any = jwt_decode(getCookie('access_token'))
      setUserId(decoded.id)
      setUsername(decoded.name)
    }
  }, [])

  const LoadData = () => {
    if (title.length > 0 && url.length > 0) {
      let data = {
        'identifyId': userId,
        'applicant': username,
        "title": title,
        "url": url
      }

      axios
        .post('https://bookmanager-api.jinhyo.dev/api/book/application', JSON.stringify(data), {
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
        <HamburgerMenu/>
        <main className="content">
          <div className={'statusBar'}>
            <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
            <a href={'/register'} style={{color: '#000'}}> 희망도서 신청</a>
            <div className={'divider'}/>
            <Box>

              <div className={'applicantFormMobile'}>

                <div className={'mainTitle'}>희망도서 신청</div>

                <div className={'fieldContainer'}>
                  <input
                    id="demo-helper-text-aligned"
                    placeholder="도서명"
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

                <div className={'fieldContainer'}>
                  <input
                    id="demo-helper-text-aligned"
                    value={url}
                    placeholder={'URL'}
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

export default RegisterMobile