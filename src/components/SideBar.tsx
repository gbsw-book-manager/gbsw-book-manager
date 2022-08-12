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
    <div className={'pagesBackground'}>
      <nav className="sidebar">
        <header>
          <div className="image-text">
          <span className="image">
            <PagesLogo/>
            <div className='logoTitle' style={{ marginTop: '1px', fontSize: '15px' }}>Gbsw Book Manager</div>
          </span>
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <a href="/">
                  <AiOutlineHome className={'sidebar-icons'}/>
                  <span className="text nav-text">홈</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="/loan">
                  <ImBooks className={'sidebar-icons'}/>
                  <span className="text nav-text">도서 대출</span>
                </a>
              </li>

                <li className="nav-link">
                <a href="/return">
                  <IoReturnDownBack className={'sidebar-icons'}/>
                  <span className="text nav-text">도서 반납</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="/register">
                  <GiNotebook className={'sidebar-icons'}/>
                  <span className="text nav-text">희망도서 신청</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="/mypage">
                  <CgProfile className={'sidebar-icons'}/>
                  <span className="text nav-text">마이페이지</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default SideBar