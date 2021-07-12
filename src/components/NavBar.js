import React, { useEffect, useState } from 'react'
import MainLogo from '../images/logo.svg' //logo檔案
import Profile from '../images/profile.png' //profile檔案
import { Navbar, Nav, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navnfooter.css'
import NavIcon from './NavIcon.js' //icon SVG路徑檔案
import { Link } from 'react-router-dom'

//
const NavBar = (props) => {
  // 上層傳來的登入狀況
  const { auth, setAuth } = props
  const [memberData, setMemberData] = useState(auth)

  // 大頭貼預設路徑
  const avatarPath = 'http://localhost:4000/img/'

  useEffect(() => {
    if (!!localStorage.getItem('token') && !auth.auth) {
      verifyMemberData()
      // setAuth(data)
    } else {
      setAuth(false)
    }
  }, [])

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
          login:true,
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

  useEffect(() => {}, [])
  //設定Navbar-icon
  // 可以在各自的link中修改
  const items = [
    { item: '找用品', link: '/product', icon: 'product' },
    { item: '找場地', link: '/place', icon: 'event' },
    { item: '找活動', link: '/event', icon: 'place' },
    {
      item: '找靈感',
      link: '/member/session',
      icon: 'idea',
    },
  ]
  //  TODO:
  //  1.JQ 設定NAV效果
  //  2.購物車?
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
        <Navbar.Brand
          className="mx-auto order-0"
          as={Link}
          to="/"
        >
          <img className="nav-logo" src={MainLogo} alt="" />
        </Navbar.Brand>
        <button
          onClick={() => {
            console.log(auth)
          }}
        >
          console.log(auth)
        </button>
        {/* {auth.avatar} */}
        {/* {auth.avatar} */}
        {/* <button
          onClick={() => {
            verifyMemberData()
          }}
        >
          verifyMemberData
        </button> */}
        {/* 購物車Button */}
        <Nav className="order-lg-3 order-0">
          <Nav.Item className="nav-cart">
            <NavIcon
              className="cartico"
              item="cart"
              iconstyle="navcart"
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
                style={{width:"50px"}}
                src={
                  auth
                    ? auth.avatar
                      ? avatarPath + auth.avatar
                      : Profile
                    : Profile
                }
                alt=""
                roundedCircle
              />
              <div className="d-flex flex-sm-row flex-lg-column">
                { !auth.login ? (
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
                  key={li.id}
                  className="nav-item"
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
