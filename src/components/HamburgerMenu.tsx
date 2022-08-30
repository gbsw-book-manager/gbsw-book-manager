import React, { useState } from "react"
import './HamburgerMenu.css'
import {AiOutlineHome} from 'react-icons/ai'
import {ImBooks} from 'react-icons/im'
import {IoReturnDownBack} from 'react-icons/io5'
import {GiNotebook} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'

const HamburgerMenu = () => {
  return (
    <div>
      <input type="checkbox" id="active" className={'hamburger-check'}/>
      <label htmlFor="active" className="menu-btn"><span/></label>
      <label htmlFor="active" className="close"></label>
      <div className="hamburger-wrapper">
        <ul>
          <div className={'hrefContainer'}>
            <a href={'/'}>
              <button style={{marginTop: '15vh'}}><AiOutlineHome className={'menu-icons'}/> 홈</button>
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
          </div>
        </ul>
      </div>
    </div>
  )
}

export default HamburgerMenu