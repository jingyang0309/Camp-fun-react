//無搜尋框基本NAVBAR
//基本元件
import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Image } from 'react-bootstrap'
import $ from 'jquery'
import { Link } from 'react-router-dom'

//引入必要圖片及SVG
import MainLogo from '../images/logo.svg' //logo檔案
import Profile from '../images/profile.png' //profile檔案
import NavIcon from './NavIcon.js' //icon SVG路徑檔案

//引入CSS
import '../styles/navnfooter.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//載入其他自用套件
import CartHover123 from './CartHover123'
//程式起始
const NavBar = (props) => {
  //會員區
  //-登入狀態確認
  const { auth, setAuth } = props
  const [memberData, setMemberData] = useState(auth)
  //-大頭貼路徑
  const avatarPath = 'http://localhost:4000/img/'
  // 所有連結表可以在各自的link中修改
  const items = [
    { item: '找用品', link: '/product', icon: 'product' },
    { item: '找場地', link: '/pickplace', icon: 'place' },
    { item: '找靈感', link: '/articles', icon: 'idea' },
  ]
  //讀取購物車session
  const { getSession } = props

  //會員狀態主要機制
  //判斷登入
  useEffect(() => {
    if (!!localStorage.getItem('token') && !auth.auth) {
      verifyMemberData()
      // setAuth(data)
    } else {
      setAuth(false)
    }
  }, [])
  //會員後端認證
  async function verifyMemberData() {
    const token = localStorage.getItem('token')

    fetch('http://localhost:4000/member/userdata/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data.bearer)
        console.log(data)
        setMemberData({
          login: true,
          email: data.email,
          nickname: data.nickname,
          avatar: data.avatar,
          from: 'navbar',
        })
        console.log(memberData)
      })
  }

  useEffect(() => {
    setAuth(memberData)
  }, [memberData])
  //設定NAV隱藏機制
  let lastScroll = 0

  $(window).scroll(function () {
    const scrollNow = $(this).scrollTop()

    if (lastScroll < scrollNow) {
      $('.nav-bg').addClass('hide')
    } else {
      $('.nav-bg').removeClass('hide')
    }
    lastScroll = scrollNow
  })

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        fluid="true"
        className="nav-bg"
        variant="dark"
        sticky="top"
      >
        {/* 漢堡 */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="order-0"
        />
        {/* Logo */}
        <Navbar.Brand
          className="mx-auto order-0"
          as={Link}
          to="/"
        >
          <img className="nav-logo" src={MainLogo} alt="" />
        </Navbar.Brand>
        {/* 購物車Button (包含購物車元件)*/}
        <Nav className="order-lg-3 order-0">
          <Nav.Link
            as={Link}
            to="/cart"
            className="nav-cart hovertest1"
          >
            <Nav.Item>
              {/*ZZ檔案差異點*/}
              <NavIcon
                className="cartico"
                item="cart"
                iconstyle="navcart"
              />
              {getSession?.length > 0 && (
                <div className="nav-counter nav-counter-blue">
                  {getSession.length}
                </div>
              )}
            </Nav.Item>
            <CartHover123
              className="hovertest"
              getSession={getSession}
            />
          </Nav.Link>
        </Nav>
        {/* 開合選單 */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* 會員區域 */}
          <Nav className="ml-auto order-lg-2">
            <div className="member">
              <Image
                className="nav-profile-default"
                style={{ width: '50px' }}
                src={
                  auth.login
                    ? auth.avatar
                      ? avatarPath + auth.avatar
                      : Profile
                    : Profile
                }
                alt=""
                roundedCircle
              />
              <div className="d-flex flex-sm-row flex-lg-column">
                {!auth.login ? (
                  <>
                    <div>
                      <Link to="/login">
                        <span>登入 / 註冊</span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/member">
                      您好，
                      {auth.nickname
                        ? auth.nickname
                        : auth.email}
                    </Link>
                    <Link to="/logout">登出</Link>
                  </>
                )}
              </div>
            </div>
          </Nav>
          {/* 主要選單 */}
          <Nav className="">
            {items.map((li, i) => {
              return (
                <Nav.Link
                  as={Link}
                  to={li.link}
                  key={i}
                  className="nav-item nav-main-btn"
                >
                  <NavIcon item={li.icon} iconstyle="nav" />
                  <span className="navon">{li.item}</span>
                </Nav.Link>
              )
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
