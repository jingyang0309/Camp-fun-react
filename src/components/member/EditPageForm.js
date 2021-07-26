import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { countries, townships, postcodes } from '../../data/townships'
import Swal from 'sweetalert2'
function EditPageForm(props) {
  const { usersaddress, setModalShow, setUsersaddress } = props
  const [usersaddressEdit, setUusersaddressEdit] = useState(usersaddress)

  const [country, setCountry] = useState(usersaddress.country)
  const [township, setTownship] = useState(usersaddress.township)
  const [naa, setNaa] = useState(usersaddress.naa)
  const formRef = useRef(null)

  // 處理表單送出，更新地址
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
    okAlert()
    setModalShow(false)
    getUseraddress()
  }

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
    if (data.length) {
      let newData = data
      setUsersaddress(newData)
    }
  }

  function okAlert() {
    Swal.fire({
      icon: 'success',
      title: '修改完成',
      text: '您的資料已更新完成',
      confirmButtonColor: '#ffbb00',
    })
  }
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="mb-profile-edit-tittle">
          <h2>編輯收件地址</h2>
        </div>
        <Modal.Body>
          <div className="mb-address-edit-content">
            <form
              name="mb-profile-form"
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
              <div className="d-flex">
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
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="my-4 mb-yellow mb-button mr-3"
                    onClick={(e) => {
                      handleSubmit(e)
                    }}
                  >
                    確認修改
                  </button>
                  <button
                    className="my- mb-yellow mb-button mb-red-orange"
                    onClick={props.onHide}
                  >
                    放棄更改
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default withRouter(EditPageForm)
