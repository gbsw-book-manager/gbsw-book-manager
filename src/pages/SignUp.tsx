import React, {useState} from "react";
import PagesLogo from "../components/PagesLogo";

const SignUp = () => {
  const [studentId, setStudentId] = useState<string>('')

  const checkStudentId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    setStudentId(onlyNumber)
  }

  return (
    <div>
      <div style={{marginTop: '10%'}}></div>
      <PagesLogo/>
      <div className='logoTitle' style={{fontSize: '15px', marginTop: '4px'}}>Gbsw Book Manager</div>

      <input
        className="form username-form"
        placeholder="이름"
        type="text"
        name="studentname"
        required
        style={{marginTop: '40px'}}
        // value={id}
        // onChange={(e:ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
        // onKeyPress={handleOnKeyPress}
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
        // onChange={(e:ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
        // onKeyPress={handleOnKeyPress}
      />

      <input
        className="form userid-form"
        placeholder="email"
        type="text"
        name="email"
        required
        style={{marginTop: '20px'}}
        // value={id}
        // onChange={(e:ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
        // onKeyPress={handleOnKeyPress}
      />

      <br/>

      <input
        className="form password-form"
        placeholder="password"
        type="password"
        name="password"
        required
        // value={password}
        // onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        // onKeyPress={handleOnKeyPress}
      />

      <button className="signupButton">회원가입</button>
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>아이디가 있으신가요? <a href={'/login'}>로그인</a></div>
    </div>
  )
}

export default SignUp