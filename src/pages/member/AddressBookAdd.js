import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'

import {
  countries,
  townships,
  postcodes,
} from '../../data/townships'

function AddressBookadd(props) {
  // console.log(countries, townships, postcodes)
  // 記錄陣列的索引值，預設值是-1，相當於"請選擇xxx"
  const [country, setCountry] = useState(-1)
  const [township, setTownship] = useState(-1)
  const [naa, setNaa] = useState('')
  const formRef = useRef(null)

  // 定義表單有哪些欄位屬性
  // const [fields, setFields] = useState({
  //   country: 'country',
  //   township: '',
  //   naa: '',
  // })

  // useEffect(()=>{
  //   setFields({
  //     country: country,
  //   township: township,
  //   naa: naa,
  //   })
  // },[country],[township],[naa])
  // useEffect(()=>{
  //   setFields({
  //     country: country,
  //   township: township,
  //   naa: naa,
  //   })
  // },[township])
  // useEffect(()=>{
  //   setFields({
  //     country: country,
  //   township: township,
  //   naa: naa,
  //   })
  // },[naa])

  // 處理表單送出，更新會員資料
  const handleSubmit = async (e) => {
    // 阻擋表單送出預設行為
    e.preventDefault()

    // FormData
    // const data = new FormData(e.target)
    const token = localStorage.getItem('token')

    const url = 'http://localhost:4000/member/addressbook/'

    const userData = {
      country: country,
      township: township,
      naa: naa,
    }

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })

    console.log(JSON.stringify(userData))

    const response = await fetch(request)
    const dataPut = await response.json()

    console.log('伺服器回傳的json資料', dataPut)

    // 要等驗証過，再設定資料(簡單的直接設定)

    //直接在一段x秒關掉指示器
    // setTimeout(() => {
    //   alert('儲存完成')
    //   props.history.push('/member/')
    // }, 1000)
  }

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
                props.history.push('/member/addressBookAdd')
              }}
            >
              返回上一頁
            </button>
          </div>
          <hr />
          <p>新增地址</p>
          <form
            name="mb-profile-form"
            className="row"
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <select
              value={country}
              onChange={(e) => {
                setTownship(+e.target.value)
                // 將字串轉成數字
                setCountry(+e.target.value)
                // 重置township的值
                setTownship(-1)
              }}
            >
              <option value="-1">選擇縣市</option>
              {countries.map((value, index) => (
                <option key={index} value={index}>
                  {value}
                </option>
              ))}
            </select>
            <select
              value={township}
              onChange={(e) => {
                // 將字串轉成數字
                setTownship(+e.target.value)
              }}
            >
              <option value="-1">選擇區域</option>
              {country > -1 &&
                townships[country].map((value, index) => (
                  <option key={index} value={index}>
                    {value}
                  </option>
                ))}
            </select>
            {/* 如果country與township的索引值均大於-1時(也就是都有選的情況下)，呈現postcode */}
            {/* `條件 && 呈現` 是 `if(條件){呈現}` 的簡寫法，只在React JSX中可以使用 */}

            <br />
            <div className="mb-input-box">
              <label>地址</label>
              <input
                type="text"
                name="naa"
                value={naa}
                onChange={(e) => {
                  setNaa(e.target.value)
                }}
                placeholder="請輸入您的詳細地址"
              />
            </div>
            <button
              type="submit"
              className="my-5 mb-yellow mb-button"
              onClick={(e) => {
                handleSubmit(e)
              }}
            >
              確認修改
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default withRouter(AddressBookadd)
