import React from 'react'
import MainLogo from '../images/logo.svg' //logo檔案
import Profile from '../images/profile.png' //profile檔案
import { Navbar, Nav, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navnfooter.css'
import NavIcon from './NavIcon.jsx' //icon SVG路徑檔案
import { Link } from 'react-router-dom'

//
const NavBar = (props) => {
  // 上層傳來的登入狀況
  const { auth, setAuth } = props
  //設定Navbar-icon
  // 可以在各自的link中修改
  const items = [
    { item: '找用品', link: '/product', icon: 'product' },
    { item: '找場地', link: '/place', icon: 'event' },
    { item: '找活動', link: '/event', icon: 'place' },
    { item: '找靈感', link: '/discover', icon: 'idea' },
  ]
  //  TODO:
  //  1.各自連結跳頁方法(目前是href)
  //  2.在各頁面時NAV變化
  //  3.JQ 設定NAV效果
  // 4.購物車?
  // href="javascript:void(0)"
  // eventKey={li.link}

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        fluid
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
        <Navbar.Brand className="mx-auto order-0" href="/">
          <img className="nav-logo" src={MainLogo} alt="" />
        </Navbar.Brand>
        {/* 購物車Button */}
        <Nav className="order-lg-3 order-0">
          <Nav.Item className="nav-cart">
            <NavIcon
              className="cartico"
              item="cart"
              style="navcart"
            />
          </Nav.Item>
        </Nav>
        {/* 開合選單 */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* 會員區域 */}
          <Nav className="ml-auto order-lg-2">
            <div className="member">
              <Image
                className="nav-profile-default"
                src={Profile}
                alt=""
                roundedCircle
              />
              <div className="d-flex flex-sm-row flex-lg-column">
                {auth ? (
                  <>
                    <Link to="/member">
                      您好，
                      {sessionStorage.getItem('email')}
                    </Link>
                    <Link to="/logout">登出</Link>
                  </>
                ) : (
                  <div>
                    <span>
                      <Link to="/login">登入/註冊</Link>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Nav>
          {/* 主要選單 */}
          <Nav className="">
            {items.map((li, i) => {
              return (
                <Nav.Link
                  href={li.link}
                  key={li.id}
                  className="nav-item"
                >
                  <NavIcon item={li.icon} style="nav" />
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
