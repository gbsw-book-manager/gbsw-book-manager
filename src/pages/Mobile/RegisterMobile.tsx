import React, {ChangeEvent, useState} from 'react'
import '../../styles/Register.scss'
import HamburgerMenu from "../../components/HamburgerMenu";

const RegisterMobile = () => {
  const [isTitleFilled, setIsTitleFilled] = useState<boolean>(false)

  const checkLength = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      setIsTitleFilled(true)
    }
  }

  return (
    <div>
      <div className={'app'}>
        <HamburgerMenu/>
        <main className="content">
          <div className={'statusBar'}>
            <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
            <a href={'/register'} style={{color: '#000'}}> 희망도서 신청</a>
            <div className={'divider'}></div>
            <div className={'register-form-container'}>
              <div>신청자 : ooo</div>
              <div><input placeholder={'도서 제목'} onChange={checkLength}/><span className={isTitleFilled ? 'none' : 'required'}> &nbsp; required</span></div>
              <div></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default RegisterMobile