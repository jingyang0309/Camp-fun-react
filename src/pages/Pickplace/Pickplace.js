import React, { useState, useEffect } from 'react'
// import { render } from 'react-dom'
import { useHistory } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import '../../styles/Pickplace/PickPlace.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { far } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronLeft,
  faChevronRight,
  // faSlidersH,
  fas,
  faMapMarkerAlt,
  // faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { BsMoon } from 'react-icons/bs'
import ReactStars from 'react-rating-stars-component'

// ------------------------------------日曆-------------------------------------------
// import Calendar from '../../components/Calendar'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import { DateRangePicker } from 'react-dates'

import moment from 'moment'
// ------------------------------------日曆-------------------------------------------

// ------------------------------------地圖-------------------------------------------
import Taiwan from '@svg-maps/taiwan.main'
import { SVGMap } from 'react-svg-map'
import 'react-svg-map/lib/index.css'
import { getLocationName } from './catchMapAtr'
// ------------------------------------地圖-------------------------------------------

// ------------------------------------Modal-------------------------------------------
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Swal from 'sweetalert2'
// ------------------------------------Modal-------------------------------------------

// ------------------------------------下方卡片-------------------------------------------
// props
function Pickplace(props) {
  const [places, setPlaces] = useState([]) //卡片
  const [placename, setPlaceName] = useState('上雲端露營區') //場地名稱
  const [placeloc, setPlaceLoc] = useState('苗栗縣頭屋鄉') //場地位置
  const [placeviewimg, setPlaceViewImg] = useState('01.jpg') //場地主圖
  const [placedesc, setPlaceDesc] = useState(
    '鄰近明德水庫 日新島 薰衣草森林 雅聞玫瑰森林'
  ) //場地簡介
  const [placerating, setPlaceRating] = useState(5) //場地評價
  const [placesimg, setPlaceSImg] = useState('01-2-1.jpg') //場地配置圖

  const [tentCount, setTentCount] = useState([])
  const [isFirstOrder, setIsFirstOrder] = useState(true) //控制modal動畫

  const [subtotal, setSubTotal] = useState([])
  const [weekdayprice, setWeekDayPrice] = useState(0)
  const [holidayprice, setHoliDayPrice] = useState(0)
  const [continuousdayprice, setContinuousDayPrice] = useState(0)

  // const [dataLoading, setDataLoading] = useState(false)

  // custom prev arrow
  function SamplePrevArrow(props) {
    const { onClick } = props
    return (
      <i onClick={onClick} class="fa fa-arrow-left" aria-hidden="true">
        <FontAwesomeIcon icon={(fas, faChevronLeft)} />
      </i>
    )
  }

  // custom next arrow
  function SampleNextArrow(props) {
    const { onClick } = props
    return (
      <i onClick={onClick} class="fa fa-arrow-right" aria-hidden="true">
        <FontAwesomeIcon icon={(fas, faChevronRight)} />
      </i>
    )
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  // const [settings, setSettings] = useState(config)

  async function getPlacesFromServer() {
    // 開啟載入指示
    // setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:4000/pickplace/all'

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const result = await response.json()
    // console.log(result)
    // 設定資料
    setPlaces(result.data)
    setPlaceName(result.data[0].placeName)
    setPlaceLoc(result.data[0].placeLoc)
    setPlaceViewImg(result.data[0].placeViewImg)
    setPlaceDesc(result.data[0].placeDesc)
    setPlaceRating(result.data[0].placeRating)
    setPlaceSImg(result.data[0].placeSImg)
  }

  // 一開始就會開始載入資料
  useEffect(() => {
    getPlacesFromServer()
  }, [])

  // 每次users資料有變動就會X秒後關掉載入指示
  // useEffect(() => {
  //   setTimeout(() => {
  //     setDataLoading(false)
  //   }, 1000)
  // }, [places])

  // const loading = (
  //   <>
  //     <div className="d-flex justify-content-center">
  //       <div className="spinner-border" role="status">
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   </>
  // )

  // ------------------------------------下方卡片-------------------------------------------

  // ------------------------------------地圖-------------------------------------------
  const [clickedLocation, setClickedLocation] = useState('')

  //TODO:
  //點擊後需地圖圖示要LOCK住縣市

  const handleLocationClick = (event) => {
    const cLocation = getLocationName(event)
    setClickedLocation(cLocation)
    sendDataToSever(cLocation)

    // if (document.querySelector('.active')) {
    //   document.querySelector('.active').classList.remove('active')
    // }
    // // 被點擊的縣市加上 .active
    // document
    //   .getElementById('city' + d.properties.COUNTYCODE)
    //   .classList.add('active')
  }

  async function sendDataToSever(cLocation) {
    const newData = { cLocation }
    const url = 'http://localhost:4000/pickplace/catchdata'

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    // console.log(JSON.stringify(newData))
    const response = await fetch(request)
    const result = await response.json()
    // console.log('伺服器回傳的json資料', result)
    setPlaces(result.data)
    setPlaceName(result.data[0].placeName)
    setPlaceLoc(result.data[0].placeLoc)
    setPlaceViewImg(result.data[0].placeViewImg)
    setPlaceDesc(result.data[0].placeDesc)
    setPlaceRating(result.data[0].placeRating)
    setPlaceSImg(result.data[0].placeSImg)
  }
  // ------------------------------------地圖-------------------------------------------

  // ------------------------------------主視窗-------------------------------------------

  const [mainView, setMainView] = useState([])

  async function catchSid(i) {
    const dataId = { i }
    const url = 'http://localhost:4000/pickplace/catchone'

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(dataId),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    // console.log(JSON.stringify(dataId))
    const response = await fetch(request)
    const result = await response.json()
    // console.log('伺服器回傳的json資料', result)
    setMainView(result.data)
    // console.log(result.data[0].placeName)
    // data.data[0].placeViewImg
    const defaultTentCountArray = [] //抓取資料庫幾筆,產生空陣列儲存計數器
    result.data.forEach(() => {
      defaultTentCountArray.push(0)
    })
    setTentCount(defaultTentCountArray)
    setSubTotal(defaultTentCountArray)

    setPlaceName(result.data[0].placeName)
    setPlaceLoc(result.data[0].placeLoc)
    setPlaceViewImg(result.data[0].placeViewImg)
    setPlaceDesc(result.data[0].placeDesc)
    setPlaceRating(result.data[0].placeRating)
    setPlaceSImg(result.data[0].placeSImg)
    setWeekDayPrice(result.data[0].weekdaysPrice)
    setHoliDayPrice(result.data[0].holidayPrice)
    setContinuousDayPrice(result.data[0].continuousPrice)
  }
  // ------------------------------------主視窗-------------------------------------------

  // ------------------------------------日曆--------------------------------------------

  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  })

  const defaultFocusedInput = 'null' //時段區間初始值
  const [focusedInput, setFocusedInput] = useState(defaultFocusedInput)

  const handleDatesChange = (dates) => {
    setDates(dates)
    console.log('date', dates)
    console.log(moment())
  }

  const onFocusChange = (focusedInput) => {
    // console.log(onFocusChange)
    setFocusedInput(focusedInput)
  }

  const countDate = () => {
    const sday = dates.startDate
    const eday = dates.endDate
    const totalday = eday ? eday.diff(sday, 'days') : null
    const allneed = [totalday, sday, eday]
    return allneed
  }

  // ------------------------------------日曆--------------------------------------------

  // ------------------------------------Modal-------------------------------------------
  const [orderPlaceModalShow, setOrderPlaceModalShow] = useState(false)
  const [placeIntrModalShow, setPlaceIntrModalShow] = useState(false)
  const [tentprice, setTentPrice] = useState('')

  function OrderPlaceModal(props) {
    const T_day = countDate()[0]
    const S_day = countDate()[1] ? moment(countDate()[1]).format('MM-DD') : ''
    const E_day = countDate()[2] ? moment(countDate()[2]).format('MM-DD') : ''

    if (T_day >= 3) {
      setTentPrice(continuousdayprice)
    } else if (
      parseInt(moment(countDate()[1]).format('d')) === 6 ||
      parseInt(moment(countDate()[1]).format('d')) === 0
    ) {
      setTentPrice(holidayprice)
    } else if (
      parseInt(moment(countDate()[2]).format('d')) === 6 ||
      parseInt(moment(countDate()[2]).format('d')) === 0
    ) {
      setTentPrice(holidayprice)
    } else setTentPrice(weekdayprice)

    let totalprice = 0

    for (let i = 0; i < subtotal.length; i++) {
      totalprice += subtotal[i]
    }
    // console.log(result.data[0].placeName)
    // console.log(mainView[0].continuousPrice)

    const intoData = []
    const history = useHistory()

    function sendOrderData() {
      for (let i = 0; i < tentCount.length; i++) {
        intoData[i] = {
          PlaceName: placename,
          PlaceAreaPic: `http://localhost:4000/img/peimg/${mainView[i].placeAImg}`,
          orderArea: mainView[i].placeArea,
          orderTDay: countDate()[0],
          orderSDay: countDate()[1],
          orderEDay: countDate()[2],
          orderTPrice: tentprice,
          orderTCount: tentCount[i],
          orderSubPrice: subtotal[i],
          orderTolPrice: totalprice,
        }
      }
      const placeCart = localStorage.setItem(
        'placeCart',
        JSON.stringify(intoData)
      )

      Swal.fire({
        icon: 'success',
        title: '預訂成功',
        text: '即將前往購物車結帳',
        showConfirmButton: false,
        timer: 2500,
      })
      setTimeout(() => {
        history.push('/cart')
      }, 2500)
      // console.log(intoData)
    }

    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          // bsPrefix="pe-modal-header "
          closeButton
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            variant="pe-modal-title"
          >
            <div className="pe-order-titleimg">
              <img
                src={`http://localhost:4000/img/peimg/${placeviewimg}`}
                alt=""
              />
            </div>
            <div className="pe-order-title">{placename}</div>
            <div className="pe-order-desc">{placedesc}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix="pe-modal-body">
          <div>
            <Table responsive="sm">
              <thead>
                <tr className="pe-order-thead">
                  <th></th>
                  <th>分區</th>
                  <th>露營天數</th>
                  <th>日期 / 每帳價格</th>
                  <th>帳數</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {mainView.map(
                  (
                    item,
                    index //增加 index 索引值
                  ) => (
                    <tr>
                      <td>
                        <img
                          src={`http://localhost:4000/img/peimg/${item.placeAImg}`}
                          className="pe-order-smallimg"
                          alt=""
                        />
                      </td>
                      <td className="pe-order-text">{item.placeArea}</td>
                      <td className="pe-order-text">{T_day}</td>
                      <td>
                        <div className="pe-order-text">
                          {S_day} ~ {E_day}
                        </div>
                        <div className="pe-order-text">{tentprice}</div>
                      </td>
                      <td>
                        <div className="pe-order-btnbk">
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              className="pe-order-btnic-l"
                              onClick={() => {
                                const newArray = [...tentCount]
                                if (newArray[index] - 1 < 0) return
                                newArray[index] = newArray[index] - 1
                                setIsFirstOrder(false)
                                setTentCount(newArray)
                              }}
                            >
                              -
                            </button>
                          </div>

                          <span className="pe-order-counternaum">
                            {tentCount[index]}
                          </span>

                          <button
                            type="button"
                            className="pe-order-btnic-a"
                            onClick={() => {
                              const newArray = [...tentCount]
                              newArray[index] = newArray[index] + 1
                              setIsFirstOrder(false)
                              setTentCount(newArray)
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="pe-order-sprice">
                        $
                        {
                          (subtotal[index] =
                            T_day * tentprice * tentCount[index])
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
            {/* <Table responsive="xl">
              <thead>
                <tr>
                  <th></th>
                  <th>分區</th>
                  <th>日期/每帳價格</th>
                  <th>露營天數</th>
                  <th>帳數</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="pe-order-tloc">
            <span className="pe-order-nttext">總計 NT$</span>
            <span className="pe-order-tprietext">{totalprice}</span>
          </div>
          <button
            className="pe-order-btn"
            onClick={(tentCount, subtotal, S_day, E_day, T_day, tentprice) => {
              sendOrderData()
            }}
          >
            確認預訂
          </button>
        </Modal.Footer>
      </Modal>
    )
  }

  function PlaceIntrModal(props) {
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton closeLabel="pe-close">
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="pe-intr-title">{placename}</div>
            {/* <div className="pe-intr-desc">{placedesc}</div> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img
              src={`http://localhost:4000/img/peimg/${placesimg}`}
              className="pe-intr-pic"
              alt=""
            />
          </div>
          <Table responsive="xl">
            <thead>
              <tr className="pe-intr-thead">
                <th>區域</th>
                <th>型態</th>
                <th>尺寸</th>
                <th>帳數</th>
                <th>平日價格</th>
                <th>假日價格</th>
                <th>連續預訂價格</th>
              </tr>
            </thead>
            <tbody>
              {mainView.map((item) => (
                <tr>
                  <td>{item.placeArea}</td>
                  <td>{item.placeType}</td>
                  <td>{item.placeSize}</td>
                  <td>{item.tentQty}</td>
                  <td>{item.weekdaysPrice}</td>
                  <td>{item.holidayPrice}</td>
                  <td>{item.continuousPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* <Table responsive="sm">
            <thead>
              <tr>
                <th>區域</th>
                <th>型態</th>
                <th>尺寸</th>
                <th>帳數</th>
                <th>平日價格</th>
                <th>假日價格</th>
                <th>連續預訂價格</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table> */}
          <Table responsive="xl">
            <thead>
              <tr>
                <th>營區資訊介紹</th>
              </tr>
            </thead>
            <tbody>
              {mainView.length > 0 ? (
                <>
                  <tr>
                    <td>海拔</td>
                    <td>{mainView[0].altitude}</td>
                    <td>營區特色</td>
                    <td>{mainView[0].feature}</td>
                  </tr>
                  <tr>
                    <td>衛浴配置</td>
                    <td>{mainView[0].bathroom}</td>
                    <td>無線通訊</td>
                    <td>{mainView[0].wlComm}</td>
                  </tr>
                  <tr>
                    <td>攜帶寵物</td>
                    <td>{mainView[0].pet}</td>
                    <td>附屬設施</td>
                    <td>{mainView[0].equipment}</td>
                  </tr>
                  <tr>
                    <td>附屬服務</td>
                    <td>{mainView[0].service}</td>
                    <td>停車方式</td>
                    <td>{mainView[0].parking}</td>
                  </tr>
                </>
              ) : (
                ``
              )}
            </tbody>
          </Table>
          {/* <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
                <th>Table heading</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table> */}
        </Modal.Body>
      </Modal>
    )
  }
  // ------------------------------------Modal-------------------------------------------

  const placelocf = placeloc.slice(0, 3)
  const placelocb = placeloc.slice(3, 6)
  const ratingLv = {
    size: 25,
    edit: false,
    char: <BsMoon />,
    count: 5,
  }

  const display = (
    <>
      <div className="asideMenu">
        {/* <button className="asideBtn fa-2x">
          <FontAwesomeIcon icon={(fas, faChevronRight)} />
        </button> */}
        <p className="pe-selectmaptext">請點選地圖選取區域</p>
        <div>
          <p className="pe-selectedloc">{clickedLocation}</p>
          <SVGMap
            map={Taiwan}
            type="link"
            onLocationClick={handleLocationClick}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-7">
          <img
            src={`http://localhost:4000/img/peimg/${placeviewimg}`}
            className="pe-main-titleimg"
            alt=""
          />
        </div>
        <div className="col-5">
          <div className="pe-main-titlename-align">
            <div>
              <p className="pe-main-titlename">{placename}</p>
            </div>
            <div>
              <p className="pe-main-loc">
                <FontAwesomeIcon icon={(fas, faMapMarkerAlt)} />
                {placelocf}, {placelocb}
              </p>
            </div>
          </div>
          <div className="pe-main-moon">
            <ReactStars {...ratingLv} key={placerating} value={placerating} />
          </div>
          <hr />
          <div>
            <p className="pe-main-desc">{placedesc}</p>
          </div>
          <hr />

          <div>
            <p className="pe-main-orderdatetext">預約日期</p>
            <DateRangePicker
              numberOfMonths={1} //顯示1張日曆
              daySize={30} //日曆大小
              autoFocus
              startDate={dates.startDate}
              startDateId="start-date"
              endDate={dates.endDate}
              endDateId="end-date"
              onDatesChange={handleDatesChange}
              // {({ startDate, endDate }) => {
              //   setStartDate(startDate)
              //   setEndDate(endDate)
              // }}
              focusedInput={focusedInput || defaultFocusedInput}
              onFocusChange={onFocusChange}
              showClearDates
              startDatePlaceholderText="出發日期"
              endDatePlaceholderText="結束日期"
              monthFormat="YYYY[年]MM[月]"
            />
          </div>
          <br />
          <div className="pe-main-btn-align">
            <button
              className="pe-main-intr-btn"
              onClick={() => setPlaceIntrModalShow(true)}
            >
              營區設備
            </button>
            <button
              className="pe-main-order-btn"
              onClick={() => setOrderPlaceModalShow(true)}
            >
              立即預約
            </button>

            <OrderPlaceModal
              animation={isFirstOrder}
              setIsFirstOrder={setIsFirstOrder}
              show={orderPlaceModalShow}
              onHide={() => setOrderPlaceModalShow(false)}
              tentCount={tentCount}
              setTentCount={setTentCount}
            />
            <PlaceIntrModal
              show={placeIntrModalShow}
              onHide={() => setPlaceIntrModalShow(false)}
            />
          </div>
        </div>
      </div>

      {/* 卡片 */}
      <Row className="pe-sortrow">
        {/* <button>
          <FontAwesomeIcon icon={(fas, faSlidersH)} />
          排序
        </button> */}
      </Row>
      <div className="pe-featured-products">
        <Slider {...settings}>
          {places.map((item) => (
            <Col className="pe-product-card">
              {/* key={item.placeId} */}
              <Card>
                {/* <Link to={`/pickplace/${item.placeId}`}> */}
                <Card.Img
                  className="pe-product-card-image"
                  variant="top"
                  src={`http://localhost:4000/img/peimg/${item.placeViewImg}`}
                  onClick={() => {
                    catchSid(item.placeId)
                  }}
                />
                <Card.Body className="pe-product-details">
                  <Card.Title className="pe-product-name">
                    {item.placeName}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Slider>
      </div>
    </>
  )

  return (
    <>
      <div className="container bkcolor">{display}</div>
    </>
  )
}

export default Pickplace
