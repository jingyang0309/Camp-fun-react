import React from 'react'
import { Link } from 'react-router-dom'

// 會員中心側邊選單
function MbAside(props) {
  return (
    <>
      <aside className="mb-aside-menu list-no-style ">
        <li>Camp fun 會員中心</li>
        <li>個人訊息</li>
        <li>
          <Link to="/member">帳戶訊息</Link>
        </li>
        <li>
          <Link to="/member/profile">會員基本資料</Link>
        </li>
        <li>
          <Link to="/member/adressbook">我的收件地址</Link>
        </li>
        <li>訂單中心</li>
        <li>
          <Link to="">訂單詳情</Link>
        </li>
        <li>
          <Link to="">租借詳情</Link>
        </li>
        <li>
          <Link to="">活動查詢</Link>
        </li>
        <li>其他</li>
        <li>
          <Link to="/member/Coupon">我的優惠卷</Link>
        </li>
      </aside>
    </>
  )
}

export default MbAside
