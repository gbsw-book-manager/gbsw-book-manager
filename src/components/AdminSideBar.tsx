import React from "react"
import './SideBar.css'
import PagesLogo from "./PagesLogo"
import { BsBook, BsJournalPlus } from "react-icons/bs";
import { MdManageAccounts, MdWatchLater } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { GiBookshelf } from 'react-icons/gi'

const SideBar = () => {
  const logoutHandler = () => {
    let returnValue = window.confirm('정말로 로그아웃 하시겠습니까?')

    if(returnValue) {
      localStorage.removeItem('user')
      window.location.replace('/')
    }
  }

  return (
    <div>
      <aside className="sidebar">
        <PagesLogo/>
        <div className='logoTitle' style={{ marginTop: '10px', color: '#fff', fontSize: '13px'}}>Gbsw Book Manager</div>
        <div style={{ textAlign: 'center', fontSize: '11px', marginTop: '3px', color: '#24d453', fontFamily: 'Y_Spotlight'}}>Admin</div>
        <br/><br/>

        <nav className="menu">
          <a href="/book-add" className='menu-item'> <BsJournalPlus className={'menu-icons'}/> <span>도서 추가</span> </a>
          <a href="/book-management" className="menu-item"><BsBook className={'menu-icons'}/> <span>도서 관리</span></a>
          <a href="/loan-request" className="menu-item"><GiBookshelf className={'menu-icons'}/> <span>대출 신청 목록</span></a>
          <a href="/student-management" className="menu-item"><MdManageAccounts className={'menu-icons'}/> <span>학생 관리</span></a>
          <a href="/overdue-list" className="menu-item"><MdWatchLater className={'menu-icons'}/> <span>연채자 목록</span></a>
          <a href="/register" className="menu-item"><FaClipboardList className={'menu-icons'}/> <span>희망도서 목록</span></a>
          <a href="/mypage" className="menu-item"><CgProfile className={'menu-icons'}/> <span>마이페이지</span></a>
          <br/>
          <div className="menu-item adminLogout" onClick={logoutHandler}> <FiLogOut className={'menu-icons'}/> <span>로그아웃</span></div>
        </nav>
      </aside>
    </div>
  )
}

export default SideBar