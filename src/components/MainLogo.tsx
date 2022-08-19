import React from 'react'
import './MainLogo.scss'

const MainLogo = () => {
  return (
    <div>
      <div className="imgLoader"></div>

      <div className="logoContainer">

        <div className="book">
          <div className="pages">
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
            <div className="page"></div>
          </div>
          <div className="flips">
            <div className="flip flip1">
              <div className="flip flip2">
                <div className="flip flip3">
                  <div className="flip flip4">
                    <div className="flip flip5">
                      <div className="flip flip6">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLogo;