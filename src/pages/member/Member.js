import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'

function Member(props) {
  // 上層傳來的登入狀況
  const { auth, setAuth } = props
  const [memberData, setMemberData] = useState(auth)
  const [money, setMoney] = useState('0')

  // 大頭貼預設路徑(前段)
  const avatarPath = 'http://localhost:4000/img/'

  // async function verifyMemberData() {
  //   const token = localStorage.getItem('token')

  //   fetch('http://localhost:4000/member/verifyMemberData', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((r) => r.json())
  //     .then((data) => {
  //       console.log(data.bearer)
  //       setMemberData({
  //         email: data.bearer.email,
  //         nickname: data.bearer.nickname,
  //         avatar: data.bearer.avatar,
  //       })
  //       console.log(memberData)
  //     })
  // }
  // // 生命週期套用效果
  // useEffect(() => {
  //   verifyMemberData()
  // }, [])
  // 設定資料
  // useEffect(() => {
  //   setAuth(memberData)
  // }, [memberData])

  function testMoney(params) {
    const token = localStorage.getItem('token')
    fetch('http://localhost:4000/member/testAddMoney', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })

    getAmountOfConsumption()
  }

  async function getAmountOfConsumption() {
    const token = localStorage.getItem('token')

    fetch('http://localhost:4000/member/getAmountOfConsumption', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        const moneyData = data.length > 0 ? data[0].money : '0'
        setMoney(moneyData)
      })
  }

  // 生命週期套用效果
  useEffect(() => {
    getAmountOfConsumption()
  }, [])

  return (
    <>
      <div className="mb-content mx-auto">
        {/* 側邊選單 */}
        <MbAside />

        <div className="mb-right-content mb-right-content-bcg">
          <div className="d-flex align-items-center mb-imformation-title">
            {/* 預設src */}
            <div className="mb-avatar-100 mx-5">
              <img
                src={
                  auth.avatar
                    ? avatarPath + auth.avatar
                    : './../images/avatar.png'
                }
                onClick={() => {
                  testMoney()
                }}
                alt="123"
              />
            </div>
            <h2>
              歡迎您，
              {auth.nickname ? auth.nickname : auth.email}
            </h2>
            {/* <button
              onClick={() => {
                console.log(auth.avatar)
              }}
            >
              auth
            </button>
            <button
              onClick={() => {
                console.log(memberData)
              }}
            >
              memberData
            </button> */}
          </div>
          <div className="d-flex mb-imformation-content align-items-center mb-5">
            <div className="mb-card">
              <img
                src={
                  money > 10000
                    ? '../images/member-card-silver.png'
                    : '../images/member-card-bronze.png'
                }
                alt="123"
              />
            </div>
            <div className="Member-level-content">
              <p>您的會員卡等級: {money > 10000 ? '銀牌' : '銅牌'}</p>
              <p>會員卡有效期限: 終身永久</p>
              <p>累計消費金額: NT$ {money}</p>
            </div>
          </div>
          <div className="d-flex pt-4">
            <div className="button">
              <img
                src="../images/button.png"
                alt="mbProfile"
                onClick={() => {
                  props.history.push('/member/profile')
                }}
              />
            </div>
            <div className="button">
              <img
                src="../images/button2.png"
                alt="cart"
                onClick={() => {
                  props.history.push('/cart')
                }}
              />
            </div>
            <div className="button">
              <img
                src="../images/button3.png"
                alt="cartorder"
                onClick={() => {
                  props.history.push('/cartorder')
                }}
              />
            </div>
            <div className="button">
              <img
                src="../images/button4.png"
                alt="coupon"
                onClick={() => {
                  props.history.push('/member/Coupon')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Member)
