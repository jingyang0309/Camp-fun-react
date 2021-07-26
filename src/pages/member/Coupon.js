import React from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'

function Coupon(props) {
  return (
    <>
      <>
        <div className="d-flex mb-content mx-auto ">
          <MbAside />

          <div
            className="
        mb-right-content"
          >
            <h2>我的優惠卷</h2>
            <hr />
            <div className="mb-coupon-card">
              <div className="mb-coupon-pic">
                <img src="./../images/cp100.png" alt="優惠券"></img>
              </div>
              <div className="mb-coupon-tag">
                <div>新人好禮</div>
                <div>首次購物</div>
                <div>租借 </div>
                <div>活動</div>
              </div>
              <div>
                <h3>新人優惠</h3>
              </div>
              <div>
                <p>首次下訂單，折價100$，低消$500。</p>
              </div>
              <button
                onClick={() => {
                  props.history.push('/product')
                }}
              >
                立即購物
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default withRouter(Coupon)
