import React from "react";
import './SideBar.css'
import PagesLogo from "./PagesLogo";
import { AiOutlineHome } from 'react-icons/ai'
import { ImBooks } from 'react-icons/im'
import { IoReturnDownBack } from 'react-icons/io5'
import { GiNotebook } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'

const SideBar = () => {
  return (
    <div>
       <aside className="sidebar">
          <PagesLogo/>
          <div className='logoTitle' style={{ marginTop: '10px', color: '#fff', fontSize: '15px'}}>Gbsw Book Manager</div>
          <br/><br/>

          <nav className="menu">
            <a href="/" className="menu-item"> <AiOutlineHome className={'menu-icons'}/> <span>홈</span></a>
            <a href="/loan" className="menu-item"><ImBooks className={'menu-icons'}/> <span>도서 대출</span></a>
            <a href="/return" className="menu-item"><IoReturnDownBack className={'menu-icons'}/> <span>도서 반납</span></a>
            <a href="/register" className="menu-item"><GiNotebook className={'menu-icons'}/> <span>희망도서 신청</span></a>
            <a href="/mypage" className="menu-item"><CgProfile className={'menu-icons'}/> <span>마이페이지</span></a>
          </nav>
        </aside>
    </div>
  )
}

export default SideBar