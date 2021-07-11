import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'

import {
  countries,
  townships,
  postcodes,
} from '../../data/townships'

function AddressBook(props) {
  const [usersaddress, setUsersaddress] = useState()
  const [displayMode, setDisplayMode] = useState()
  // // 取得該會員的地址信息
  // async function getUseraddress() {
  //   const token = localStorage.getItem('token')
  //   const url = 'http://localhost:4000/member/address/'

  //   // 注意header資料格式要設定，伺服器才知道是json格式
  //   const request = new Request(url, {
  //     method: 'GET',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'appliaction/json',
  //       Authorization: `Bearer ${token}`,
  //     }),
  //   })

  //   const response = await fetch(request)
  //   const data = await response.json()
  //   console.log(data)
  // }

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
          <div className="member-address-content d-flex">
            <div className="member-address-content-title">
              <p>城市</p>
              <p>區/鄉</p>
              <p>收件地址</p>
            </div>
            <div className="member-address-content-data">
              <p>{countries[0]}</p>
              <p>{townships[0][0]}</p>
              <p>{}</p>
            </div>
            <div className="member-address-content-button">
              <button>刪除</button>
              <br />
              <button>編輯</button>
            </div>
          </div>
          {/* {noaddressmode} */}
        </div>
      </div>
    </>
  )
}

export default withRouter(AddressBook)
