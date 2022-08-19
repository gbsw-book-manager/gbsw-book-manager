import React from 'react'
import './PagesLogo.scss'

const PagesLogo = () => {
  return (
    <div>
      <div className="imgLoader"></div>

      <div className="pagesLogoContainer">

        <div className="book">
          <div className="pages">
            <div className="page2"></div>
            <div className="page2"></div>
            <div className="page2"></div>
            <div className="page2"></div>
            <div className="page2"></div>
            <div className="page2"></div>
          </div>
          <div className="flips">
            <div className="flipv2 flip1">
              <div className="flipv2 flip2">
                <div className="flipv2 flip3">
                  <div className="flipv2 flip4">
                    <div className="flipv2 flip5">
                      <div className="flipv2 flip6">
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

export default PagesLogo;