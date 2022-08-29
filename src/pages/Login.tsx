import React, { ChangeEvent, useState } from "react";
import PagesLogo from "../components/PagesLogo";
import '../styles/Login.css'
import axios from "axios";
import qs from 'qs';
// import cookies from 'react-cookies';

const Login = () => {

  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [login, setLogin] = useState<boolean>(true)

  // cookies.save('userid', 'coadingHospital',
  //   {
  //     path: '/',        // 쿠키 값을 저장하는 서버 경로
  //     expires,          // 유효 시간
  //     //secure: true,   // 웹 브라우저와 웹 서버가 https로 통신하는 경우에만 쿠키 저장
  //     //httpOnly: true  // document.cookie라는 자바스크립트 코드로 쿠키에 비정상적으로 접속하는 것을 막는 옵션
  //   }
  // )

  const loginHandler = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/api/login",
      data: qs.stringify({
        username: id,
        password: password,
      }),
      responseType: 'json',
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify({
          'access_token': res.data.access_token,
          'studentId': res.data.studentId,
          'name': res.data.name,
          'email': res.data.username,
          'id': res.data.id
        }))
        window.location.replace('/')
      })
      .catch((err) => {
        setLogin(false)
      })
  }

  const handleOnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      loginHandler()
    }
  };

  return (
    <div>
      <div style={{marginTop: '16%'}}></div>
      <PagesLogo/>
      <div className='logoTitle' style={{fontSize: '15px', marginTop: '4px'}}>Gbsw Book Manager</div>

      <div className={'loginContainer'}>
        <input
          className="form userid-form"
          placeholder="email"
          type="text"
          name="userid"
          required
          value={id}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
          onKeyPress={handleOnKeyPress}
        />
        <br/>

        <input
          className="form password-form"
          placeholder="password"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onKeyPress={handleOnKeyPress}
        />

        {
          login === false && (
            <div style={{
              fontSize: '13px',
              marginLeft: '2px',
              marginTop: '3px',
              color: '#d72020'
            }}>아이디 또는 비밀번호가 일치하지 않습니다.</div>
          )
        }
      </div>

      <button className="form-button" onClick={loginHandler}>로그인</button>

      <div style={{textAlign: 'center', marginTop: '20px', fontSize: '14px'}}>아이디가 없으신가요? <a href={'/signup'}>회원가입</a>
      </div>
    </div>
  )
}

export default Login