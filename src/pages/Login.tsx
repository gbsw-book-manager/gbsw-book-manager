import React, {ChangeEvent, useState} from "react";
import PagesLogo from "../components/PagesLogo";
import './Login.css'

const Login = () => {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const loginHandler = () => {
    if (id === '') {
      alert('아이디를 입력하세요.')
    }
    else if (password === '') {
      alert('비밀번호를 입력하세요.')
    }
    else {
      alert('로그인 완료')
      window.location.replace('/')
    }
  }

  const handleOnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      loginHandler();
    }
  };

  return (
    <div>
      <div style={{marginTop: '16%'}}></div>
      <PagesLogo/>
      <div className='logoTitle' style={{fontSize: '15px', marginTop: '4px'}}>Gbsw Book Manager</div>

      <input
          className="form userid-form"
          placeholder="아이디"
          type="text"
          name="userid"
          required
          style={{marginTop: '40px'}}
          value={id}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
          onKeyPress={handleOnKeyPress}
        />

        <br/>

        <input
          className="form password-form"
          placeholder="비밀번호"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onKeyPress={handleOnKeyPress}
        />

        <button className="form-button" onClick={loginHandler}>로그인</button>
    </div>
  )
}

export default Login