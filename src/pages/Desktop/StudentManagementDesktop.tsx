import React from "react"
import AdminSideBar from "../../components/AdminSideBar";

const StudentManagementDesktop = () => {
  return (
    <div className={'adminpage'}>
      <div className={'app'}>
        <AdminSideBar/>
        <main className="content">
          <div className={'statusBar'}>
            <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
            <a href={'/book-management'} style={{color: '#000'}}> 학생 관리</a>
            <div className={'divider'}></div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentManagementDesktop