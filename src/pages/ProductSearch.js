import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { BsMoon } from 'react-icons/bs'
import { FaCartPlus } from 'react-icons/fa'
import ReactStars from 'react-rating-stars-component'
import noresult from '../images/noresult.png'
import '../styles/productsearch.css'
import Window from '../components/Window'
import { GoSearch } from 'react-icons/go'

const ProductSearch = (props) => {
  // 取得搜尋值
  const search = props.location.search
  const params = new URLSearchParams(search)
  const keyword = params.get('keyword') // bar
  const ptagid = parseInt(params.get('ptagId')) // bar
  console.log('keyword', keyword)
  console.log('ptagid', ptagid)
  const sDataSource = 'http://localhost:4000/product/search?key=' + keyword
  const tagDataSource = 'http://localhost:4000/product/tag/' + ptagid
  const tagNameSource = 'http://localhost:4000/product/tagName/' + ptagid
  //-----------http://localhost:4000/product/search?key=1
  //抓搜尋資料
  const [searchResult, setSearchResult] = useState([])
  const [tagSearchResult, setTagSearchResult] = useState([])
  const [tagName, setTagName] = useState('')
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
  //抓TAG資料
  async function getTData() {
    //設定資料源頭(Pdata)
    const request = new Request(tagDataSource, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const tdata = await response.json()
    // 設定資料
    setTagSearchResult(tdata)
  }
  async function getTagName() {
    //設定資料源頭(Pdata)
    const request = new Request(tagNameSource, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const tagNameData = await response.json()
    // 設定資料
    setTagName(tagNameData)
  }

  //<!----購物車區塊開始----->
  const { sessionServer } = props

  const sessionServer1 = async (sid) => {
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
    getTData()
    getTagName()
  }, [search])

  useEffect(() => {
    sessionServer1()
    getsData()
    getTData()
    getTagName()
  }, [])

  //評分
  const moonrank = {
    size: 25,
    char: <BsMoon />,
    edit: false,
  }
  //-----------搜尋頁標題
  function PageTitle(ptagid, keyword) {
    let titlehtml = ''
    if (!ptagid) {
      if (keyword) {
        // props.setSearchKey(keyword)
        console.log('123')
      }
      titlehtml = (
        <>
          <div className="mt-3 d-flex justify-content-start align-items-center ">
            <GoSearch style={{ fontSize: '33px' }} className="mx-3" />
            <h3>
              搜尋與
              <span>[ {keyword} ]</span>
              有關的內容
            </h3>
          </div>
        </>
      )
    } else {
      if (tagName) {
        const str = String(tagName.tagName)
        const newTag = str.replace('#', '')
        // props.setSearchKey(newTag)
        titlehtml = (
          <>
            <div className="mt-3 mx-auto d-flex justify-content-center align-items-center">
              <img
                src="http://localhost:3000/images/product/cat1.png"
                className="pro-search-icon mx-2 my-2"
                alt="icon"
              />
              <h3>
                與{' '}
                <span style={{ textDecoration: 'underline' }}>#{newTag}</span>{' '}
                有關的推薦內容...
              </h3>
            </div>
          </>
        )
      }
    }
    return titlehtml
  }

  //-----------TAG搜尋結果欄位
  function tagView(tagSearchResult) {
    let tp = ''
    // 先判別網址是否有輸入
    if (!ptagid) {
      return ''
    } else {
      // 判別處理結果
      if (tagSearchResult.length == 0) {
        tp = (
          <>
            <Col className="mx-auto text-center" md={12}>
              <h5>你是不是走錯地方惹...</h5>
              <img src={noresult} alt="沒有結果"></img>
            </Col>
          </>
        )
      } else {
        tp = (
          <>
            {tagSearchResult.length &&
              tagSearchResult.map((value, index) => {
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
    return tp
  }

  //-----------卡片搜尋結果欄
  function searchView(searchResult) {
    let op = ''
    // 先判別是否有輸入
    if (!keyword) {
      return ''
    } else {
      //再判別是否有結果
      if (searchResult.length == 0) {
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
        {/* <Row>{ptagid}</Row> */}
        <Row className="pro-search-cardsection">
          {PageTitle(ptagid, keyword)}
        </Row>
        <Row>
          <Window tagid={ptagid} winLink="pro" />
        </Row>
        <Row className="pro-search-cardsection">{tagView(tagSearchResult)}</Row>
        <Row className="pro-search-cardsection">{searchView(searchResult)}</Row>
      </Container>
    </>
  )
}
export default withRouter(ProductSearch)
