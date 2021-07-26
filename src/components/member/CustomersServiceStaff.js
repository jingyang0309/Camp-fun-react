import React, { useState, Link, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import $ from 'jquery'

function CustomersServiceStaff(props) {
  const [displayMsg, setDisplayMsg] = useState([
    {
      created_at: '',
      fromWho: '',
      messageId: '',
      messsage: '',
      toWho: '',
    },
  ])
  const [staffMsg, setStaffMsg] = useState('')
  const [asideListData, setAsideListData] = useState([
    {
      fromWho: '',
    },
  ])

  const avatarPath = 'http://localhost:4000/img/'
  const [memberAvatar, setMemberAvatar] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [beginTalk ,setBeginTalk] = useState(false)

  // 獲取該會員對話內容
  async function getThisMemberMessage(email) {
    const url = 'http://localhost:4000/member/getThisMemberMessage/' + email

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
    setDisplayMsg(data)

    const url2 = 'http://localhost:4000/member/staffGetMemberdata/' + email

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request2 = new Request(url2, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response2 = await fetch(request2)
    const data2 = await response2.json()
    console.log(data2)
    setMemberAvatar(data2.avatar)
    setMemberEmail(data2.email)
    setBeginTalk(true)
    try {
      mbCsStaffContentscroll.scroll(0, 9999999)
    } catch (ex) {
      console.log(ex)
    }

    setTimeout(() => {
      getThisMemberMessage(email)
    }, 1000)
  }

  // useEffect(() => {
  //   let autoRefreshmsg = setInterval(() => {
  //     getThisMemberMessage(refreshId)
  //   }, 1000)
  // }, [])

  // 卷軸視窗ID
  let mbCsStaffContentscroll = window.document.getElementById(
    'mbCsStaffContentscroll'
  )

  // 發送文字
  async function sendMessage(memberEmail) {
    if (staffMsg.length < 1) {
      return
    }

    const msgData = { message: staffMsg, email: memberEmail }

    const request = new Request(
      'http://localhost:4000/member/staffSendMessage',
      {
        method: 'POST',
        body: JSON.stringify(msgData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )

    const response = await fetch(request)
    const data = await response.json()
    // console.log(data)
    setStaffMsg('')
    getThisMemberMessage(memberEmail)
    try {
      mbCsStaffContentscroll.scroll(0, 9999999)
    } catch (ex) {
      console.log(ex)
    }
  }

  // 對話內容元件
  const authMode = displayMsg.map((v, i) =>
    displayMsg[i].fromWho === 'csStaff' ? (
      <>
        {/* 客服訊息 */}
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
            <img src={avatarPath + 'flypig.png'} alt="cs-avatar" />
          </div>
        </div>
      </>
    ) : (
      <>
        {/* 會員發送的訊息 */}
        <div className="mb-cs-cs">
          <div className="mb-cs-cs-avatar">
            <img
              src={
                memberAvatar
                  ? avatarPath + memberAvatar
                  : avatarPath + 'oringAvatar.png'
              }
              alt="cs-avatar"
            />
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
    )
  )

  // 獲取側邊清單資料
  async function getList() {
    const token = localStorage.getItem('token')
    const url = 'http://localhost:4000/member/staffgetlist'

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
    setAsideListData(data)
    setTimeout(() => {
      getList()
    }, 1000)
  }

  useEffect(() => {
    getList()
  }, [])

  // 側邊選單元件
  const asideList = asideListData.map((v, i) =>
    asideListData[i].fromWho === 'csStaff' ? (
      ''
    ) : (
      <>
        <li className="">
          <div
            className="mb-cs-aside-list"
            onClick={() => {
              getThisMemberMessage(asideListData[i].fromWho)
            }}
          ><p>{asideListData[i].fromWho}</p>
          </div>
        </li>
      </>
    )
  )

  return (
    <>
      <div className="mb-cs-staff-window">
        <div className="mb-cs-aside">
          <ul className="mb-list-no-style">{asideList}</ul>
        </div>
        <div>
          <div className="mb-cs-staff-title">
            <p className="text-center pt-3">
              {memberEmail ? '對話中-' + memberEmail : '在線客服-尚未連線'}
            </p>
          </div>
          <div className="mb-cs-content" id="mbCsStaffContentscroll">
            {beginTalk?authMode: ''}
          </div>
          <div className="mb-cs-input-area d-flex">
            <input
              type="text"
              value={staffMsg}
              onChange={(e) => {
                setStaffMsg(e.target.value)
              }}
            />
            <div
              className="mb-cs-input-arrow"
              style={
                staffMsg.length ? { cursor: 'pointer' } : { cursor: 'default' }
              }
            >
              <img
                src={
                  staffMsg.length
                    ? 'http://localhost:4000/img/messageArrow2.png'
                    : 'http://localhost:4000/img/messageArrow.png'
                }
                alt="messageArrow.png"
                onClick={() => {
                  sendMessage(memberEmail)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(CustomersServiceStaff)
