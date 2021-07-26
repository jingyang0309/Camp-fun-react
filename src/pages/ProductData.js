import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import '../styles/productdata.css'
// import ticon
import { BsMoon } from 'react-icons/bs'
import { useHistory } from 'react-router-dom'
import {
  FaPlus,
  FaMinus,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
  FaArrowRight,
} from 'react-icons/fa'
// import rate
import ReactStars from 'react-rating-stars-component'
import moment from 'moment'
// moment.locale('zh-tw')

function ProductData(props) {
  // moment.locale('zh-tw')
  //set redirect
  const history = useHistory()
  //set data

  const id = props.match.params.pid
  const [proData, setProData] = useState('')
  const [tagData, setTagData] = useState('')
  const [proQty, setProQty] = useState(1)
  //set album
  //set date
  const sTime = props.startTime
  const eTime = props.endTime
  const pdays = moment(eTime).diff(sTime, 'days')

  const pDataSource = 'http://localhost:4000/product/item/' + id
  const tagSource = 'http://localhost:4000/product/itemtag/' + id
  const album1 = 'https://i3.mkgo.net/images/album/A/' + id + '.jpg'

  const album2 = 'https://i3.mkgo.net/images/album/B/' + id + '.jpg'

  const album3 = 'https://i3.mkgo.net/images/album/C/' + id + '.jpg'
  const [proAlbumM, setProAlbumM] = useState(album1)
  //<!----購物車區塊開始----->
  const { sessionServer } = props

  const sessionServer1 = async (sid, qty) => {
    // const newData = new Request()
    const url = `http://localhost:4000/cart/add?sid=${sid}&quantity=${qty}`
    console.log(url)
    const request = new Request(url, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    setTimeout(() => {
      sessionServer()
    }, 500)
  }

  useEffect(() => {
    sessionServer1()
  }, [])
  //<!-----購物車區塊結束---->
  async function getPData() {
    //設定資料源頭(Pdata)
    const request = new Request(pDataSource, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    // 設定資料
    setProAlbumM(album2)
    setProData(data)
  }
  async function getTagData() {
    //設定資料源頭(Tdata)
    const request = new Request(tagSource, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const response = await fetch(request)
    const tdata = await response.json()
    console.log(tdata)
    setTagData(tdata)
  }

  useEffect(() => {
    getTagData()
    getPData()
    // setProAlbumA
    // setProAlbumB
    // setProAlbumC
    // setProAlbumD
  }, [])

  //評分月亮(已使用key修正)
  const moonrank = {
    size: 25,
    char: <BsMoon />,
    edit: false,
    count: 5,
  }
  // TAG區域
  const tagArea = (
    <div className="pro-tag-set">
      {tagData.length &&
        tagData.map((v, i) => {
          let tagUrl = `/search?ptagId=${v.tagId}`
          return (
            <>
              <Link to={tagUrl} style={{ textDecoration: 'none' }}>
                <div className="prodata-tag">{v.tagName}</div>
              </Link>
            </>
          )
        })}
    </div>
  )
  // 相簿區域
  const albumArea = (
    <>
      <div className="pro-album m-0 p-0">
        <Row className="pro-album-box mx-0 px-0" md={12}>
          <img
            className="pro-img-main"
            src={proAlbumM}
            alt={proData.product_name}
          />
        </Row>
        <Row className="pt-4 d-flex pro-album-btnarea">
          <Col
            className="pro-album-btn px-2"
            md={3}
            onClick={() => {
              setProAlbumM(album2)
            }}
          >
            <img className="pro-img" src={album2} alt={proData.product_name} />
          </Col>
          <Col
            className="pro-album-btn px-2"
            md={3}
            onClick={() => {
              setProAlbumM(album1)
            }}
          >
            <img className="pro-img" src={album1} alt={proData.product_name} />
          </Col>
          <Col
            className="pro-album-btn px-2 "
            md={3}
            onClick={() => {
              setProAlbumM(album3)
            }}
          >
            <img className="pro-img" src={album3} alt={proData.product_name} />
          </Col>
        </Row>
      </div>
    </>
  )
  // const qtyArea = <></>
  return (
    <>
      <Container className="pro-data-sec1" fluid>
        <Row className="pro-data-container mx-5 pt-4">
          <Col md={6}>
            {albumArea}
            <div className="pro-data-desc">{proData.product_desc}</div>
          </Col>
          <Col md={6} className="flex-row">
            <div className="pro-data-basic">
              <h2>{proData.product_name}</h2>
            </div>
            <span className="pro-data-subtext">{proData.product_summary}</span>
            <br />
            <br />
            <div></div>
            {/* {rankArea()} */}
            <div>
              {/* {proData.product_rate} */}
              <ReactStars
                key={proData.product_rate}
                value={proData.product_rate}
                {...moonrank}
              />
            </div>
            {tagArea}
            {/* 數量控制區域 */}
            <Row className="pro-data-set1">
              <Col md={6}>
                <div className="pro-subtitle">
                  <span>數量</span>
                  <span id="pro-qty-alert"></span>
                </div>

                <div className="pro-qty-wrap">
                  <div
                    className="pro-qty-btn ptl"
                    onClick={() => {
                      if (proQty > 1) {
                        setProQty(proQty - 1)
                      } else {
                        return
                      }
                    }}
                  >
                    <FaMinus className="pro-qty-icon" />
                  </div>

                  <span className="pro-qty-num">{proQty}</span>

                  <div
                    className="pro-qty-btn ptr"
                    onClick={() => {
                      if (proQty < proData.qty) {
                        setProQty(proQty + 1)
                      } else {
                        return
                      }
                    }}
                  >
                    <FaPlus className="pro-qty-icon" />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="pro-subtitle">
                  <span>小計</span>
                </div>
                <div className="pro-price d-flex flex-row align-items-end">
                  <span className="pro-price-sub ppt">NT$</span>
                  <span className="pro-price-main ppt">
                    {proData.product_price * pdays * proQty}
                  </span>
                  <span className="pro-price-sub ppt"> / {pdays}日</span>
                </div>
              </Col>
            </Row>
            {/* 時間選擇區域 */}
            <Row className="pro-data-set2">
              <Col
                className="mx-auto"
                md={10}
                onClick={() => {
                  document.getElementById('starttime').focus()
                }}
              >
                <div className="pro-subtitle">
                  <span>租借時間</span>
                  <div className="pro-timeselect-setarea d-flex flex-row align-items-center">
                    <div className="pro-timeselect-icon">
                      <FaRegCalendarCheck className="pro-time-icon" />
                    </div>
                    <span>{moment(sTime).format('YYYY年MM月DD日')}</span>
                    <FaArrowRight />
                    <FaRegCalendarTimes className="pro-time-icon" />
                    <span>{moment(eTime).format('YYYY年MM月DD日')}</span>
                  </div>
                </div>
              </Col>
            </Row>
            {/* 購物車選擇區域 */}
            <Row className="pro-data-set3 ">
              <Col className="mx-auto" md={10}>
                <button
                  className="pro-cartbtn mt-5 px-2"
                  onClick={(e) => {
                    sessionServer1(id, proQty)
                  }}
                >
                  加入購物車
                </button>
                <button
                  className="pro-actbtn mt-5 px-2"
                  onClick={(e) => {
                    sessionServer1(id, proQty)
                    history.push('/cart')
                  }}
                >
                  立即租借
                </button>
              </Col>
            </Row>
          </Col>
          <div></div>
        </Row>
      </Container>
      <Container>
        <Row>
          <div className="pro-sec3-imgarea mx-auto text-center">
            <img
              className="pro-sec3-img"
              src={album3}
              alt={proData.product_name}
            />
            <div className="pro-sec3-title">
              <h2>{proData.product_name}</h2>
            </div>
          </div>
          <div className="pro-lorem-con mx-auto text-center">
            <img
              src="http://localhost:3000/images/product/Lorem.jpg"
              className="pro-lorem"
              alt="Lorem"
            />
          </div>
        </Row>
      </Container>
    </>
  )
}

export default withRouter(ProductData) //需要使用useRouuter
