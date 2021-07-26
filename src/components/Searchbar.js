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

//引入CSS
import '../styles/navnfooter.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//載入其他自用套件
import CartHover123 from './CartHover123'
//程式起始
const Searchbar = (props) => {
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
  // const { getSession } = props

  return (
    <>
      <Container className="search-bar" fluid>
        {/* 暫時移除sticky-top */}
        <Row className="search-area">
          <Col md={3}>
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

export default Searchbar
