import React, { useState } from "react";
import PagesLogo from "../components/PagesLogo";
import axios, { AxiosResponse } from "axios"
import Swal from "sweetalert2";

const SignUp = () => {
  const [isEmailOkay, setIsEmailOkay] = useState<any>(null)
  const email_format = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const [name, setName] = useState<string>('')
  const [studentId, setStudentId] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [clicked, setClicked] = useState<boolean>(false)
  const [passwordISOverFour, setPasswordIsOverFour] = useState<boolean>(true)

  const checkStudentId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    setStudentId(onlyNumber)
  }

  const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    if (email_format.test(value)) {
      setIsEmailOkay(true)
    } else {
      setIsEmailOkay(false)
    }
  }

  const isEmailFilled = () => {
    if (isEmailOkay) {
      setClicked(true)
      emailHandler()
    } else {
      setClicked(false)
    }
  }

  const handleOnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      emailHandler()
    }
  }

  const emailHandler = async () => {
    let url = `http://localhost:8080/api/certification-email?email=${email}&name=${name}`
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  const loginHandler = async () => {
    if (password.length < 3) {
      setPasswordIsOverFour(false)
    } else {
      let data = {
        "studentId": studentId,
        "name": name,
        "username": email,
        "password": password,
        "code": code
      }
      console.log(data)

      axios
        .post('http://localhost:8080/api/sign-up', JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res: AxiosResponse<any>) => {
          Swal.fire({
            title: '회원가입 완료',
            text: '회원가입이 완료되었습니다. 로그인 후 사용해 주세요!',
            icon: 'success',
            confirmButtonText: '확인'
          }).then(() => {
            window.location.replace('/')
          })
        })
        .catch(() => {
          Swal.fire({
            title: 'Error',
            text: '정보를 다시 확인해주세요.',
            icon: 'error',
            confirmButtonText: '확인'
          })
        })
    }
  }

  return (
    <div>
      <div style={{marginTop: '10%'}}></div>
      <PagesLogo/>
      <div className='logoTitle' style={{fontSize: '15px', marginTop: '4px'}}>Gbsw Book Manager</div>

      <div className={'signUpContainer'}>
        <input
          className="form username-form"
          placeholder="이름"
          type="text"
          name="studentname"
          required
          maxLength={4}
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          onKeyPress={handleOnKeyPress}
        />

        <input
          className="form user-student-id"
          placeholder="학번"
          name="student-id"
          required
          maxLength={4}
          value={studentId}
          onChange={checkStudentId}
          style={{marginTop: '20px'}}
          onKeyPress={handleOnKeyPress}
        />

        <div className={'emailForm'}>

          <div className={'emailInputTag'}>
            <input
              className="form signup-userid-form"
              placeholder="email"
              type="text"
              name="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                checkEmail(e)
                setEmail(e.target.value)
              }}
              onKeyPress={handleOnKeyPress}
            />
            <button className={'getCodeBtn'} onClick={isEmailFilled}>인증번호 받기</button>
          </div>

          {
            isEmailOkay === false && (
              <div style={{
                marginTop: '3px',
                marginLeft: '3px',
                color: '#e12a2a',
                fontSize: '9px'
              }}>이메일 형식이 올바르지 않습니다.</div>
            )
          }

        </div>


        {
          clicked === true && (
            <input
              className="form code-form"
              placeholder="인증번호 (3분내로 입력)"
              name="code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{marginTop: '2px', marginBottom: '20px'}}
            />
          )
        }

        <input
          className="form password-form"
          placeholder="password"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onKeyPress={handleOnKeyPress}
        />

        {
          passwordISOverFour === false && (
            <div style={{
              fontSize: '13px',
              marginLeft: '2px',
              marginTop: '3px',
              color: '#d72020'
            }}>비밀번호는 4자 이상이어야 합니다.</div>
          )
        }
        <button className="signupButton" onClick={loginHandler}>회원가입</button>
        <div style={{textAlign: 'center', marginTop: '20px', fontSize: '14px', marginBottom: '15vh'}}>아이디가 있으신가요? <a
          href={'/login'}>로그인</a>
        </div>

      </div>


    </div>
  )
}

export default SignUp