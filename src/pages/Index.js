import React from 'react'
//load carousel &css
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
//load some image
import secondsubtitle from '../images/2nd.png'
import secondtitle from '../images/sec2.png'
import { Container, Row, Col } from 'react-bootstrap'

const index = () => {
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
        <div className="in-middle">
          <p className="in.toptitle">
            體驗露營的樂趣
            <br />
            自由選擇，輕鬆出發
          </p>
          <div className="in-form">
            {/* datepicker */}
            <div className="in-search">
              <div class="in-datepicker">
                <div className="in-startinput in-m6" xl={6}>
                  <div>
                    <label for="starttime" class="placeholder">
                      出發時間
                    </label>
                  </div>
                  <input
                    id="starttime"
                    class="input in-time"
                    type="text"
                    placeholder=" "
                  />
                </div>
                <div class="in-endinput in-m6" xl={6}>
                  <div>
                    <label for="backtime" class="placeholder">
                      回程時間
                    </label>
                  </div>
                  <input
                    id="backtime"
                    class="input in-time"
                    type="text"
                    placeholder=" "
                  />
                </div>
              </div>
              <div class="in-search">
                <div>
                  <label for="keyword" class="placeholder">
                    輸入您想找的
                  </label>
                </div>
                <input
                  id="keyword"
                  class="input in-key"
                  type="text"
                  placeholder="天幕帳,夏天..."
                />
                <button className="in-actbtn">立即出發</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 2nd section */}
      <Container className="p-0 m-0" fluid>
        <div className="in-discover">
          <div className="in-sec-top">
            <div className="in-sec-subtitle pt-5 ml-5 ">
              <img src={secondsubtitle} alt="編輯精選情報誌" />
            </div>
            <Row className="in-sec-contant ">
              <Col
                className="in-sec-title mx-auto d-flex justify-content-center mt-5"
                sm={12}
                xs={12}
              >
                <img src={secondtitle} alt="" />
              </Col>
              <Col className="in-sec-text mt-5 d-flex flex-column align-items-center">
                <span className="col-4">
                  島內出走正夯！週末想要遠離喧囂，享受家庭時光嗎？還是想試試躺在沙灘上望著滿天星空的野營呢？無論是何種型態的露營，親進大自然和享受朋友家人間的美好時刻，精選超強露營區行程。
                </span>
                <button className="in-actbtn mt-5">出發去!</button>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
      {/* 3rd section */}
      <div className="in-selected"></div>
    </>
  )
}

export default index
