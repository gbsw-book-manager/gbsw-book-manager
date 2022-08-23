import React, {ChangeEvent, useState} from "react";
import PagesLogo from "../components/PagesLogo";
import '../styles/Login.css'
import axios from "axios";
import qs from 'qs';
import jwt_decode from "jwt-decode";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import {isAdmin} from "../redux/counterSlice";
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  const [isIdFilled, setIsIdFilled] = useState<boolean>()
  const [isPasswordFilled, setIsPasswordFilled] = useState<boolean>()
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [login, setLogin] = useState<boolean>(true)
  const navigate = useNavigate()

  const loginHandler = () => {

  if (id !== '') {
      setIsIdFilled(true)
    } else {
      setIsIdFilled(false)
    }

    if (password !== '') {
      setIsPasswordFilled(true)
    } else {
      setIsPasswordFilled(false)
    }
    if (isIdFilled && isPasswordFilled) {
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
          let decoded: any = jwt_decode(res.data.access_token)
          decoded = decoded.roles

          if (decoded.includes('ROLE_ADMIN')) {
            dispatch(isAdmin())
          }

          localStorage.setItem('user', JSON.stringify({
            'access_token': res.data.access_token,
            'studentId': res.data.studentId,
            'name': res.data.name,
            'email': res.data.username
          }))
          navigate('/')
        })
        .catch((err) => {
          setLogin(false)
        })
    }
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

export default connect()(Login)