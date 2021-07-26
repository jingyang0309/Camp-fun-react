import React, { useState, useEffect } from 'react'
//load carousel &css
import { Carousel } from 'react-responsive-carousel'
import { withRouter, Link } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
//load some image
import secondsubtitle from '../images/sec2-subtitle.png'
import secondtitle from '../images/sec2-title.png'
import secondbutton from '../images/sec2-btnlink.png'
import thirdgoods from '../images/sec3-goods.png'
import thirdplace from '../images/sec3-event.png'
import thirdevents from '../images/sec3-places.png'
import thirdgoodlogo from '../images/sec3-goods-logo.svg'
import thirdplacelogo from '../images/sec3-places-logo.svg'
import thirdeventlogo from '../images/sec3-event-logo.svg'
import Sliderbox from '../components/Sliderbox.js'
//load Bootstrap
import { Container, Row, Col } from 'react-bootstrap'
import moment from 'moment'
import PlaceBox from '../components/PlaceBox'
function Index(props) {
  //設定預設日期
  let StartDay = props.today
  let EndDay = props.nextday
  const [startTime, setStartTime] = useState(props.startTime)
  const [endTime, setEndTime] = useState(props.endTime)
  // const [keyWord, setKeyword] = useState('')
  //日期判斷
  function resetEndTime() {
    if (!moment(startTime).isBefore(endTime)) {
      setEndTime(moment(startTime).add(1, 'days').format('YYYY-MM-DD'))
    }
  }
  //日期自動糾錯
  useEffect(() => {
    resetEndTime() //先做日期確認再設定父層
    props.setstart(startTime)
    props.setend(endTime)
  }, [startTime])

  useEffect(() => {
    if (!moment(EndDay).isBefore(endTime)) {
      setStartTime(StartDay)
      setEndTime(EndDay)
    } else {
      if (!moment(startTime).isBefore(endTime)) {
        setStartTime(moment(endTime).subtract(1, 'days').format('YYYY-MM-DD'))
      }
    }
    // resetStartTime()
    props.setstart(startTime)
    props.setend(endTime)
  }, [endTime])

  return (
    <>
      {/* TODO:導入React Datepicker */}
      <div className="in-carousel" autoPlay>
        <Carousel
          autoPlay
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          infiniteLoop={true}
          //   transitionTime="1000"
          stopOnHover={true}
          // dynamicHeight={true}
          interval="6000"
        >
          <div className="in-cimg">
            <img alt="" src="http://localhost:3000/images/index/01.jpg" />
          </div>
          <div className="in-cimg">
            <img alt="" src="http://localhost:3000/images/index/02.jpg" />
          </div>
          <div className="in-cimg">
            <img alt="" src="http://localhost:3000/images/index/03.jpg" />
          </div>
        </Carousel>
        <div className="in-middle pt-5">
          <p className="in.toptitle mx-auto px-3">
            體驗露營的樂趣
            <br />
            自由選擇，輕鬆出發
          </p>
          <div className="in-form">
            {/* datepicker */}
            <div className="in-search col-xl-5 col-lg-10 col-md-12 col-sm-12 mx-auto">
              <div className="in-datepicker d-flex flex-lg-row flex-column">
                <div className="in-startinput in-m6 col-lg-6 col-sm-12">
                  <div>
                    <label htmlFor="starttime" className="placeholder">
                      出發時間
                    </label>
                  </div>
                  <input
                    id="starttime"
                    className="input in-time form-control"
                    type="date"
                    value={startTime}
                    min={StartDay}
                    placeholder="2021-07-10"
                    onChange={(event) => {
                      setStartTime(event.target.value)
                    }}
                  />
                </div>
                <div className="in-endinput in-m6 col-lg-6 col-sm-12">
                  <div>
                    <label htmlFor="backtime" className="placeholder">
                      回程時間
                    </label>
                  </div>
                  <input
                    id="backtime"
                    className="input in-time form-control"
                    type="date"
                    value={endTime}
                    min={StartDay}
                    placeholder=" "
                    onChange={(event) => {
                      setEndTime(event.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="in-search col-12 mt-3">
                <div>
                  <label htmlFor="keyword" className="placeholder">
                    輸入您想找的
                  </label>
                </div>
                <input
                  id="keyword"
                  className="input in-key"
                  type="text"
                  placeholder="天幕帳,夏天..."
                  value={props.searchKey}
                  onChange={(e) => {
                    props.setSearchKey(e.target.value)
                  }}
                />
                <Link
                  to={`/search?keyword=${props.searchKey}`}
                  className="in-link-fix"
                >
                  <button className="in-actbtn mt-5">立即搜尋</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 2nd section */}
      <Container className="p-0 m-0 position-relative" fluid>
        <div className="in-discover">
          <div className="in-sec-top">
            <div className="in-sec-subtitle pt-5 ml-5 ">
              <img src={secondsubtitle} alt="編輯精選情報誌" />
            </div>
            <Row className="in-sec-contant ">
              <Col
                className="in-sec-title mx-auto d-flex justify-content-center mt-5 pl-5"
                sm={12}
                xs={12}
              >
                <img
                  className="pl-5"
                  src={secondtitle}
                  alt="和家人的周末約會"
                />
              </Col>
              <Col className="in-sec-text mt-5 d-flex flex-column align-items-center pl-5">
                <span className="col-xl-4 col-md-10">
                  島內出走正夯！週末想要遠離喧囂，享受家庭時光嗎？還是想試試躺在沙灘上望著滿天星空的野營呢？無論是何種型態的露營，親進大自然和享受朋友家人間的美好時刻，精選超強露營區行程。
                </span>
                <Link to="/articles/a/65">
                  <button className="in-actbtn mt-5">出發去!</button>
                </Link>
              </Col>
            </Row>
          </div>
          <Link to="/articles/a/57">
            <Col
              className="in-sec-botton pt-5 ml-5 position-absolute d-none d-lg-block"
              md={10}
            >
              <img src={secondbutton} alt="同場加映" />
            </Col>
          </Link>
        </div>
      </Container>
      {/* 3rd section */}
      <Container className="in-selected px-5" fluid>
        <Row className="pt-5">
          <Col md={1} className="d-none d-lg-block">
            <img src={thirdgoods} alt="thirdgoods" />
          </Col>
          <Col md={12} lg={11}>
            <div className="in-sec3-cardbox d-flex flex-column ">
              <div className="in-sec3-cardtitle d-inline-flex">
                <img src={thirdgoodlogo} alt="goodlogo" />
                <h3>熱門租借用品</h3>
              </div>
              <div className="in-sec3-card">
                <Sliderbox
                  source="http://localhost:4000/product/latest"
                  sessionServer={props.sessionServer}
                />
              </div>
            </div>
          </Col>
          {/* <Col lg={1} d-none className="d-none d-lg-block"></Col> */}
        </Row>
        {/* 場地 */}
        <Row className="pt-5 mt-5 mb-5">
          <Col md={1} className="d-none d-lg-block">
            <img src={thirdevents} alt="thirdplaces" />
          </Col>
          <Col md={12} lg={11}>
            <div className="in-sec3-cardbox d-flex flex-column ">
              <div className="in-sec3-cardtitle d-inline-flex">
                <img src={thirdplacelogo} alt="goodlogo" />
                <h3>熱門租借場地</h3>
              </div>
              <div className="in-sec3-card">
                <PlaceBox
                  source="http://localhost:4000/product/latest"
                  sessionServer={props.sessionServer}
                />
              </div>
            </div>
          </Col>
        </Row>
        {/* <Row className="pt-5 mt-5">
          <Col md={1} className="d-none d-xl-block">
            <img src={thirdplace} alt="thirdevents" />
          </Col>
          <Col md={10}>
            <div className="in-sec3-cardbox d-flex flex-column ">
              <div className="in-sec3-cardtitle d-inline-flex">
                <img src={thirdeventlogo} alt="goodlogo" />
                <h3>熱門活動</h3>
              </div>
              <div className="in-sec3-card">卡片區域</div>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row> */}
      </Container>
      <div className="in-selected"></div>
    </>
  )
}

export default withRouter(Index)
