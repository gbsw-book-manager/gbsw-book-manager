import React from "react"
import './HamburgerMenu.css'
import { BsBook, BsJournalPlus } from "react-icons/bs";
import { MdManageAccounts, MdWatchLater } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { GiBookshelf } from 'react-icons/gi'
import { BsArrowReturnLeft } from 'react-icons/bs'

const HamburgerMenu = () => {
  return (
    <div>
      <input type="checkbox" id="active" className={'hamburger-check'}/>
      <label htmlFor="active" className="menu-btn"><span/></label>
      <label htmlFor="active" className="close"></label>
      <div className="hamburger-wrapper">
        <ul>
          <div className={'hrefContainer'}>

            <a href={'/book-add'}>
              <button><BsJournalPlus className={'menu-icons'}/> 도서 추가</button>
            </a> <br/>
            <a href={'/book-management'}>
              <button className={'bottomBtn'}><BsBook className={'menu-icons'}/> 도서 관리</button>
            </a> <br/>
            <a href={'/loan-request'}>
              <button className={'bottomBtn'}><GiBookshelf className={'menu-icons'}/> 대출 신청 목록</button>
            </a> <br/>
            <a href={'/return-request'}>
              <button className={'bottomBtn'}><BsArrowReturnLeft className={'menu-icons'}/> 반납 신청 목록</button>
            </a> <br/>
            <a href={'/student-management'}>
              <button className={'bottomBtn'}><MdManageAccounts className={'menu-icons'}/> 학생 관리</button>
            </a> <br/>
            <a href={'/overdue-list'}>
              <button className={'bottomBtn'}><MdWatchLater className={'menu-icons'}/> 연채자 목록</button>
            </a> <br/>
            <a href={'/applicant-list'}>
              <button className={'bottomBtn'}><FaClipboardList className={'menu-icons'}/> 희망도서 목록</button>
            </a> <br/>
            <a href={'/mypage'}>
              <button className={'bottomBtn'}><CgProfile className={'menu-icons'}/> 마이페이지</button>
            </a>
            <br/><br/>
            <a href={'/book-management'}>
              <button className={'bottomBtn'}><FiLogOut className={'menu-icons'}/> 로그아웃</button>
            </a>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default HamburgerMenu