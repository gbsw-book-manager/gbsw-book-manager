import React from 'react'
import AdminSideBar from "../../components/AdminSideBar";

const AdminDesktop = () => {
  return (
    <div className={'adminpage'}>
      <div className={'app'}>
      {/*메뉴 - 도서 관리, 학생 관리, 연채자 목록, 희망도서 목록*/}
        <AdminSideBar/>
        <main className="content">
          <div className={'statusBar'}>
            <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
            <a href={'/book-management'} style={{color: '#000'}}> 도서 관리</a>
            <div className={'divider'}></div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDesktop