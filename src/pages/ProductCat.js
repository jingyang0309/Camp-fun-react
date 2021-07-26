import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { BsMoon } from 'react-icons/bs'
import { FaCartPlus } from 'react-icons/fa'
import ReactStars from 'react-rating-stars-component'
import noresult from '../images/noresult.png'
import '../styles/productsearch.css'

const ProductCat = (props) => {
  // 取得搜尋值
  const cid = props.match.params.cid
  const sDataSource = 'http://localhost:4000/product/cat/' + cid
  const [searchResult, setSearchResult] = useState([])
  const [catName, setCatName] = useState('')
  const [iconUrl, setIconUrl] = useState('')

  //抓資料
  async function getsData() {
    //設定資料源頭
    const request = new Request(sDataSource, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const pdata = await response.json()
    // 設定STATE資料
    setSearchResult(pdata)
  }

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
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    console.log('購物車', data)

    setTimeout(() => {
      sessionServer()
    }, 500)
  }

  //<!-----購物車區塊結束---->

  useEffect(() => {
    sessionServer1()
    getsData()
    PageTitle(cid)
  }, [cid])

  useEffect(() => {
    sessionServer1()
    getsData()
    PageTitle(cid)
  }, [])

  //評分
  const moonrank = {
    size: 25,
    char: <BsMoon />,
    edit: false,
  }
  //-----------搜尋頁標題
  function PageTitle(cid) {
    let catTrueName = ''
    switch (cid) {
      case 'A':
        catTrueName = '帳篷/天幕'
        setCatName(catTrueName)
        setIconUrl('http://localhost:3000/images/product/cat1.png')
        break
      case 'B':
        catTrueName = '桌椅/戶外家具'
        setCatName(catTrueName)
        setIconUrl('http://localhost:3000/images/product/cat1.png')
        break
      case 'C':
        catTrueName = '寢具/睡袋'
        setCatName(catTrueName)
        setIconUrl('http://localhost:3000/images/product/cat4.png')
        break
      case 'D':
        catTrueName = '火盆/炊具'
        setCatName(catTrueName)
        setIconUrl('http://localhost:3000/images/product/cat2.png')
        break
      case 'E':
        catTrueName = '餐廚具'
        setCatName(catTrueName)
        setIconUrl('http://localhost:3000/images/product/cat3.png')
        break
      case 'F':
        catTrueName = '燈具/飾品'
        setCatName(catTrueName)
        setIconUrl('http://localhost:3000/images/product/cat6.png')
        break
      case 'G':
        catTrueName = '其他/工具類'
        setCatName(catTrueName)
        setIconUrl('http://localhost:3000/images/product/cat7.png')
        break
      default:
        break
    }
  }

  //-----------卡片搜尋結果欄
  function searchView(searchResult) {
    let op = ''
    // 先判別是否有輸入
    if (!cid) {
      return ''
    } else {
      //再判別是否有結果
      if (searchResult.length === 0) {
        op = (
          <>
            <Col className="mx-auto text-center" md={12}>
              <img src={noresult} alt="沒有結果"></img>
            </Col>
          </>
        )
      } else {
        op = (
          <>
            {searchResult.length &&
              searchResult.map((value, index) => {
                let prourl = `/product/${value.product_id}`
                return (
                  <>
                    <div className="pro-search-card" key={index}>
                      <Link to={prourl} style={{ textDecoration: 'none' }}>
                        <div className="pro-search-cardimgarea">
                          <img
                            src={value.product_img}
                            className="pro-search-cardimg"
                            alt={value.product_name}
                          ></img>
                        </div>
                      </Link>
                      <div className="pro-search-card-info">
                        <div className="pro-search-cardtitle">
                          <h5>{value.product_name}</h5>
                        </div>
                        <div className="pro-search-cardsummary">
                          <span>{value.product_summary}</span>
                        </div>
                        <div className="pro-search-cardrank">
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
                          className="pro-search-card-btn mt-3"
                          onClick={(e) => {
                            sessionServer1(value.product_id)
                          }}
                        >
                          <div className="pro-search-card-price mx-3">
                            <span className="pro-search-card-number">
                              ${value.product_price}
                            </span>
                            <span> /每日</span>
                          </div>
                          <div className="pro-search-card-carticon">
                            <FaCartPlus
                              className="pro-search-card-addcart"
                              size="1.8em"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
          </>
        )
      }
    }
    return op
  }

  return (
    <>
      <Container className="pro-search-page" fluid>
        <Row className="pro-search-cardsection">
          <div className="mt-3 mx-auto text-center">
            <img src={iconUrl} className="pro-search-icon my-1" alt="icon" />
            <br />
            <h3>{catName}</h3>
          </div>
        </Row>
        <Row className="pro-search-cardsection">{searchView(searchResult)}</Row>
      </Container>
    </>
  )
}
export default withRouter(ProductCat)
