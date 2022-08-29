import React, { useEffect, useState } from "react";
import "../App.css";
import loan from '../images/loan.png'
import returnImage from '../images/return.png'
import registerImage from '../images/register.png'
import profileImage from '../images/profile.png'
import MainLogo from "../components/MainLogo"
import Buttons from "../components/Buttons"
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { getCookie, removeCookie } from "../utils/cookies";

const Main = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    if (getCookie('access_token') !== undefined) {
      let decoded: any = jwt_decode(getCookie('access_token'))
      decoded = decoded.roles
      if (decoded.includes('ROLE_ADMIN')) {
        setIsAdmin(true)
        window.location.replace('/book-add')
      }
    }
  }, [])

  const logout = () => {
    Swal.fire({
      title: '정말로 로그아웃 하시겠습니까?',
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie('access_token')
        removeCookie('name')
        removeCookie('id')
        removeCookie('email')
        removeCookie('studentId')
        window.location.replace('/')
      }
    })
  }

  const changePage = (params: string) => {
    if (getCookie('access_token') === undefined) {
      Swal.fire( {
        title: '로그인 후 이용해 주세요.' ,
        confirmButtonText: '확인',
      })
    } else {
      window.location.href = `/${params}`
    }
  }

  return (
    <div>
      <MainLogo/>
      <div className='logoTitle'>Gbsw Book Manager</div>
      <br/>

      {
        getCookie('access_token') === undefined && (
          <Buttons/>
        )
      }

      {
        getCookie('access_token') != null && (
          <div className={'stateBtnContainer'}>
            <div className={'welcomePhrase'}>{getCookie('name')}님, 반갑습니다 !</div>
            <button onClick={logout} className={'logoutBtn'}>Logout</button>
          </div>
        )
      }
      {
        isAdmin === false && (
          <div className="container">

            <div className="divSquare loanBox" onClick={() => changePage('loan')}>
              <img src={loan} alt={'loan'} className={'icons loanIcon'}/>
              <div className={'description'}>도서 대출</div>
            </div>

            <div className="divSquare returnBox" onClick={() => changePage('return')}>
              <img src={returnImage} alt={'return'} className={'icons returnIcon'}/>
              <div className={'description'}>도서 반납</div>
            </div>

            <div className="divSquare registerBox" onClick={() => changePage('register')}>
              <img src={registerImage} alt={'register'} className={'icons registerIcon'}/>
              <div className={'description'}>희망도서 신청</div>
            </div>

            <div className="divSquare mypageBox" onClick={() => changePage('mypage')}>
              <img src={profileImage} alt={'mypage'} className={'icons profileIcon'}/>
              <div className={'description'}>마이페이지</div>
            </div>

          </div>
        )
      }
    </div>
  );
}

export default Main;
