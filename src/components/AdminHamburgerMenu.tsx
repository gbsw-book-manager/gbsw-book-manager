import React from "react"
import './HamburgerMenu.css'
import {AiOutlineHome} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {BsBook} from "react-icons/bs";
import {MdManageAccounts, MdWatchLater} from "react-icons/md";
import {FaClipboardList} from "react-icons/fa";

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
            <a href={'/book-management'}>
              <button className={'bottomBtn'}><BsBook className={'menu-icons'}/> 도서 관리</button>
            </a> <br/>
            <a href={'/student-management'}>
              <button className={'bottomBtn'}><MdManageAccounts className={'menu-icons'}/> 학생 관리</button>
            </a> <br/>
            <a href={'/overdue-list'}>
              <button className={'bottomBtn'}><MdWatchLater className={'menu-icons'}/> 연채자 목록</button>
            </a> <br/>
            <a href={'/register'}>
              <button className={'bottomBtn'}><FaClipboardList className={'menu-icons'}/> 희망도서 목록</button>
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