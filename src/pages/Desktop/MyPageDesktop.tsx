import React, { useEffect, useState } from 'react';
import SideBar from "../../components/SideBar";
import '../../styles/MyPage.css'
import jwt_decode from "jwt-decode";
import AdminSideBar from "../../components/AdminSideBar";
import axios from "axios";
import Swal from "sweetalert2";

const MyPageDesktop = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')

  const [currentPasswordIsTrue, setCurrentPasswordIsTrue] = useState<boolean>(true)
  const [newPasswordOverFour, setNewPasswordOverFour] = useState<boolean>(true)
  const [passwordIsEqual, setPasswordIsEqual] = useState<boolean>(true)

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

  const changePassword = () => {
    if (newPassword.length < 4) {
      setNewPasswordOverFour(false)
    }

    if (newPassword !== checkPassword) {
      setPasswordIsEqual(false)
    }

    if (newPassword.length > 3 && newPassword === checkPassword) {
      let data = {
        "username": user.email,
        "password": currentPassword,
        "newPassword": newPassword,
        "newPasswordCheck": checkPassword
      }
      axios
        .put('http://localhost:8080/api/update-password', JSON.stringify(data), {
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
              localStorage.removeItem('user')
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
          <div className={'divider'}></div>

          <div>
            <table className={'mypageTable'}>

              <tr>
                <td className={'tableKey'}>이름</td>
                <td className={'tableValue'}>{user.name}</td>
              </tr>

              <tr>
                <td className={'tableKey'}>학번</td>
                <td className={'tableValue'}>{user.studentId}</td>
              </tr>

              <tr>
                <td className={'tableKey'}>이메일</td>
                <td className={'tableValue'}>{user.email}</td>
              </tr>

              <tr>
                <td className={'tableKey'}>도서 정보</td>
                <td className={'tableValue'}>대출 도서 : 0권<br/>연채 도서: 0권</td>
              </tr>

              <tr>
                <td className={'tableKey'}>비밀번호 변경</td>
                <td className={'tableValue'}>
                  <div className={'passwordChangeContainer'}>
                    <div style={{marginTop: '20px'}}/>
                    <div>
                      <span>현재 비밀번호 </span>
                      <input style={{marginLeft: '35px'}} type={'password'}
                             onChange={(e) => setCurrentPassword(e.target.value)}/>
                      <br/>
                    </div>

                    {
                      currentPasswordIsTrue === false && (
                        <div className={'alertMessage'}>
                          현재 비밀번호와 일치하지 않습니다.
                        </div>
                      )
                    }

                    <div style={{marginTop: '9px'}}>
                      <span>새 비밀번호 </span>
                      <input style={{marginLeft: '48px'}} type={'password'}
                             onChange={(e) => setNewPassword(e.target.value)}/>
                      <br/>
                    </div>

                    {
                      newPasswordOverFour === false && (
                        <div className={'alertMessage'}>
                          비밀번호는 4자 이상이어야 합니다.
                        </div>
                      )
                    }

                    <div style={{marginTop: '9px'}}>
                      <span>비밀번호 다시 입력 </span>
                      <input style={{marginLeft: '5px'}} type={'password'}
                             onChange={(e) => setCheckPassword(e.target.value)}/>
                      <br/>
                    </div>

                    {
                      passwordIsEqual === false && (
                        <div className={'alertMessage'}>
                          새 비밀번호와 일치하지 않습니다.
                        </div>
                      )
                    }

                    <button className={'confirmBtn'} onClick={changePassword}>비밀번호 변경</button>

                    <div style={{marginBottom: '20px'}}/>
                  </div>
                </td>
              </tr>
            </table>

          </div>
        </main>
      </div>
    </div>
  )
}

export default MyPageDesktop;