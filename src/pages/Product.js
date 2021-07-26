import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import '../styles/product.css'
//跑馬燈套件
import Marquee from 'react-fast-marquee'
//icon
import ProIcon from '../components/ProIcon'
//someimage
import Sliderbox from '../components/Sliderbox.js'
// 分類ID
// A-帳篷/天幕
// B-桌椅/戶外家具
// C-寢具/睡袋
// D-火盆/炊具
// E-餐廚具
// F-燈具/飾品
// G-其他類
const Product = (props) => {
  return (
    <>
      {/* 產品首頁1塊狀連結 */}
      {/* 上方塊狀連結區開始 */}
      <Container className="pro-top" fluid>
        <Row className="pro-cat1">
          <Col className="pro-c1e pro-link mb-1" lg={3} xs={12}>
            <Link to="/search?ptagId=28">
              <div className="pro-linktouch"></div>
            </Link>
            .
          </Col>
          {/* <div className="d-none d-md-flex"> */}
          <Col
            className="pro-c1i1 pro-link mb-sm-1 d-none d-md-block"
            lg={2}
            xs={6}
          >
            <Link to="/product/cat/G">
              <div className="pro-linktouch">
                <div className="pro-linktext">工具</div>
              </div>
            </Link>
          </Col>
          <Col
            className="pro-c1i2 pro-link mb-sm-1 d-none d-md-block"
            lg={4}
            xs={6}
          >
            <Link to="/product/cat/B">
              <div className="pro-linktouch">
                <div className="pro-linktext">桌椅＆戶外家具</div>
              </div>
            </Link>
          </Col>
          <Col
            className="pro-c1i3 pro-link mb-sm-1 d-none d-md-block"
            lg={3}
            xs={12}
          >
            <Link to="/product/cat/F">
              <div className="pro-linktouch">
                <div className="pro-linktext">燈具＆飾品</div>
              </div>
            </Link>
          </Col>
          {/* </div> */}
        </Row>
        {/* //上半部跑馬 */}
        <Marquee>
          <Row className="pro-KV d-none d-md-block">
            <ProIcon item="tent" iconstyle="ico" />
            <ProIcon item="fire" iconstyle="ico" />
            <ProIcon item="light" iconstyle="ico" />
            <ProIcon item="food" iconstyle="ico" />
            <ProIcon item="tool" iconstyle="ico" />
            <ProIcon item="else" iconstyle="ico" />
            <ProIcon item="sleep" iconstyle="ico" />
            <ProIcon item="tent" iconstyle="ico" />
            <ProIcon item="fire" iconstyle="ico" />
            <ProIcon item="light" iconstyle="ico" />
            <ProIcon item="food" iconstyle="ico" />
            <ProIcon item="tool" iconstyle="ico" />
            <ProIcon item="else" iconstyle="ico" />
            <ProIcon item="sleep" iconstyle="ico" />
          </Row>
        </Marquee>

        <Row className="mx-auto d-none d-md-block my-xl-5 my-md-2 text-center">
          <h1>所有你需要的都在這裡！來看看我們的熱門租借用品。</h1>
        </Row>
        {/* //下半部跑馬 */}
        <Marquee direction="right">
          <Row className="pro-KV d-none d-md-block">
            <ProIcon item="tent" iconstyle="ico" />
            <ProIcon item="fire" iconstyle="ico" />
            <ProIcon item="light" iconstyle="ico" />
            <ProIcon item="food" iconstyle="ico" />
            <ProIcon item="tool" iconstyle="ico" />
            <ProIcon item="else" iconstyle="ico" />
            <ProIcon item="sleep" iconstyle="ico" />
            <ProIcon item="chair" iconstyle="ico" />
            <ProIcon item="tent" iconstyle="ico" />
            <ProIcon item="fire" iconstyle="ico" />
            <ProIcon item="light" iconstyle="ico" />
            <ProIcon item="food" iconstyle="ico" />
            <ProIcon item="tool" iconstyle="ico" />
            <ProIcon item="else" iconstyle="ico" />
            <ProIcon item="sleep" iconstyle="ico" />
            <ProIcon item="chair" iconstyle="ico" />
          </Row>
        </Marquee>
        {/* 下方塊狀連結區開始 */}
        <Row className="pro-cat2 d-none d-md-flex">
          <Col className="pro-c2i4 pro-link mb-xs-1" lg={2} xs={6}>
            <Link to="/product/cat/E">
              <div className="pro-linktouch">
                <div className="pro-linktext">餐廚具</div>
              </div>
            </Link>
          </Col>
          <Col className="pro-c2i5 pro-link mb-sm-1" lg={2} xs={6}>
            <Link to="/product/cat/G">
              <div className="pro-linktouch">
                <div className="pro-linktext">其他周邊</div>
              </div>
            </Link>
          </Col>
          <Col className="pro-c2i6 pro-link mb-sm-1" lg={4} xs={12}>
            <Link to="/product/cat/A">
              <div className="pro-linktouch">
                <div className="pro-linktext">天幕&帳篷</div>
              </div>
            </Link>
          </Col>
          <Col className="pro-c2i7 pro-link mb-sm-1" lg={2} xs={6}>
            <Link to="/product/cat/D">
              <div className="pro-linktouch">
                <div className="pro-linktext">火盆&炊具</div>
              </div>
            </Link>
          </Col>
          <Col className="pro-c2i8 pro-link mb-sm-1" lg={2} xs={6}>
            <Link to="/product/cat/C">
              <div className="pro-linktouch">
                <div className="pro-linktext">寢具＆睡袋</div>
              </div>
            </Link>
          </Col>
        </Row>
        {/* 產品首頁2卡片區 */}
        {/* 天幕主帳區 */}
        <Row className="pro-banner1 pro-banner mt-5">
          <Col className="pro-bannerbg px-0" md={4}>
            <Row className="pro-bannertext d-flex flex-column">
              <span className="pro-subtext p-0 m-0">Tents & Shelters set</span>
              <span className="pro-maintext p-0 m-0">主帳天幕系列</span>
            </Row>
          </Col>
          <Col className="pro-bannerimg px-0" md={8}>
            <img
              className="pro-bannerkv"
              src="http://localhost:3000/images/product/pro-banner01.png"
              alt="banner01"
            />
          </Col>
        </Row>
        <Row className="pro-card1 pro-cards py-4">
          <Col xl={1}></Col>
          <Col xl={10}>
            <Sliderbox
              source="http://localhost:4000/product/catone/A"
              sessionServer={props.sessionServer}
            />
          </Col>
          <Col xl={1}></Col>
        </Row>
        {/* 炊具餐具區 */}
        <Row className="pro-banner2 pro-banner">
          <Col className="pro-bannerbg px-0 order-1" md={4}>
            <Row className="pro-bannertext d-flex flex-column">
              <span className="pro-subtext p-0 m-0">
                Cookware & Dinning set
              </span>
              <span className="pro-maintext p-0 m-0 text-right">
                炊具＆餐具
              </span>
            </Row>
          </Col>
          <Col className="pro-bannerimg px-0 order-0" md={8}>
            <img
              className="pro-bannerkv"
              src="http://localhost:3000/images/product/pro-banner02.jpg"
              alt="banner02"
            />
          </Col>
        </Row>
        <Row className="pro-card2 pro-cards py-4">
          <Col xl={1}></Col>
          <Col xl={10}>
            <Sliderbox
              source="http://localhost:4000/product/catone/D/E"
              sessionServer={props.sessionServer}
            />
          </Col>
          <Col xl={1}></Col>
        </Row>
        <Row className="pro-banner3 pro-banner">
          <Col className="pro-bannerbg p-0" md={4}>
            <Row className="pro-bannertext d-flex flex-column">
              <span className="pro-subtext p-0 m-0">Outdoor furnitures</span>
              <span className="pro-maintext p-0 m-0">桌椅＆戶外家具</span>
            </Row>
          </Col>
          <Col className="pro-bannerimg p-0" md={8}>
            <img
              className="pro-bannerkv"
              src="http://localhost:3000/images/product/pro-banner03.jpg"
              alt="banner03"
            />
          </Col>
        </Row>
        <Row className="pro-card3 pro-cards py-4">
          <Col xl={1}></Col>
          <Col xl={10}>
            <Sliderbox
              source="http://localhost:4000/product/catone/B"
              sessionServer={props.sessionServer}
            />
          </Col>
          <Col xl={1}></Col>
        </Row>
        <Row className="pro-banner4 pro-banner">
          <Col className="pro-bannerbg px-0 order-1" md={4}>
            <Row className="pro-bannertext d-flex flex-column">
              <span className="pro-subtext p-0 m-0">Tools & Accessories</span>
              <span className="pro-maintext p-0 m-0">工具及周邊</span>
            </Row>
          </Col>
          <Col className="pro-bannerimg px-0 order-0" md={8}>
            <img
              className="pro-bannerkv"
              src="http://localhost:3000/images/product/pro-banner04.jpg"
              alt="banner04"
            />
          </Col>
        </Row>
        <Row className="pro-card4 pro-cards py-4">
          <Col xl={1}></Col>
          <Col xl={10}>
            <Sliderbox
              source="http://localhost:4000/product/catone/E"
              sessionServer={props.sessionServer}
            />
          </Col>
          <Col xl={1}></Col>
        </Row>
      </Container>
    </>
  )
}

export default withRouter(Product)
