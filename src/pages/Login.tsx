import React, { ChangeEvent, useState } from "react";
import PagesLogo from "../components/PagesLogo";
import '../styles/Login.css'
import axios from "axios";
import qs from 'qs';
import { setCookie } from "../utils/cookies";

const Login = () => {

  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [login, setLogin] = useState<boolean>(true)

  const loginHandler = () => {
    axios({
      method: "post",
      url: "https://bookmanager-api.jinhyo.dev/api/login",
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
        setCookie('access_token', res.data.access_token, {
          path: '/',
          secure: 'true',
        })
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
      <div className={'LogintopGap'}></div>
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
            <div className={'incorrectPhrase'}>아이디 또는 비밀번호가 일치하지 않습니다.</div>
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
