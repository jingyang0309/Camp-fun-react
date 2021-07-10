import React from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'

function Member(props) {
  return (
    <>
      <div className="mb-content mx-auto">
        {/* 之後補做 */}
        <p>麵包屑</p>

        {/* 側邊選單 */}
        <MbAside />

        <div className="mb-right-content mb-right-content-bcg">
          <div className="d-flex align-items-center mb-imformation-title">
            {/* 預設src */}
            <div className="mb-avatar-100 mx-5">
              <img src="./../images/avatar.png" alt="123" />
            </div>
            <h2>
              歡迎您，{}
              先生/小姐
            </h2>
          </div>
          <div className="d-flex mb-imformation-content align-items-center mb-5">
            <div className="mb-card">
              <img
                src="../image/Member-card.jpg"
                alt="123"
              />
            </div>
            <div className="Member-level-content">
              <p>您的會員卡等級: 銅牌</p>
              <p>會員卡有效期限: 終身永久</p>
              <p>累計消費金額: NT$ 0</p>
              <p>參加活動次數: 0 次</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="button">
              <img src="../image/button.png" alt="" />
            </div>
            <div className="button">
              <img src="../image/button2.png" alt="" />
            </div>
            <div className="button">
              <img src="../image/button3.png" alt="" />
            </div>
            <div className="button">
              <img src="../image/button4.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Member)
