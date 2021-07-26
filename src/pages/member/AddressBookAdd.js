import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'
import Swal from 'sweetalert2'

import { countries, townships, postcodes } from '../../json/townships'

function AddressBookadd(props) {
  // console.log(countries, townships, postcodes)
  // 記錄陣列的索引值，預設值是-1，相當於"請選擇xxx"
  const [country, setCountry] = useState(-1)
  const [township, setTownship] = useState(-1)
  const [naa, setNaa] = useState('')
  const formRef = useRef(null)

  // 處理表單送出，更新會員資料
  const handleSubmit = async (e) => {
    // 阻擋表單送出預設行為
    e.preventDefault()

    if (country < 0) {
      passwordErrorAlert()
      return
    }
    if (township < 0) {
      passwordErrorAlert()
      return
    }
    if (!naa) {
      passwordErrorAlert()
      return
    }
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
    okAlert()
    props.history.push('/member/addressbook')
    //直接在一段x秒關掉指示器
    // setTimeout(() => {
    //   alert('儲存完成')
    //   props.history.push('/member/')
    // }, 1000)
  }

  function okAlert() {
    Swal.fire({
      icon: 'success',
      title: '新增成功',
      text: '您的地址已經新增完成',
      confirmButtonColor: '#ffbb00',
    })
  }

  function passwordErrorAlert(errorMessages) {
    Swal.fire({
      icon: 'error',
      title: '挖哩勒...',
      text: '請確認下您填寫的地址哦',
      confirmButtonColor: '#ffbb00',
    })
  }
  return (
    <>
      <div className="d-flex mb-content mx-auto ">
        <MbAside />

        <div
          className="
        mb-right-content"
        >
          <div className="d-flex justify-content-between">
            <h2>我的收件地址</h2>
            <button
              className="mb-avatar-button mb-brown mt-auto mr-5"
              onClick={() => {
                props.history.goBack()
              }}
            >
              返回上一頁
            </button>
          </div>
          <hr />
          <form
            name="mb-profile-form d-flex justify-items-center"
            // className="row"
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="d-flex mt-5">
              <div>
                <label>城市</label>
                <br />
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
              </div>
              <div className="ml-4">
                <label>區/鄉</label>
                <br />
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
              </div>
            </div>
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
            <div>
              <button
                type="submit"
                className="my-5 mb-yellow mb-button"
                onClick={(e) => {
                  handleSubmit(e)
                }}
              >
                確認修改
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withRouter(AddressBookadd)
