import React from "react"
import './SideBar.css'
import PagesLogo from "./PagesLogo"
import { AiOutlineHome } from 'react-icons/ai'
import { BsBook } from "react-icons/bs";
import { MdManageAccounts, MdWatchLater } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

const SideBar = () => {
  return (
    <div>
      <aside className="sidebar">
        <PagesLogo/>
        <div className='logoTitle' style={{ marginTop: '10px', color: '#fff', fontSize: '13px'}}>Gbsw Book Manager</div>
        <br/><br/>

        <nav className="menu">
          <a href="/" className="menu-item"> <AiOutlineHome className={'menu-icons'}/> <span>홈</span></a>
          <a href="/book-management" className="menu-item"><BsBook className={'menu-icons'}/> <span>도서 관리</span></a>
          <a href="/student-management" className="menu-item"><MdManageAccounts className={'menu-icons'}/> <span>학생 관리</span></a>
          <a href="/register" className="menu-item"><MdWatchLater className={'menu-icons'}/> <span>연채자 목록</span></a>
          <a href="/register" className="menu-item"><FaClipboardList className={'menu-icons'}/> <span>희망도서 목록</span></a>
          <a href="/mypage" className="menu-item"><CgProfile className={'menu-icons'}/> <span>마이페이지</span></a>
        </nav>
      </aside>
    </div>
  )
}

export default SideBar