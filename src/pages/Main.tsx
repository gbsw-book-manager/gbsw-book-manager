import React from "react";
import "../App.css";
import loan from '../images/loan.png'
import returnImage from '../images/return.png'
import registerImage from '../images/register.png'
import profileImage from '../images/profile.png'
import MainLogo from "../components/MainLogo"
import Buttons from "../components/Buttons"
import {useSelector} from "react-redux";

const Main = () => {

  const value = useSelector(state => state)
  console.log(value)

  let user = JSON.parse(localStorage.getItem('user') || '{}')

  const logout = () => {
    let returnValue = window.confirm('정말로 로그아웃 하시겠습니까?')

    if(returnValue) {
      localStorage.removeItem('user')
      window.location.replace('/')
    }
  }




  return (
    <div>
      <MainLogo/>
      <div className='logoTitle'>Gbsw Book Manager</div>
      <br/>

      {
        user.access_token === undefined && (
          <Buttons/>
        )
      }

      {
        user.access_token != null && (
          <div>
            <div className={'welcomePhrase'}>{user.name}님, 반갑습니다 !</div>
            <button onClick={logout} className={'logoutBtn'}>Logout</button>
          </div>
        )
      }

      <div className="container">

        <div className="divSquare loanBox" onClick={() => window.location.href = '/loan'}>
          <img src={loan} alt={'loan'} className={'icons loanIcon'}/>
          <div className={'description'}>도서 대출</div>
        </div>

        <div className="divSquare returnBox" onClick={() => window.location.href = '/return'}>
          <img src={returnImage} alt={'return'} className={'icons returnIcon'}/>
          <div className={'description'}>도서 반납</div>
        </div>

        <div className="divSquare registerBox" onClick={() => window.location.href = '/register'}>
          <img src={registerImage} alt={'register'} className={'icons registerIcon'}/>
          <div className={'description'}>희망도서 신청</div>
        </div>

        <div className="divSquare mypageBox" onClick={() => window.location.href = '/mypage'}>
          <img src={profileImage} alt={'mypage'} className={'icons profileIcon'}/>
          <div className={'description'}>마이페이지</div>
        </div>

      </div>

    </div>
  );
}

export default Main;
