//搜尋框NAVBAR
// 基本元件
import React, { useState, useEffect, useRef } from 'react'
import {
  Navbar,
  Nav,
  Image,
  Container,
  Row,
  Col,
  Overlay,
  Tooltip,
} from 'react-bootstrap'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import moment from 'moment'
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
const SrNavBar = (props) => {
  //會員區
  //-登入狀態確認
  const { auth, setAuth } = props
  const [memberData, setMemberData] = useState(auth)
  //-大頭貼路徑
  const avatarPath = 'http://localhost:4000/img/'
  // 所有連結表可以在各自的link中修改
  const items = [
    { item: '找用品', link: '/product', icon: 'product' },
    { item: '找場地', link: '/place', icon: 'event' },
    { item: '找活動', link: '/event', icon: 'place' },
    { item: '找靈感', link: '/articles', icon: 'idea' },
  ]
  //時間校正用
  //讀取全站時間
  let StartDay = props.today
  let EndDay = props.nextday
  //設定使用state (時間&驗證輸入內容)
  const [navStartTime, setNavStartTime] = useState(props.startTime)
  const [navEndTime, setNavEndTime] = useState(props.endTime)
  const [show, setShow] = useState(false)
  const target = useRef(null)

  //日期判斷程式
  function resetEndTime() {
    if (!moment(navStartTime).isBefore(navEndTime)) {
      setNavEndTime(moment(navStartTime).add(1, 'days').format('YYYY-MM-DD'))
    }
  }
  //日期自動糾錯
  useEffect(() => {
    resetEndTime() //先做日期確認再設定父層
    props.setstart(navStartTime)
    props.setend(navEndTime)
  }, [navStartTime])

  useEffect(() => {
    if (!moment(EndDay).isBefore(navEndTime)) {
      setNavStartTime(StartDay)
      setNavEndTime(EndDay)
    } else {
      if (!moment(navStartTime).isBefore(navEndTime)) {
        setNavStartTime(
          moment(navEndTime).subtract(1, 'days').format('YYYY-MM-DD')
        )
      }
    }
    // resetStartTime()
    props.setstart(navStartTime)
    props.setend(navEndTime)
  }, [navEndTime])
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
      $('.search-bar').addClass('hide')
    } else {
      $('.nav-bg').removeClass('hide')
      $('.search-bar').removeClass('hide')
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
        <Navbar.Brand className="mx-auto order-0" as={Link} to="/">
          <img className="nav-logo" src={MainLogo} alt="" />
        </Navbar.Brand>
        {/* 購物車Button */}
        <Nav className="order-lg-3 order-0">
          <Nav.Link as={Link} to="/cart" className="nav-cart hovertest1">
            <Nav.Item className="nav-cart">
              {/*ZZ檔案差異點*/}
              <NavIcon className="cartico" item="cart" iconstyle="navcart" />
              {getSession?.length > 0 && (
                <div class="nav-counter nav-counter-blue">
                  {getSession.length}
                </div>
              )}
              <CartHover123 className="hovertest" getSession={getSession} />
            </Nav.Item>
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
                      {auth.nickname ? auth.nickname : auth.email}
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
                <Nav.Link as={Link} to={li.link} key={i} className="nav-item">
                  <NavIcon item={li.icon} iconstyle="nav" />
                  <span className="navon">{li.item}</span>
                </Nav.Link>
              )
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="search-bar sticky-top" fluid>
        <Row className="search-area">
          <Col md={3} mx-0 px-0>
            <div className="search-bar-title mx-0">
              <input
                id="keyword"
                className="input in-key"
                type="text"
                placeholder="天幕帳,夏天..."
                ref={target}
                value={props.searchKey}
                onChange={(e) => {
                  props.setSearchKey(e.target.value)
                }}
              />
            </div>
          </Col>
          <Col className="mx-0 px-1" md={2}>
            <Overlay target={target.current} show={show} placement="bottom">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  請輸入關鍵字
                </Tooltip>
              )}
            </Overlay>
            <input
              id="starttime"
              className="input in-time form-control"
              type="date"
              value={navStartTime}
              min={StartDay}
              placeholder=" "
              onChange={(event) => {
                setNavStartTime(event.target.value)
              }}
              // ref={props.timeRef}
            />
          </Col>
          <Col className="mx-0 px-1" md={2}>
            <input
              id="backtime"
              className="input in-time form-control"
              type="date"
              value={navEndTime}
              min={StartDay}
              placeholder=" "
              onChange={(event) => {
                setNavEndTime(event.target.value)
              }}
            />
          </Col>
          <Col md={1}>
            <Link to={`/search?keyword=${props.searchKey}`}>
              <button className="search-btn">立即搜尋</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SrNavBar
