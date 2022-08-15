import React, {useState} from "react";
import './HamburgerMenu.css'
import {AiOutlineHome} from 'react-icons/ai'
import {ImBooks} from 'react-icons/im'
import {IoReturnDownBack} from 'react-icons/io5'
import {GiNotebook} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'

const HamburgerMenu = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const clickHandler = () => {
    setIsClicked(!isClicked)
  }

  console.log(isClicked)

  return (
    <div>
      <label>
        <input type="checkbox"/>
        <span id="menu" className={isClicked ? 'clicked' : 'notClicked'} onClick={clickHandler}> <span className="hamburger"></span> </span>
        <ul>
          <a href={'/'}>
            <button style={{marginTop: '-10vh'}}><AiOutlineHome className={'menu-icons'}/> 홈</button>
          </a> <br/>
          <a href={'/loan'}>
            <button className={'bottomBtn'}><ImBooks className={'menu-icons'}/> 도서 대출</button>
          </a> <br/>
          <a href={'/return'}>
            <button className={'bottomBtn'}><IoReturnDownBack className={'menu-icons'}/> 도서 반납</button>
          </a> <br/>
          <a href={'/register'}>
            <button className={'bottomBtn'}><GiNotebook className={'menu-icons'}/> 희망도서 신청</button>
          </a> <br/>
          <a href={'/mypage'}>
            <button className={'bottomBtn'}><CgProfile className={'menu-icons'}/> 마이페이지</button>
          </a>
        </ul>
      </label>
    </div>
  )
}

export default HamburgerMenu