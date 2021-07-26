// import { data } from 'jquery'
import React, { useState, useEffect, useRef } from 'react'
import { withRouter, Link, useParams } from 'react-router-dom'
import './ArticleList.scss'
import moment from 'moment'
import { BiRightArrowCircle } from 'react-icons/bi'
// import { BiChevronRight } from 'react-icons/bi'

function ArticleList(props) {
  const loadingRef = useRef(true)
  const [latest, setLatest] = useState([])
  const [tagName, setTagName] = useState([])
  const [topArticle, setTopArticle] = useState([56])
  const [tagFilter, setTagFilter] = useState([])
  const [tagId, setTagId] = useState([])
  const [cateTop, setCateTop] = useState([])
  const [cate, setCate] = useState([])
  const { aCategoryId } = useParams()

  // 取得最新3篇文章
  async function getLatestFromServer() {
    // 連接的伺服器資料網址
    const url = 'http://localhost:4000/articles/latest'
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('data 3 latest cards', data)
    // 設定資料
    setLatest(data)
  }

  // 取得最新8個標籤
  async function getLatestTagName() {
    // 連接的伺服器資料網址
    const url = 'http://localhost:4000/articles/tag'
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('data latest tag', data)
    // 設定資料
    setTagName(data.r)
  }

  // 取得置頂文章簡介
  async function getTopArticle() {
    // 連接的伺服器資料網址
    const url = 'http://localhost:4000/articles/a/56'
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('data top article', data)
    // 設定資料
    setTopArticle(data)
  }

  // 取得標籤搜尋所帶多篇文章
  async function getTagFilterFromServer() {
    // 連接的伺服器資料網址
    const url = `http://localhost:4000/articles/tags/${tagId}`
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('data tag filters', data)
    // 設定資料
    if (data) setTagFilter(data)
  }

  // 取得類別多篇文章
  async function getCategoryFromServer() {
    // 連接的伺服器資料網址
    const url = `http://localhost:4000/articles/cate/${aCategoryId}`
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('cate data', data)

    // 設定資料
    if (data) setCate(data)
  }

  // 取得5篇文章
  async function getTopCategoryFromServer() {
    // 連接的伺服器資料網址
    const url = `http://localhost:4000/articles/cate/top/2`
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const responseA = await fetch(request)
    const dataA = await responseA.json()

    const url1 = `http://localhost:4000/articles/cate/top/3`
    const requestB = new Request(url1, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const responseB = await fetch(requestB)
    const dataB = await responseB.json()

    const url2 = `http://localhost:4000/articles/cate/top/4`
    const requestC = new Request(url2, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const responseC = await fetch(requestC)
    const dataC = await responseC.json()
    const url3 = `http://localhost:4000/articles/cate/top/5`

    // 注意header資料格式要設定，伺服器才知道是json格式
    const requestD = new Request(url3, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const responseD = await fetch(requestD)
    const dataD = await responseD.json()
    // console.log('top cate data', dataA, dataB, dataC, dataD)
    loadingRef.current = false
    // 設定資料
    if ({ dataA, dataB, dataC, dataD })
      setCateTop({
        cateA: dataA,
        cateB: dataB,
        cateC: dataC,
        cateD: dataD,
      })
  }
  useEffect(() => {
    // getTopCategoryFromServer()
  }, [cateTop])

  useEffect(() => {
    getLatestFromServer()
    getLatestTagName()
    getTopArticle()
    getTagFilterFromServer()
    getCategoryFromServer()
    getTopCategoryFromServer()
  }, [])

  // 文章卡片for loop A
  let smallcardA = []
  if (!loadingRef.current) {
    for (let i = 1; i <= 4; i++) {
      smallcardA.push(
        <div className="articleCategory_SmallL mb-3 d-flex flex-column">
          <div className="articleCategory_SmallLImg">
            <img
              className="article_11_img"
              src={`../images/article/${cateTop?.cateA[i]?.aImg}`}
              alt="article_11"
            ></img>
          </div>
          <div className="articleCategorySmallText ml-2 mt-3 mb-3">
            <Link
              to={`/articles/a/${cateTop?.cateA[i]?.aId}`}
              className="articleCategoryTitle"
            >
              <h5>{cateTop?.cateA[i]?.aTitle}</h5>
            </Link>
            <span className="articleDate">
              {moment(cateTop?.cateA[i]?.aDate).format('YYYY-MM-DD')}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="articleAuthor">
              作者：{cateTop?.cateA[i]?.author}
            </span>
          </div>
        </div>
      )
    }
  }
  // 文章卡片for loop B
  let smallcardB = []
  if (!loadingRef.current) {
    for (let i = 1; i <= 4; i++) {
      smallcardB.push(
        <div className="articleCategory_SmallL mb-3 d-flex flex-column">
          <div className="articleCategory_SmallLImg">
            <img
              className="article_11_img"
              src={`../images/article/${cateTop?.cateB[i]?.aImg}`}
              alt="article_11"
            ></img>
          </div>
          <div className="articleCategorySmallText ml-2 mt-3 mb-3">
            <Link
              to={`/articles/a/${cateTop?.cateB[i]?.aId}`}
              className="articleCategoryTitle"
            >
              <h5>{cateTop?.cateB[i]?.aTitle}</h5>
            </Link>
            <span className="articleDate">
              {moment(cateTop?.cateB[i]?.aDate).format('YYYY-MM-DD')}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="articleAuthor">
              作者：{cateTop?.cateB[i]?.author}
            </span>
          </div>
        </div>
      )
    }
  }
  // 文章卡片for loop C
  let smallcardC = []
  if (!loadingRef.current) {
    for (let i = 1; i <= 4; i++) {
      smallcardC.push(
        <div className="articleCategory_SmallL mb-3 d-flex flex-column">
          <div className="articleCategory_SmallLImg">
            <img
              className="article_11_img"
              src={`../images/article/${cateTop?.cateC[i]?.aImg}`}
              alt="article_11"
            ></img>
          </div>
          <div className="articleCategorySmallText ml-2 mt-3 mb-3">
            <Link
              to={`/articles/a/${cateTop?.cateC[i]?.aId}`}
              className="articleCategoryTitle"
            >
              <h5>{cateTop?.cateC[i]?.aTitle}</h5>
            </Link>
            <span className="articleDate">
              {moment(cateTop?.cateC[i]?.aDate).format('YYYY-MM-DD')}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="articleAuthor">
              作者：{cateTop?.cateC[i]?.author}
            </span>
          </div>
        </div>
      )
    }
  }
  // 文章卡片for loop D
  let smallcardD = []
  if (!loadingRef.current) {
    for (let i = 1; i <= 4; i++) {
      smallcardD.push(
        <div className="articleCategory_SmallL mb-3 d-flex flex-column">
          <div className="articleCategory_SmallLImg">
            <img
              className="article_11_img"
              src={`../images/article/${cateTop?.cateD[i]?.aImg}`}
              alt="article_11"
            ></img>
          </div>
          <div className="articleCategorySmallText ml-2 mt-3 mb-3">
            <Link
              to={`/articles/a/${cateTop?.cateD[i]?.aId}`}
              className="articleCategoryTitle"
            >
              <h5>{cateTop?.cateD[i]?.aTitle}</h5>
            </Link>
            <span className="articleDate">
              {moment(cateTop?.cateD[i]?.aDate).format('YYYY-MM-DD')}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="articleAuthor">
              作者：{cateTop?.cateD[i]?.author}
            </span>
          </div>
        </div>
      )
    }
  }

  // ------
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="articleTitleGroup mt-3">
            <Link className="articleLogo" to="/articles/">
              <img
                src="../../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </Link>
            <Link className="articlePageTitle ml-2" to="/articles/">
              風格誌
            </Link>
          </div>
          <ul className="nav ml-auto articleCategoryBar mt-3">
            <li className="nav-item">
              <Link className="nav-link" to={'/articles/cate/2'}>
                露營新手指南
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/articles/cate/3">
                親子同遊露營
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/articles/cate/4">
                深度野營探索
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/articles/cate/5">
                奢華露營體驗
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ------------ featured -------------- */}

      <div className="container articleFeatured">
        <div className="row">
          <div className="articleFeaturedTitle mt-2 ml-5">FEATURED</div>
        </div>

        <div className="row rowFeatured">
          <div className="mainPicBoxRight">
            <img src="../images/article/article_01.jpg" alt="article_01" />
          </div>
          <div className="mainPicBoxLeft">
            <img src="../images/article/article_25.jpg" alt="article_02" />
          </div>
          <div className="card articleMainCard">
            <div className="card-body mx-auto">
              <h5 className="card-title my-3">{topArticle.aTitle}</h5>
              <span className="articleDate">
                {moment(topArticle.aDate).format('YYYY-MM-DD')}
              </span>
              &nbsp;&nbsp;&nbsp;
              <span className="articleAuthor">作者：{topArticle.author}</span>
              <div className="card-text mt-4">
                <p className="ellipsis">{topArticle.aContent}</p>
              </div>
              <Link
                onClick={() => {
                  setTopArticle(topArticle)
                }}
                to={'/articles/a/56'}
              >
                ＋看更多
              </Link>
            </div>
          </div>
        </div>
        <div className="aClear"></div>
      </div>

      {/* ------------ latest -------------- */}

      <div className="container articleLatest">
        <div className="row">
          <div className="articleLatestTitle mt-3 ml-5">LATEST</div>
        </div>

        <div className="row d-flex justify-content-around">
          {latest.length &&
            latest.map((value, index) => {
              return (
                <Link
                  key={value.id}
                  className="col-sm-4"
                  to={`/articles/a/${value.aId}`}
                >
                  <div className="articleLatestCard mx-auto mt-3">
                    <img
                      src={`../images/article/${value.aImg}`}
                      alt="article_03"
                      className="articleLatestLeftImg"
                    />

                    <div className="card-body d-flex align-items-start flex-column">
                      <h5 className="card-title">{value.aTitle}</h5>
                      <div className="articleCardArrow mb-auto">
                        <BiRightArrowCircle size="30px" color="#5e994a" />
                      </div>
                      <div className="card-text">
                        <p className="ellipsis mb-2">{value.aContent}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>

      {/* ------------ 標籤部分 -------------- */}

      <div className="container articleTag">
        <div className="row d-flex my-5">
          <div className="articleTitleGroup mt-3">
            <span className="articleLogo ">
              <img
                src="../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </span>
            {console.log(tagName)}
            <span className="articlePageTitle ml-2 mr-3">熱門主題</span>
          </div>
          {/*  */}
          {tagName.length &&
            tagName.map((value, index) => {
              return (
                <div key={value.id} className="articleTagGroup mt-2 d-flex">
                  <Link
                    className="nav-link artiTag pt-3"
                    onClick={() => {
                      setTagFilter(tagFilter)
                      setTagId(value.tagId)
                    }}
                    to={`/articles/tags/${value.tagId}`}
                  >
                    {value.tagName}
                  </Link>
                </div>
              )
            })}
        </div>
      </div>

      {/* ------------ 文章部分 1 -------------- */}

      <div className="container articleCategoryAll">
        <div className="row d-flex">
          <div className="articleTitleGroup mt-3">
            <span className="articleLogo">
              <img
                src="../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </span>
            <span className="articlePageTitle ml-2">露營新手指南</span>
          </div>
          <div className="articleMoreLinkMain mt-4 ml-auto mr-2">
            <Link to={'/articles/cate/2'}>
              看更多內容 <BiRightArrowCircle size="25px" />
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="articleCategoryMain1 d-flex ">
            <div className="articleCategory_Large mt-3 col-6">
              <div className="articleCategoryLargeImg">
                <img
                  src={`../images/article/${
                    !loadingRef.current && cateTop.cateA[0].aImg
                  }`}
                  alt="article_27"
                ></img>
              </div>
              <div className="articleCategoryLargeText ml-3 mt-3">
                <Link
                  to={`/articles/a/${
                    !loadingRef.current && cateTop.cateA[0].aId
                  }`}
                  className="articleCategoryTitle"
                >
                  <h5>{!loadingRef.current && cateTop.cateA[0].aTitle}</h5>
                </Link>
                <span className="articleDate">
                  {!loadingRef.current &&
                    moment(cateTop.cateA[0].aDate).format('YYYY-MM-DD')}
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="articleAuthor">
                  作者：{!loadingRef.current && cateTop?.cateA[0]?.author}
                </span>
                <p className="mt-3 ellipsis">
                  {!loadingRef.current && cateTop?.cateA[0]?.aContent}
                </p>
                <Link
                  to={`/articles/a/${
                    !loadingRef.current && cateTop.cateA[0].aId
                  }`}
                >
                  ＋看更多
                </Link>
              </div>
            </div>

            <div className="articleCategory_Small mx-2 mt-3 d-flex flex-wrap justify-content-between col-6">
              {!loadingRef.current && smallcardA}
            </div>
          </div>
        </div>
      </div>

      {/* ------------ 文章部分 2 -------------- */}

      <div className="container articleCategoryAll">
        <div className="row d-flex">
          <div className="articleTitleGroup mt-3">
            <span className="articleLogo">
              <img
                src="../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </span>
            <span className="articlePageTitle ml-2">親子同遊露營</span>
          </div>
          <div className="articleMoreLinkMain mt-4 ml-auto mr-2">
            <Link to={'/articles/cate/3'}>
              看更多內容 <BiRightArrowCircle size="25px" />
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="articleCategoryMain1 d-flex flex-row-reverse">
            <div className="articleCategory_Large mt-3 col-6">
              <div className="articleCategoryLargeImg">
                <img
                  src={`../images/article/${
                    !loadingRef.current && cateTop.cateB[0].aImg
                  }`}
                  alt="article_27"
                ></img>
              </div>
              <div className="articleCategoryLargeText ml-3 mt-3">
                <Link
                  to={`/articles/a/${
                    !loadingRef.current && cateTop.cateB[0].aId
                  }`}
                  className="articleCategoryTitle"
                >
                  <h5>{!loadingRef.current && cateTop.cateB[0].aTitle}</h5>
                </Link>
                <span className="articleDate">
                  {!loadingRef.current &&
                    moment(cateTop.cateB[0].aDate).format('YYYY-MM-DD')}
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="articleAuthor">
                  作者：{!loadingRef.current && cateTop.cateB[0].author}
                </span>
                <p className="mt-3 ellipsis">
                  {!loadingRef.current && cateTop.cateA[0].aContent}
                </p>
                <Link
                  to={`/articles/a/${
                    !loadingRef.current && cateTop.cateA[0].aId
                  }`}
                >
                  ＋看更多
                </Link>
              </div>
            </div>

            <div className="articleCategory_Small mx-2 mt-3 d-flex flex-wrap justify-content-between col-6">
              {!loadingRef.current && smallcardB}
            </div>
          </div>
        </div>
      </div>

      {/* ------------ 文章部分 3 -------------- */}

      <div className="container articleCategoryAll">
        <div className="row d-flex">
          <div className="articleTitleGroup mt-3">
            <span className="articleLogo">
              <img
                src="../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </span>
            <span className="articlePageTitle ml-2">深度野營探索</span>
          </div>
          <div className="articleMoreLinkMain mt-4 ml-auto mr-2">
            <Link to={'/articles/cate/4'}>
              看更多內容 <BiRightArrowCircle size="25px" />
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="articleCategoryMain1 d-flex ">
            <div className="articleCategory_Large mt-3 col-6">
              <div className="articleCategoryLargeImg">
                <img
                  src={`../images/article/${
                    !loadingRef.current && cateTop.cateC[0].aImg
                  }`}
                  alt="article_27"
                ></img>
              </div>
              <div className="articleCategoryLargeText ml-3 mt-3">
                <Link
                  to={`/articles/a/${
                    !loadingRef.current && cateTop.cateC[0].aId
                  }`}
                  className="articleCategoryTitle"
                >
                  <h5>{!loadingRef.current && cateTop.cateC[0].aTitle}</h5>
                </Link>
                <span className="articleDate">
                  {!loadingRef.current &&
                    moment(cateTop.cateC[0].aDate).format('YYYY-MM-DD')}
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="articleAuthor">
                  作者：{!loadingRef.current && cateTop.cateC[0].author}
                </span>
                <p className="mt-3 ellipsis">
                  {!loadingRef.current && cateTop.cateC[0].aContent}
                </p>
                <Link
                  to={`/articles/a/${
                    !loadingRef.current && cateTop.cateC[0].aId
                  }`}
                >
                  ＋看更多
                </Link>
              </div>
            </div>

            <div className="articleCategory_Small mx-2 mt-3 d-flex flex-wrap justify-content-between col-6">
              {!loadingRef.current && smallcardC}
            </div>
          </div>
        </div>
      </div>

      {/* ------------ 文章部分 4 -------------- */}

      <div className="container articleCategoryAll">
        <div className="row d-flex">
          <div className="articleTitleGroup mt-3">
            <span className="articleLogo">
              <img
                src="../images/article/campfun-logo.png"
                alt="campfun-logo"
              ></img>
            </span>
            <span className="articlePageTitle ml-2">奢華露營體驗</span>
          </div>
          <div className="articleMoreLinkMain mt-4 ml-auto mr-2">
            <Link to={'/articles/cate/5'}>
              看更多內容 <BiRightArrowCircle size="25px" />
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="articleCategoryMain1 d-flex flex-row-reverse">
            <div className="articleCategory_Large mt-3 col-6">
              <div className="articleCategoryLargeImg">
                <img
                  src={`../images/article/${
                    !loadingRef.current && cateTop.cateD[0].aImg
                  }`}
                  alt="article_27"
                ></img>
              </div>
              <div className="articleCategoryLargeText ml-3 mt-3">
                <Link
                  to={`/articles/a/${
                    !loadingRef.current && cateTop.cateD[0].aId
                  }`}
                  className="articleCategoryTitle"
                >
                  <h5>{!loadingRef.current && cateTop.cateD[0].aTitle}</h5>
                </Link>
                <span className="articleDate">
                  {!loadingRef.current &&
                    moment(cateTop.cateD[0].aDate).format('YYYY-MM-DD')}
                </span>
                &nbsp;&nbsp;&nbsp;
                <span className="articleAuthor">
                  作者：{!loadingRef.current && cateTop.cateD[0].author}
                </span>
                <p className="mt-3 ellipsis">
                  {!loadingRef.current && cateTop.cateD[0]?.aContent}
                </p>
                <Link
                  to={`/articles/a/${
                    !loadingRef.current && cateTop.cateD[0].aId
                  }`}
                >
                  ＋看更多
                </Link>
              </div>
            </div>

            <div className="articleCategory_Small mx-2 mt-3 d-flex flex-wrap justify-content-between col-6">
              {!loadingRef.current && smallcardD}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ArticleList)
