import React, { useEffect, useState } from 'react';
import SideBar from "../../components/SideBar";
import '../../styles/MyPage.css'
import jwt_decode from "jwt-decode";
import AdminSideBar from "../../components/AdminSideBar";
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie, removeCookie } from "../../utils/cookies";
import MyPageComponentDesktop from "../../components/MyPageComponentDesktop";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const MyPageDesktop = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')

  const [currentPasswordIsTrue, setCurrentPasswordIsTrue] = useState<boolean>(true)
  const [newPasswordOverFour, setNewPasswordOverFour] = useState<boolean>(true)
  const [passwordIsEqual, setPasswordIsEqual] = useState<boolean>(true)

  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [numberOfBooks, setNumberOfBooks] = useState<number>(0)
  const [userId, setUserId] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [studentId, setStudentId] = useState<string>()
  const [userEmail, setUserEmail] = useState<string>()

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
      if (decoded.roles.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
      setUserId(decoded.id)
      setUsername(decoded.name)
      setStudentId(decoded.studentId)
      setUserEmail(decoded.username)
    }
  }, [])

  // useEffect(() => {
  //   if (getCookie('access_token') !== undefined) {
  //     let decoded: any = jwt_decode(getCookie('access_token'))
  //     decoded = decoded.roles
  //     if (decoded.includes('ROLE_ADMIN')) {
  //       setIsAdmin(true)
  //     }
  //   }

  axios.get(`https://bookmanager-api.jinhyo.dev/api/user?id=${userId}`)
    .then((res) => {
      setNumberOfBooks(res.data.length)
    })
    .catch(() => {
      setNumberOfBooks(0)
    })


  const changePassword = () => {
    if (newPassword.length < 4) {
      setNewPasswordOverFour(false)
    }

    if (newPassword !== checkPassword) {
      setPasswordIsEqual(false)
    }

    if (newPassword.length > 3 && newPassword === checkPassword) {
      let data = {
        "username": userEmail,
        "password": currentPassword,
        "newPassword": newPassword,
        "newPasswordCheck": checkPassword
      }
      axios
        .put('https://bookmanager-api.jinhyo.dev/api/update-password', JSON.stringify(data), {
          headers: {
            "Content-Type": 'application/json'
          },
        })
        .then((res) => {
          if (res.data) {
            setCurrentPasswordIsTrue(false)
          } else if (!res.data) {
            Swal.fire({
              title: 'Success',
              text: '비밀번호 변경이 완료되었습니다. 다시 로그인해 주세요.',
              icon: 'success',
              confirmButtonText: '확인'
            }).then(() => {
              removeCookie('access_token')
              window.location.replace('/')
            })
          }
        })
    }
  }

  return (
    <div>
      <div className={'app'}>
        {
          isAdmin === true && (
            <AdminSideBar/>
          )
        }

        {
          isAdmin === false && (
            <SideBar/>
          )
        }
        <main className="content">
          <div className={'statusBar'}>
            <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
            <a href={'/mypage'} style={{color: '#000'}}> 마이페이지</a>
          </div>
          <div className={'divider'}/>

          <div className={'desktopMyPage'}>
            <div className={'topContainer'}>

              <div className={'nameTag'}>
                <div>{username}<span className={'isAdmin'}>{isAdmin ? '관리자' : '학생'}</span></div>
              </div>

              <div className={'userinfoContainer'}>
                {
                  !isAdmin && (
                    <div>학번: <span style={{marginLeft: '100px'}}>{studentId}</span></div>
                  )
                }
                <div>Email: <span style={{marginLeft: '80px'}}>{userEmail}</span></div>

                {
                  !isAdmin && (
                    <div>대출 도서 수: <span style={{marginLeft: '21px'}}>{numberOfBooks}권</span></div>
                  )
                }
              </div>

            </div>

            <div className={'bottomContainer'}>
              <div className={'bottomLeft'}>

                <div className={'loanListTitle'}>
                  <div>대출 도서 목록</div>
                </div>

                <MyPageComponentDesktop/>
              </div>
              <div className={'bottomRight'}>
                <div className={'loanListTitle'}>
                  <div>비밀번호 변경</div>


                  <Box>
                    <div className={'changePasswordContainer'}>

                      <div className={'changePasswordBox'}>
                        <TextField
                          id="demo-helper-text-aligned"
                          label="현재 비밀번호"
                          className={'changePasswordField'}
                          type={'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        {
                          currentPasswordIsTrue === false && (
                            <div className={'falseMessage'} style={{fontSize: '12px'}}>
                              현재 비밀번호와 일치하지 않습니다.
                            </div>
                          )
                        }
                      </div>

                      <div className={'changePasswordBox'}>
                        <TextField
                          id="demo-helper-text-aligned"
                          label="새 비밀번호"
                          className={'changePasswordField'}
                          value={newPassword}
                          type={'password'}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {
                          newPasswordOverFour === false && (
                            <div className={'falseMessage'} style={{fontSize: '12px'}}>
                              비밀번호는 4자 이상이어야 합니다.
                            </div>
                          )
                        }
                      </div>

                      <div className={'changePasswordBox'}>
                        <TextField
                          id="demo-helper-text-aligned"
                          label="비밀번호 다시 입력"
                          className={'changePasswordField'}
                          type={'password'}
                          value={checkPassword}
                          onChange={(e) => setCheckPassword(e.target.value)}
                        />
                        {
                          passwordIsEqual === false && (
                            <div className={'falseMessage'} style={{fontSize: '12px'}}>
                              새 비밀번호와 일치하지 않습니다.
                            </div>
                          )
                        }
                      </div>

                      <button className={'changePasswordBtn'} onClick={changePassword}>비밀번호 변경</button>

                    </div>
                  </Box>

                </div>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

export default MyPageDesktop;