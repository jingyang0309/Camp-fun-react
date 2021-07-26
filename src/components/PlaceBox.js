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

function PlaceBox(props) {
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        // LG
        breakpoint: 1580,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
          infinite: true,
        },
      },
      {
        // LG
        breakpoint: 1350,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        // LG
        breakpoint: 979,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        // MD
        breakpoint: 753,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
  const demoData = [
    {
      img: 'http://localhost:4000/img/peimg/01.jpg',
      title: '上雲端露營區',
      rank: '5',
      summary: '鄰近明德水庫 日新島 薰衣草森林 雅聞玫瑰森林',
      place: '苗栗縣, 頭屋鄉',
    },
    {
      img: 'http://localhost:4000/img/peimg/02.jpg',
      title: '斯揚莫那休閒莊園',
      rank: '3',
      summary: '留茂安和四季部落之間，面對雪山脈背靠加羅湖群',
      place: '宜蘭縣, 大同鄉',
    },
    {
      img: 'http://localhost:4000/img/peimg/03.jpg',
      title: '斯揚莫那休閒莊園',
      rank: '3',
      summary: '留茂安和四季部落之間，面對雪山脈背靠加羅湖群',
      place: '宜蘭縣, 大同鄉',
    },
    {
      img: 'http://localhost:4000/img/peimg/02.jpg',
      title: '松蘿園林露營區',
      rank: '4',
      summary: '制高點賞大景營地~觀看龜山島日出及太平山日落絕美景色',
      place: '宜蘭縣, 大同鄉',
    },
    {
      img: 'http://localhost:4000/img/peimg/06.jpg',
      title: '五福山莊',
      rank: '2',
      summary: '關刀山下的自然保育林區內的百年客家聚落',
      place: '苗栗縣, 三義鄉',
    },
  ]
  const cardgroup = (
    <>
      <div className="pro-cardout">
        <Slider {...settings}>
          {demoData.length &&
            demoData.map((value, index) => {
              let prourl = `/pickplace`
              return (
                <>
                  <div className="place-pro-card">
                    <Link to={prourl} style={{ textDecoration: 'none' }}>
                      <div className="place-pro-cardimgarea">
                        <img
                          src={value.img}
                          className="place-pro-cardimg"
                          alt={value.title}
                        ></img>
                      </div>
                      <span className="place-location">{value.place}</span>
                    </Link>
                    <div className="pro-card-info">
                      <div class="pro-cardtitle">
                        <h5>{value.title}</h5>
                      </div>
                      <div class="place-pro-cardsummary">
                        <span>{value.summary}</span>
                      </div>
                      <div class="pro-cardrank">
                        {/* <div>Rank　</div> */}
                        <div>
                          <ReactStars
                            count={5}
                            value={value.rank}
                            {...moonrank}
                          />
                        </div>
                      </div>
                      {/* 價格標籤 */}
                      {/* <div
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
                      </div> */}
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
export default PlaceBox
