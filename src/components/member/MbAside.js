import React from 'react'
import { Link, withRouter } from 'react-router-dom'

// 會員中心側邊選單
function MbAside(props) {
  // 會員網址
  // let mbProfilePath = '/member/profile/'
  // mbProfilePath += sessionStorage.getItem('mId')

  return (
    <>
      <aside className="mb-aside-menu list-no-style ">
        <li>Camp fun 會員中心</li>
        <li>個人訊息</li>
        <li>
          <Link to="/member/">帳戶訊息</Link>
        </li>
        <li>
          {/* <Link to="{mbProfilePath ? mbProfilePath : '/'}" onClick={(e) => { e.preventDefault()
              props.history.push('/member/profile/' + sessionStorage.getItem('mId'))
            }}>
            會員基本資料
          </Link> */}
          <Link to="/member/profile">會員基本資料</Link>
        </li>
        <li>
          <Link to="/member/addressbook">我的收件地址</Link>
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

export default withRouter(MbAside)
