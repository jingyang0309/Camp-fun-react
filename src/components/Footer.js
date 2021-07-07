import React from 'react'
import MainLogo from '../images/logo.svg' //logo檔案
import Follow from '../images/follow.png' //追蹤檔案
import Subscribe from '../images/subscribe.png' //訂閱檔案
import background from '../images/social-back.png' //full背景
import '../styles/navnfooter.css'
import NavIcon from './NavIcon.js'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

function footer(props) {
  let footer = ''
  switch (props.ver) {
    case 'full':
      footer = (
        <>
          <Container className="footer d-none d-lg-block" fluid>
            <Row className="justify-content-center mt-5">
              <Col xl={4} md={6} className="d-flex justify-content-center">
                <img className="foo-qu" src={Subscribe} alt="sub" />
              </Col>
              <Col xl={4} md={6} className="d-flex justify-content-center">
                <img className="foo-qu" src={Follow} alt="follow" />
              </Col>
            </Row>
            <Row className="foo-social justify-content-center">
              <Col xl={4} md={6} className="mt-5 d-flex flex-column">
                <Form className="mx-auto">
                  <Form.Row>
                    <Col xl={8} md={8}>
                      <Form.Control placeholder="請輸入您的email" />
                    </Col>
                    <Col xl={4} md={4}>
                      <Button variant="light">立即訂閱</Button>
                    </Col>
                  </Form.Row>
                </Form>
                <div className="foo-note mt-3 mx-auto">
                  <h6>熱門露營話題、超夯戶外情報、商品推薦及最新優惠</h6>
                </div>
              </Col>
              <Col xl={4} md={6} className="mt-5 d-flex flex-column">
                <div className="foo-social-icon d-flex justify-content-center">
                  <div>
                    <NavIcon item="youtube" iconstyle="social" />
                  </div>
                  <div>
                    <NavIcon item="fb" iconstyle="social" />
                  </div>
                  <div>
                    <NavIcon item="ig" iconstyle="social" />
                  </div>
                  <div>
                    <NavIcon item="twitter" iconstyle="social" />
                  </div>
                </div>

                <div className="foo-note mt-3 mx-auto">
                  <h6>快來社群與我們互動!</h6>
                </div>
              </Col>
            </Row>
            <Row
              className="foo-bottom"
              style={{ backgroundImage: `url(${background})` }}
            >
              <Col
                xl={8}
                className="foo-sitemap d-flex mt-5 mb-5 d-m-flex flex-sm-column flex-lg-row"
              >
                <Col>
                  <h5>找用品</h5>
                  <div className="d-lg-flex flex-lg-column d-none">
                    <span>熱門用品</span>
                    <span>分類搜尋</span>
                    <span>限時優惠</span>
                    <span>自訂組合</span>
                  </div>
                </Col>
                <Col>
                  <h5>找活動</h5>
                  <div className="d-lg-flex flex-lg-column d-none">
                    <span>熱門活動</span>
                    <span>依地區搜尋</span>
                    <span>依類型搜尋</span>
                  </div>
                </Col>
                <Col>
                  <h5>找靈感</h5>
                  <div className="d-lg-flex flex-lg-column d-none">
                    <span>情報誌</span>
                    <span>SparkLight</span>
                  </div>
                </Col>
                <Col>
                  <h5>找場地</h5>
                  <div className="d-lg-flex flex-lg-column d-none">
                    <span>熱門場地</span>
                    <span>依地區搜尋</span>
                    <span>依類型搜尋</span>
                  </div>
                </Col>
                <Col>
                  <h5>會員中心</h5>
                  <div className="d-lg-flex flex-lg-column d-none">
                    <span>資料編輯</span>
                    <span>訂單查詢/修改</span>
                    <span>會員等級</span>
                    <span>預約退回/延期</span>
                    <span>線上即時客服</span>
                  </div>
                </Col>
              </Col>
              <Col
                xl={4}
                className="mt-4 foo-note foo-cl d-flex flex-lg-column"
              >
                <img className="nav-logo" src={MainLogo} alt="" />
                <div className="d-flex flex-md-column mx-md-auto">
                  <span>電話：( 02 ) - 2123-5678 / 0800-123-678</span>
                  <span className="d-lg-none d-xl-block">
                    管理部地址：10622 台北市大安區和平東路二段106號
                  </span>
                  <span className="d-lg-none d-xl-block">
                    email：sv @ campfun.tw
                  </span>
                  <span className="d-lg-none d-xl-block">Line @ CampFuntw</span>

                  <span>隱私權政策　|　網站資料使用對策　|　購物須知</span>
                  <span>Camp Fun 台灣露肯 (c) 2021</span>
                </div>
              </Col>
            </Row>
          </Container>
          <Container
            className="foo-social foo-cl foo-sitemap d-md-block d-lg-none mt-5"
            fluid
          >
            <Row className="order-1 d-flex justify-content-center py-3">
              <span>隱私權政策　|　網站資料使用對策　|　購物須知</span>
            </Row>
            <Row className="order-0 d-flex justify-content-center">
              <img className="nav-logo" src={MainLogo} alt="" />
            </Row>
            <Row className="order-1 d-flex justify-content-center py-2 px-5">
              <span>
                Camp Fun (c) 2021 本網站內容、資訊皆為教育使用，非供任何商業
                使用，版權屬各公司所有
              </span>
            </Row>
          </Container>
        </>
      )
      break
    case 'min':
      footer = (
        <>
          <Container className="footer d-none d-lg-block mt-1" fluid>
            <Row className="foo-social d-flex justify-content-center align-items-center">
              <span className="mx-3 foo-note">
                隱私權政策　|　網站資料使用對策　|　購物須知
              </span>
              <img className="foo-logo mx-3" src={MainLogo} alt="" />
              <span className="mx-3 foo-note">
                Camp Fun (c) 2021 本網站內容、資訊皆為教育使用，非供任何商業
                使用，版權屬各公司所有
              </span>
            </Row>
          </Container>
          <Container
            className="foo-social foo-cl foo-sitemap d-md-block d-lg-none"
            fluid
          >
            <Row className="order-1 d-flex justify-content-center py-3 mt-1">
              <span>隱私權政策　|　網站資料使用對策　|　購物須知</span>
            </Row>
            <Row className="order-0 d-flex justify-content-center">
              <img className="nav-logo" src={MainLogo} alt="" />
            </Row>
            <Row className="order-1 d-flex justify-content-center py-2 px-5">
              <span>
                Camp Fun (c) 2021 本網站內容、資訊皆為教育使用，非供任何商業
                使用，版權屬各公司所有
              </span>
            </Row>
          </Container>
        </>
      )
      break
    default:
      footer = <h1>this is default(full)</h1>
  }
  return footer
}

export default footer
