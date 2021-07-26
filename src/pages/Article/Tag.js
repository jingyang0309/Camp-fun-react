// import { data } from 'jquery'
import React, { useState, useEffect } from 'react'
import { withRouter, Link, useParams } from 'react-router-dom'
import './ArticleList.scss'
import { BiChevronRight } from 'react-icons/bi'
import { BiRightArrowCircle } from 'react-icons/bi'
import moment from 'moment'
import Window from '../../components/Window'

function Tag(props) {
  const { tagId } = useParams()
  const [tagFilter, setTagFilter] = useState([])
  const [tagName, setTagName] = useState([])

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
    console.log('data', data)
    // 設定資料
    setTagFilter(data)
  }

  async function getTagNameFromServer() {
    // 連接的伺服器資料網址
    const url = `http://localhost:4000/articles/tag/name/${tagId}`
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
    console.log('get tag name data', data)
    // 設定資料
    setTagName(data)
  }

  // 一開始就會開始載入資料
  useEffect(() => {
    getTagFilterFromServer()
    getTagNameFromServer()
  }, [])

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
              風格誌 <BiChevronRight />
            </Link>
            <span className="articleBreadCrumb ml-2">
              {tagName.tagName}
              {/* {tagName.tagId} */}
            </span>
          </div>

          <div className="articleBackToList ml-auto mt-3">
            <Link
              className="nav-link"
              onClick={() => {
                props.history.goBack()
              }}
            >
              返回一覽列表 <BiRightArrowCircle size="25px" />
            </Link>
          </div>
        </div>
      </div>
      {/* <row> */}
      {/* {console.log('Hi tagid = ', tagId)}
          {console.log('Hi tagname.tagid = ', tagName.tagId)}
          {console.log('Hi parseint = ', typeof parseInt(tagName.tagId))} */}
      <Window style={{ width: '1000px' }} tagid={+tagId} winLink="art" />
      {/* <Window tagid={45} /> */}
      {/* </row> */}

      <div className="container">
        <div className="row d-flex">
          {tagFilter.length &&
            tagFilter.map((value, index) => {
              return (
                <div key={value.id} className="articleCategoryFilter mt-3 mx-3">
                  <div className="articleCategoryFilterImg">
                    <img
                      src={`../../images/article/${value.aImg}`}
                      alt="article_27"
                    ></img>
                  </div>
                  <div className="articleCategoryFilterText ml-3 mt-3">
                    <Link
                      to={`/articles/a/${value.aId}`}
                      className="articleCategoryTitle mb-3"
                    >
                      <h5>{value.aTitle}</h5>
                    </Link>
                    <span className="articleDate">
                      {moment(value.aDate).format('YYYY-MM-DD')}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="articleAuthor">{value.author}</span>
                    <div className="card-text">
                      <p className="ellipsis mt-3 mb-1">{value.aContent}</p>
                      <Link to={`/articles/a/${value.aId}`}>＋看更多</Link>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default withRouter(Tag)
