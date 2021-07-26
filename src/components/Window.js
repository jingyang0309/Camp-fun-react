import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import '../styles/window.css'
import Logo from '../images/sec2-subtitle.png'
import { HiPlusCircle } from 'react-icons/hi'
import MouseFollow from './MouseFollow'
// import { nodeName } from 'jquery'
//主程式開始
const Window = (props) => {
  //設定卡片
  const [searchCard, setSearchCard] = useState([])
  //設定滑鼠偵測
  const { x, y } = MouseFollow()
  //設定通用標題及資訊內容
  let title = ''
  let mainImage = ''
  let touchArea1 = `win-${props.tagid}-1-toucharea`
  let touchArea2 = `win-${props.tagid}-2-toucharea`
  let touchArea3 = `win-${props.tagid}-3-toucharea`
  let loadProductData = []
  let prolink = []
  let pageState = 1
  let winlink = ''
  console.log('pro', prolink)
  switch (props.winLink) {
    case 'art':
      winlink = `/search?ptagId=${props.tagid}`
      break
    case 'pro':
      winlink = `/articles/tags/${props.tagid}`
      break
    default:
      winlink = `/`
  }
  switch (props.tagid) {
    case 12:
      mainImage = 'http://localhost:3000/images/window/window01.jpg'
      title = (
        <>
          <h1>#焚火爐</h1>
          <span className="win-describe">
            和三五好友一起在焚火爐邊享受啤酒，享受火焰搖曳帶來的溫暖氣氛
          </span>
        </>
      )
      loadProductData = [22, 52]
      break

    // tagid=44
    case 44:
      mainImage = 'http://localhost:3000/images/window/window03.jpg'
      title = (
        <>
          <h1>#女生派對</h1>
          <span className="win-describe">
            生命就該浪費在美好的事物上，而時間就該與好閨蜜一同度過
          </span>
        </>
      )
      loadProductData = [60, 5, 62]
      break

    // tagid = 28
    case 28:
      mainImage = 'http://localhost:3000/images/window/window04.jpg'
      title = (
        <>
          <h1>#野外餐桌</h1>
          <span className="win-describe">
            結合野餐風潮，讓原始露營也能注入時尚魂
          </span>
        </>
      )
      loadProductData = [61, 2, 56]
      break

    // tagid = 45
    case 45:
      mainImage = 'http://localhost:3000/images/window/window05.jpg'
      title = (
        <>
          <h1>#派對</h1>
          <span className="win-describe">
            多元又簡單的戶外料理，一起享受草地上的全民派對
          </span>
        </>
      )
      loadProductData = [29, 24, 48]
      break
    // tagid = 8
    case 8:
      mainImage = 'http://localhost:3000/images/window/window07.jpg'
      title = (
        <>
          <h1>#親子</h1>
          <span className="win-describe">
            周末帶著孩子體驗野營的魅力吧，不論是學習搭營或是正確用火的知識都能輕鬆的體驗
          </span>
        </>
      )
      loadProductData = [56, 15, 8]
      break

    // tagid = 27
    case 27:
      mainImage = 'http://localhost:3000/images/window/window06.jpg'
      title = (
        <>
          <h1>#儀式感</h1>
          <span className="win-describe">
            誰說野營就不能隆重，在野外享受群山環繞，喝著手沖咖啡，讓身心得到完整的滿足。
          </span>
        </>
      )
      loadProductData = [49, 19, 27]
      break
    default:
      pageState = 0
  }
  console.log('pageState', pageState)
  //設定State
  //載入商品資訊
  async function getCardData(pid) {
    const url = `http://localhost:4000/product/itemcard/${pid}`
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const procardData = await response.json()
    // 設定資料
    setSearchCard((prevSearchCard) => {
      const newArr = [...prevSearchCard]
      newArr.push(procardData)
      console.log('合成結果', newArr)
      return newArr
    })
  }

  //載卡片和判別商品數量為2或3
  function Startup() {
    if (loadProductData.length === 2) {
      document.querySelector('.win-c3').style.display = 'none'
    }
    loadProductData.map((v, i) => {
      getCardData(v)
      return <></>
    })
  }

  useEffect(() => {
    Startup()
    if (pageState === 0) {
      document.querySelector('.win-all').style.display = 'none'
    }
  }, [])
  // 製作卡片

  function makecard() {
    console.log(searchCard)
    return (
      <>
        {searchCard.map((value, i) => {
          const cssid = `win-procard-${i + 1}`
          return (
            <>
              <div
                id={cssid}
                className="win-procard"
                style={{
                  position: 'absolute',
                  top: y,
                  left: x,
                  display: 'none',
                  zIndex: 9999,
                }}
              >
                <div className="win-procard-imgarea">
                  <img
                    src={value.product_img}
                    className="win-procard-img"
                    alt={value.product_name}
                  ></img>
                </div>
                <div className="win-procard-title">
                  <h5>{value.product_name}</h5>
                </div>
                <div className="win-procard-summary">
                  <span>{value.product_summary}</span>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }
  function cardon1() {
    if (searchCard.length > 0) {
      document.getElementById('win-procard-1').style.display = 'block'
    }
  }
  function cardoff1() {
    if (searchCard.length > 0) {
      document.getElementById('win-procard-1').style.display = 'none'
    }
  }
  function cardon2() {
    if (searchCard.length > 1) {
      document.getElementById('win-procard-2').style.display = 'block'
    }
  }
  function cardoff2() {
    if (searchCard.length > 1) {
      document.getElementById('win-procard-2').style.display = 'none'
    }
  }
  function cardon3() {
    if (searchCard.length > 2) {
      document.getElementById('win-procard-3').style.display = 'block'
    }
  }
  function cardoff3() {
    if (searchCard.length > 2) {
      document.getElementById('win-procard-3').style.display = 'none'
    }
  }
  return (
    <>
      <Container className="mx-auto win-all">
        {/* <Row>
          <Col md={12}> */}
        {makecard()}
        <div className="win-container">
          {/* 差異點 */}
          <Link to={winlink}>
            <div className="win-title">{title}</div>
          </Link>
          {/* <div className="win-subtitle"></div> */}
          <div className="win-logo">
            <img src={Logo} alt="logo" />
          </div>
          {/* 差異點2 */}
          <Link to={'/product/' + loadProductData[0]}>
            <div
              id={touchArea1}
              className="win-toucharea win-c1"
              onMouseOver={cardon1}
              onMouseLeave={cardoff1}
            >
              <div className="win-icon">
                <HiPlusCircle />
              </div>
            </div>
          </Link>
          <Link to={'/product/' + loadProductData[1]}>
            <div
              id={touchArea2}
              // id="win-15-2-toucharea"
              className="win-toucharea win-c2"
              onMouseOver={cardon2}
              onMouseLeave={cardoff2}
            >
              <div className="win-icon">
                <HiPlusCircle />
              </div>
            </div>
          </Link>
          <Link to={'/product/' + loadProductData[2]}>
            <div
              id={touchArea3}
              className="win-toucharea win-c3"
              onMouseOver={cardon3}
              onMouseLeave={cardoff3}
            >
              <div className="win-icon">
                <HiPlusCircle />
              </div>
            </div>
          </Link>
          <div className="win-mainimage mt-2">
            <img
              className="win-mainimg"
              src={mainImage}
              // src="http://localhost:3000/images/window/window01.jpg"
              alt="win01"
            ></img>
          </div>
        </div>
        {/* </Col>
        </Row> */}
      </Container>
    </>
  )
}

export default withRouter(Window)
