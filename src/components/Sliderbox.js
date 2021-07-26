import React, { useState, useEffect, useRef } from 'react'
// import { Modal, Button } from 'react-bootstrap'
// import { withRouter } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/productcard.css'
import { BsMoon } from 'react-icons/bs'
import { FaCartPlus } from 'react-icons/fa'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

//全站卡片顯示套件
//更新時間:2021/07/15 05:40
//最新事項-> 可切換版本

function Sliderbox(props) {
  //上層先設定鉤子
  const [cards, setCards] = useState([])
  const source = props.source

  //<!----購物車區塊開始----->
  const { sessionServer } = props

  const sessionServer1 = async (sid) => {
    // const newData = new Request()
    const url = `http://localhost:4000/cart/add?sid=${sid}&quantity=1`
    const request = new Request(url, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    console.log('data', data)
    // setSdata(data)
    //增加商品後記得刷新購物車讀取頁面
    setTimeout(() => {
      sessionServer()
    }, 500)
  }

  // useEffect(() => {
  //   sessionServer()
  // }, [Sdata])

  useEffect(() => {
    sessionServer1()
  }, [])
  //<!-----購物車區塊結束---->
  useEffect(() => {
    async function getData() {
      //設定卡片資料源頭
      const request = new Request(source, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const response = await fetch(request)
      const data = await response.json()
      console.log(data)
      // 設定資料
      setCards(data)
    }
    //設定抓取資料
    getData()
  }, [])
  //TODO:切換價格顯示
  // switch()

  //slide設定
  let settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        // LG
        breakpoint: 1580,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 5,
          infinite: true,
        },
      },
      {
        // LG
        breakpoint: 1350,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 4,
          infinite: true,
        },
      },
      {
        // LG
        breakpoint: 979,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
          infinite: true,
        },
      },
      {
        // MD
        breakpoint: 753,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        //sm
        breakpoint: 528,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const moonrank = {
    size: 25,
    char: <BsMoon />,
    edit: false,
  }

  const cardgroup = (
    <>
      <div className="pro-cardout">
        <Slider {...settings}>
          {cards.length &&
            cards.map((value, index) => {
              let prourl = `/product/${value.product_id}`
              return (
                <>
                  <div className="pro-card">
                    <Link to={prourl} style={{ textDecoration: 'none' }}>
                      <div className="pro-cardimgarea">
                        <img
                          src={value.product_img}
                          className="pro-cardimg"
                          alt={value.product_name}
                        ></img>
                      </div>
                    </Link>
                    <div className="pro-card-info">
                      <div class="pro-cardtitle">
                        <h5>{value.product_name}</h5>
                      </div>
                      <div class="pro-cardsummary">
                        <span>{value.product_summary}</span>
                      </div>
                      <div class="pro-cardrank">
                        {/* <div>Rank　</div> */}
                        <div>
                          <ReactStars
                            count={5}
                            value={value.product_rate}
                            {...moonrank}
                          />
                        </div>
                      </div>
                      {/* 價格標籤 */}
                      <div
                        className="pro-card-btn mt-3"
                        onClick={(e) => {
                          sessionServer1(value.product_id)
                        }}
                      >
                        <div className="pro-card-price mx-3">
                          <span className="pro-card-number">
                            ${value.product_price}
                          </span>
                          <span> /每日</span>
                        </div>
                        <div className="pro-card-carticon">
                          <FaCartPlus
                            className="pro-card-addcart"
                            size="1.8em"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
        </Slider>
      </div>
    </>
  )

  return <div>{cardgroup}</div>
}
export default Sliderbox
