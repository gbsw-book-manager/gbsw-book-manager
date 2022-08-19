import React from 'react'
import AdminSideBar from "../../components/AdminSideBar";

const OverdueListDesktop = () => {
  return (
    <div className={'adminpage'}>
      <div className={'app'}>
        <AdminSideBar/>
        <main className="content">
          <div className={'statusBar'}>
            <a href={'/'} style={{color: '#999'}}>홈</a> {'>'}
            <a href={'/overdue-list'} style={{color: '#000'}}> 연채자 목록</a>
            <div className={'divider'}></div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default OverdueListDesktop