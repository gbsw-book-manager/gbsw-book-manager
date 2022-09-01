import React, { useEffect, useState } from "react"
import { getCookie, removeCookie } from "../../utils/cookies";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import axios from "axios";
import HamburgerMenu from "../../components/HamburgerMenu";
import MyPageComponentMobile from "../../components/MyPageComponentMobile";

const MyPageMobile = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')

  const [currentPasswordIsTrue, setCurrentPasswordIsTrue] = useState<boolean>(true)
  const [newPasswordOverFour, setNewPasswordOverFour] = useState<boolean>(true)
  const [passwordIsEqual, setPasswordIsEqual] = useState<boolean>(true)


  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      Swal.fire({
        title: '로그인 후 이용해 주세요.',
        confirmButtonText: '확인',
      }).then(() => {
        window.location.replace('/')
      })
    }
  }, [])

  useEffect(() => {
    if (getCookie('access_token') !== undefined) {
      let decoded: any = jwt_decode(getCookie('access_token'))
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
      }
    }
  }, [])

  const changePassword = () => {
    if (newPassword.length < 4) {
      setNewPasswordOverFour(false)
    } else {
      setNewPasswordOverFour(true)
    }

    if (newPassword !== checkPassword) {
      setPasswordIsEqual(false)
    } else {
      setPasswordIsEqual(true)
    }

    if (newPassword.length > 3 && newPassword === checkPassword) {
      let data = {
        "username": getCookie('email'),
        "password": currentPassword,
        "newPassword": newPassword,
        "newPasswordCheck": checkPassword
      }
      axios
        .put('http://localhost:8888/api/update-password', JSON.stringify(data), {
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
              removeCookie('name')
              removeCookie('id')
              removeCookie('email')
              removeCookie('studentId')
              window.location.replace('/')
            })
          }
        })
    }
  }

  if (isAdmin) {
    return <div className={'minSize'}>화면 크기를 늘여주세요.</div>
  }
  else {
    return (
      <div>
        <div className={'app'}>
          <HamburgerMenu/>
          <main className="content">
            <div className={'statusBar'}>
              <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
              <a href={'/mypage'} style={{color: '#000'}}> 마이페이지</a>
            </div>
            <div className={'divider'}></div>

            <div className={'mypageContainer'}>

              <span>{getCookie('name')}</span>
              <span style={{
                fontSize: '18px',
                color: '#ccc'
              }}>{isAdmin ? ' 관리자' : ' 학생'}</span>

              <div className={'boxContainer'}>
                <div className={'studentId box'}><span>Student ID</span>
                  <div style={{
                    marginTop: '10px',
                    textAlign: 'center',
                    fontWeight: 'normal',
                    fontSize: '18px'
                  }}>{getCookie('studentId')}</div>
                </div>
                <div className={'email box'} style={{marginLeft: '10px'}}><span>Email</span>
                  <div style={{
                    marginTop: '14px',
                    fontSize: '11.5px',
                    textAlign: 'center',
                    fontWeight: 'normal'
                  }}>{getCookie('email')}</div>
                </div>
              </div>

              <MyPageComponentMobile/>

              <div>
                <div className={'componentTitle'}>비밀번호 변경</div>

                <div style={{marginTop: '25px'}}>

                  <div className="form_group">
                    <label htmlFor="name" className="form_label">현재 비밀번호</label>
                    <input type="password" className="form_input" id="name" placeholder="Current Password"
                           style={{width: '40vw'}} required={true}
                           onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {
                      currentPasswordIsTrue === false && (
                        <div className={'alertMessage'}>
                          현재 비밀번호와 일치하지 않습니다.
                        </div>
                      )
                    }
                  </div>

                  <div className="form_group">
                    <label htmlFor="name" className="form_label">새 비밀번호</label>
                    <input type="password" className="form_input" id="name" placeholder="New Password"
                           style={{width: '40vw'}} required={true}
                           onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {
                      newPasswordOverFour === false && (
                        <div className={'alertMessage'}>
                          비밀번호는 4자 이상이어야 합니다.
                        </div>
                      )
                    }
                  </div>

                  <div className="form_group">
                    <label htmlFor="name" className="form_label">비밀번호 다시 입력</label>
                    <input type="password" className="form_input" id="name" placeholder="Check Password"
                           style={{width: '40vw'}} required={true}
                           onChange={(e) => setCheckPassword(e.target.value)}
                    />
                    {
                      passwordIsEqual === false && (
                        <div className={'alertMessage'}>
                          새 비밀번호와 일치하지 않습니다.
                        </div>
                      )
                    }
                  </div>

                  <button className={'confirmBtn'} onClick={changePassword}>비밀번호 변경</button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default MyPageMobile