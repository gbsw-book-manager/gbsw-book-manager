import React from 'react';
import SideBar from "../../components/SideBar";
import '../../styles/MyPage.css'

const MyPageDesktop = () => {
  let user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div>
      <div className={'app'}>
        <SideBar/>
        <main className="content">
          <div className={'statusBar'}>
            <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
            <a href={'/mypage'} style={{color: '#000'}}> 마이페이지</a>
          </div>
          <div className={'divider'}></div>

          <div>
            <table className={'mypageTable'}>

              <tr>
                <td className={'tableKey'}>이름</td>
                <td className={'tableValue'}>{user.name}</td>
              </tr>

              <tr>
                <td className={'tableKey'}>학번</td>
                <td className={'tableValue'}>{user.studentId}</td>
              </tr>

              <tr>
                <td className={'tableKey'}>이메일</td>
                <td className={'tableValue'}>{user.email}</td>
              </tr>

              <tr>
                <td className={'tableKey'}>도서 정보</td>
                <td className={'tableValue'}>대출 도서 : 0권<br/>연채 도서: 0권</td>
              </tr>

              <tr>
                <td className={'tableKey'}>비밀번호 변경</td>
                <td className={'tableValue'}>
                  <div className={'passwordChangeContainer'}>
                    <div style={{marginTop: '20px'}}/>
                    <div> <span>현재 비밀번호 </span> <input style={{marginLeft: '35px'}}/> <br/></div>
                    <div style={{ marginTop: '9px' }}> <span>새 비밀번호 </span> <input style={{marginLeft: '48px'}}/> <br/></div>
                    <div style={{ marginTop: '9px' }}><span>비밀번호 다시 입력 </span> <input style={{marginLeft: '5px'}}/> <br/></div>
                    <button className={'confirmBtn'}>비밀번호 변경</button>
                    <div style={{marginBottom: '20px'}}/>
                  </div>
                </td>
              </tr>
            </table>

          </div>
        </main>
      </div>
    </div>
  )
}

export default MyPageDesktop;