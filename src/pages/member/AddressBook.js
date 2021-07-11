import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'

import {
  countries,
  townships,
  postcodes,
} from '../../data/townships'

function AddressBook(props) {
  const [usersaddress, setUsersaddress] = useState([
    {
      country: '1',
      township: '1',
      naa: '1',
    },
  ])
  // const [resultData, setResultData] = useState()
  const [displayMode, setDisplayMode] = useState()

  // 取得該會員的所有地址信息
  async function getUseraddress() {
    const token = localStorage.getItem('token')
    const url = 'http://localhost:4000/member/addressbook/'

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
    console.log(data)
    if (data.length) setUsersaddress(data)
  }

  useEffect(() => {
    getUseraddress()
  }, [])

  // 無地址資料顯示這個
  const noAddressmode = (
    <>
      <div className="mb-addressBook-icon mx-auto ">
        <img
          src="../svg/addressBook-gray.svg"
          alt="addressBook"
        />
      </div>
      <h2 className="text-center">收件地址空空如也...</h2>
    </>
  )

  // 找到地址資料顯示這個
  const addressmode = usersaddress.map((v, i) => (
    <>
      <div className="d-flex mt-5 align-items-center">
        <div className="member-address-content-title">
          <p>城市</p>
          <p>區/鄉</p>
          <p>收件地址</p>
        </div>
        <div className="member-address-content-data ml-5">
          <p>{countries[usersaddress[i].country]}</p>
          <p>
            {
              townships[usersaddress[i].country][
                usersaddress[i].township
              ]
            }
          </p>
          <p>{usersaddress[i].naa}</p>
        </div>
        <div className="member-address-content-button ml-auto">
          <button
            className="mb-button mb-red-orange mb-address-button-margin d-block"
            onClick={() => {
              console.log(usersaddress[i].addressId)
            }}
          >
            刪除
          </button>
          <button className="mb-button mb-yellow d-block mt-2">
            編輯
          </button>
        </div>
      </div>
      <hr />
    </>
  ))

  return (
    <>
      <div className="d-flex mb-content mx-auto ">
        {/* 之後補做 */}
        <div>麵包屑</div>
        <MbAside />

        <div
          className="
        mb-right-content"
        >
          <div className="d-flex justify-content-between">
            <h2>我的收件地址</h2>
            <button
              className="mb-avatar-button mb-blue mt-auto mr-5"
              onClick={() => {
                props.history.push('/member/addressbookadd')
              }}
            >
              + 新增地址
            </button>
          </div>
          <hr />
          <div className="mb-address-content">
            {/* {noaddressmode} */}
            {addressmode}
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(AddressBook)
