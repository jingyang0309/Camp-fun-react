import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import {
  countries,
  townships,
  postcodes,
} from '../../data/townships'

function MyVerticallyCenteredModal(props) {
  const { usersaddress } = props
  const [usersaddressEdit, setUusersaddressEdit] =
    useState(usersaddress)

  const [country, setCountry] = useState(
    usersaddress.country
  )
  const [township, setTownship] = useState(
    usersaddress.township
  )
  const [naa, setNaa] = useState(usersaddress.naa)
  const formRef = useRef(null)

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
      addressId: usersaddressEdit.addressId,
    }

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'PUT',
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
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div>
          <h2>編輯收件地址</h2>
        </div>
        <Modal.Body>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="my-5 mb-yellow mb-button"
            onClick={(e) => {
              console.log(usersaddressEdit)
            }}
          >
            console.log(usersaddress)
          </button>
          <button
            type="submit"
            className="my-5 mb-yellow mb-button"
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            確認修改
          </button>
          <button
            type="submit"
            className="my-5 mb-yellow mb-button"
            onClick={props.onHide}
          >
            放棄更改
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MyVerticallyCenteredModal
