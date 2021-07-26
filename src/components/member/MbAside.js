import React from 'react'
import { Link, withRouter } from 'react-router-dom'

// 會員中心側邊選單
function MbAside(props) {
  // 會員網址
  // let mbProfilePath = '/member/profile/'
  // mbProfilePath += sessionStorage.getItem('mId')

  return (
    <>
      <aside className="mb-aside-menu mb-list-no-style ">
        <li>會員中心</li>
        <li>個人訊息</li>
        <li className="ww">
          <Link
            to="/member/"
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
          >
            帳戶訊息
          </Link>
        </li>
        <li className="ww">
          {/* <Link to="{mbProfilePath ? mbProfilePath : '/'}" onClick={(e) => { e.preventDefault()
              props.history.push('/member/profile/' + sessionStorage.getItem('mId'))
            }}>
            會員基本資料
          </Link> */}
          <Link
            to="/member/profile"
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
          >
            會員基本資料
          </Link>
        </li>
        <li className="ww">
          <Link
            to="/member/addressbook"
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
          >
            我的收件地址
          </Link>
        </li>
        <li className="ww">
          <Link
            to="/member/editpassword"
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
          >
            修改登入密碼
          </Link>
        </li>
        <li>訂單中心</li>
        <li className="ww">
          <Link
            to="/cartorder"
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
          >
            訂單詳情
          </Link>
        </li>
        <li className="ww">
          <Link
            to="/cartorder"
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
          >
            租借詳情
          </Link>
        </li>
        <li>其他</li>
        <li className="ww">
          <Link
            to="/member/Coupon"
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
          >
            我的優惠卷
          </Link>
        </li>
      </aside>
    </>
  )
}

export default withRouter(MbAside)
