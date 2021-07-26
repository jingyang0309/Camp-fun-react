import React, { useState, Link, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import $ from 'jquery'

function CustomersServiceWindow(props) {
  const { auth, csSWindow, setCsSWindow, autoRefresh, setAutoRefresh } = props
  const [displayMsg, setDisplayMsg] = useState([
    {
      created_at: '',
      formWho: '',
      messageId: '',
      messsage: '',
      toWho: '',
    },
  ])
  const [usersMsg, setUsersMsg] = useState('')
  const [dataLoading, setDataLoading] = useState(false)

  const avatarPath = 'http://localhost:4000/img/'

  // 獲取全部對話內容
  async function getAllMessage() {
    // console.log('更新')
    const token = localStorage.getItem('token')
    const url = 'http://localhost:4000/member/getAllMessage'

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
        Authorization: `Bearer ${token}`,
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    setDisplayMsg(data)
    setDataLoading(true)

    // try {
    //   mbCsContentscroll.scrollBy(0, 9999)
    // } catch (ex) {
    //   console.log(ex)
    // }
  }

  useEffect(() => {
    let autoRefreshmsg = setInterval(() => {
      getAllMessage()
    }, 1000)
  }, [])

  // 對話視窗卷軸
  let mbCsContentscroll = window.document.getElementById('mbCsContentscroll')
  // 發送文字
  async function sendMessage() {
    if (usersMsg.length < 1) {
      return
    }

    const msgData = { message: usersMsg }
    const token = localStorage.getItem('token')

    const request = new Request('http://localhost:4000/member/sendMessage', {
      method: 'POST',
      body: JSON.stringify(msgData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await fetch(request)
    const data = await response.json()
    setUsersMsg('')
    getAllMessage()
  }

  // 尚未登入的畫面
  const noLoginMode = (
    <>
      <div className="pl-4">
        <img src="http://localhost:4000/img/flypig.png" alt="sorry" />
      </div>
      <p className="mt-3">
        聯繫客服需先登入會員，請
        <span
          onClick={() => {
            props.history.push('/login')
            setCsSWindow(false)
          }}
          style={{
            color: '#209920',
            cursor: 'pointer',
          }}
        >
          點擊此處
        </span>
        前往登入頁。
      </p>
    </>
  )

  // 登入後的對話畫面
  const authMode = displayMsg.map((v, i) =>
    displayMsg[i].fromWho === 'csStaff' ? (
      <>
        {/* 客服發送的訊息 */}
        <div className="mb-cs-cs">
          <div className="mb-cs-cs-avatar">
            <img src={avatarPath + 'flypig.png'} alt="cs-avatar" />
          </div>
          <div>
            <div className="mb-cs-cs-message">
              <p>{displayMsg[i].messsage}</p>
            </div>
            <p className="mb-cs-cs-time">
              {moment(displayMsg[i].created_at).format('YYYY-MM-DD')}
            </p>
          </div>
        </div>
      </>
    ) : (
      <>
        {/* 會員訊息 */}
        <div className="mb-cs-user">
          <div>
            <div className="mb-cs-user-message">
              <p>{displayMsg[i].messsage}</p>
            </div>
            <p className="mb-cs-user-time">
              {moment(displayMsg[i].created_at).format('MM-DD hh:mm')}
            </p>
          </div>
          <div className="mb-cs-user-avatar">
            <img
              src={
                auth.avatar
                  ? avatarPath + auth.avatar
                  : avatarPath + 'oringAvatar.png'
              }
              alt="cs-avatar"
            />
          </div>
        </div>
      </>
    )
  )

  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )
  return (
    <>
      <div className="mb-cs-window">
        <div className="mb-cs-title">
          <p className="text-center pt-3">在線客服-飛天豬排</p>
        </div>
        <div
          className="mb-cs-line"
          onClick={() => {
            setCsSWindow(!csSWindow)
          }}
        >
          <img src="http://localhost:4000/img/line.png" alt="line"></img>
        </div>
        <div className="mb-cs-content" id="mbCsContentscroll">
          {auth.login ? (dataLoading ? authMode : loading) : noLoginMode}
        </div>
        <div className="mb-cs-input-area d-flex">
          <input
            type="text"
            value={usersMsg}
            onChange={(e) => {
              setUsersMsg(e.target.value)
            }}
          />
          <div
            className="mb-cs-input-arrow"
            style={
              usersMsg.length ? { cursor: 'pointer' } : { cursor: 'default' }
            }
          >
            <img
              src={
                usersMsg.length
                  ? 'http://localhost:4000/img/messageArrow2.png'
                  : 'http://localhost:4000/img/messageArrow.png'
              }
              alt="messageArrow.png"
              onClick={() => {
                sendMessage()
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(CustomersServiceWindow)
