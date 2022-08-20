import React from 'react';
import SideBar from "../../components/SideBar";

const MyPageDesktop = () => {
  return (
    <div>
      <div className={'app'}>
        <SideBar/>
        <main className="content">
          <div>마이페이지</div>
        </main>
      </div>
    </div>
  )
}

export default MyPageDesktop;