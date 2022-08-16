import React, {ChangeEvent, useState} from "react";
import PagesLogo from "../components/PagesLogo";
import '../styles/Login.css'

const Login = () => {
  const [isIdFilled, setIsIdFilled] = useState<boolean>()
  const [isPasswordFilled, setIsPasswordFilled] = useState<boolean>()
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
          placeholder="email"
          type="text"
          name="userid"
          required
          value={id}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
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
          onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onKeyPress={handleOnKeyPress}
        />

        <button className="form-button" onClick={loginHandler}>로그인</button>

      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>아이디가 없으신가요? <a href={'/signup'}>회원가입</a></div>
    </div>
  )
}

export default Login