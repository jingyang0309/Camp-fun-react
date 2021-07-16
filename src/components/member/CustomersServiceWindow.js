import React from 'react'

function CustomersServiceWindow(props) {
  const { auth, csSWindow, serCsSWindow } = props
  const avatarPath = 'http://localhost:4000/img/'
  return (
    <>
      <div className="mb-cs-window">
        <div className="mb-cs-title">
          <p className="text-center mt-3">
            在線客服-飛天豬排
          </p>
        </div>
        <div
          className="mb-cs-line"
          onClick={() => {
            serCsSWindow(!csSWindow)
          }}
        >
          <img
            src="http://localhost:4000/img/line.png"
            alt="line"
          ></img>
        </div>
        <div className="mb-cs-content">
          {/* 客服發送的訊息 */}
          <div className="mb-cs-cs">
            <div className="mb-cs-cs-avatar">
              <img
                src={avatarPath + 'flypig.png'}
                alt="cs-avatar"
              />
            </div>
            <div>
              <div className="mb-cs-cs-message">
                <p>
                  由於，你好因何而發生？盧梭說過一句著名的話，自然與美德，受到社會、財產的產物學問和藝術的侵害。希望大家能從這段話中有所收穫。動機，可以說是最單純的力量。你好，發生了會如何，不發生又會如何。我們可以很篤定的說
                </p>
              </div>
              <p className="mb-cs-cs-time">
                07/16 20:30:16
              </p>
            </div>
          </div>
          {/* 會員訊息 */}
          <div className="mb-cs-user">
            <div>
              <div className="mb-cs-user-message">
                <p>
                  由於，你好因何而發生？盧梭說過一句著名的話，自然與美德，受到社會、財產的產物學問和藝術的侵害。希望大家能從這段話中有所收穫。動機，可以說是最單純的力量。你好，發生了會如何，不發生又會如何。我們可以很篤定的說
                </p>
              </div>
              <p className="mb-cs-user-time">
                07/16 20:30:16
              </p>
            </div>
            <div className="mb-cs-user-avatar">
              <img
                src={avatarPath + auth.avatar}
                alt="cs-avatar"
              />
            </div>
          </div>
        </div>
        <div className="mb-cs-input-area d-flex">
          <input type="text" />
          <div className="mb-cs-input-arrow">
            <img
              src="http://localhost:4000/img/messageArrow.png"
              alt="messageArrow.png"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomersServiceWindow
