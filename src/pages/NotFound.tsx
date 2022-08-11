import React from 'react';
import MainLogo from "../components/MainLogo";
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <div className={'notFound'}>
      <div style={{marginTop: '35vh'}}></div>
      <MainLogo/>
      <div className={'err'}>404 Error</div>
      <div className={'err2'}>Page not found, go to <a href={'/'}>home</a></div>
    </div>
  )
}

export default NotFound;