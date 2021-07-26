import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'

import MbAside from '../../components/member/MbAside'
import Avatar from '../../components/member/Avatar'

function MemberProfile(props) {
  const { auth, setAuth } = props
  const [loginAuth, setLoginAuth] = useState(auth)

  const formRef = useRef(null)

  // 定義表單有哪些欄位屬性
  const [fields, setFields] = useState({
    fName: '',
    lName: '',
    nickname: '',
    birthday: '',
    gender: '',
    phone: '',
    avatar: '',
  })

  // 處理每個欄位的變動
  const handleFieldChange = (e) => {
    const updatedFields = {
      ...fields,
      [e.target.name]: e.target.value,
    }

    setFields(updatedFields)
  }

  // 獲取會員資料
  async function getUserData() {
    const token = localStorage.getItem('token')
    const url = 'http://localhost:4000/member/userdata/'

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
    setFields({
      fName: data.fName,
      lName: data.lName,
      nickname: data.nickname,
      birthday: moment(data.birthday).format('YYYY-MM-DD'),
      gender: data.gender,
      phone: data.phone,
      avatar: data.avatar,
    })
  }

  // 生命週期套用效果
  useEffect(() => {
    getUserData()
  }, [])

  // 處理表單送出，更新會員資料
  const handleSubmit = async (e) => {
    // 阻擋表單送出預設行為
    e.preventDefault()

    // FormData
    // const data = new FormData(e.target)
    const token = localStorage.getItem('token')

    const url = 'http://localhost:4000/member/userdata/'

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(fields),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })

    console.log(JSON.stringify(fields))

    const response = await fetch(request)
    const dataPut = await response.json()

    console.log('伺服器回傳的json資料', dataPut)
    setLoginAuth({
      login: true,
      email: dataPut.email,
      nickname: dataPut.nickname,
      avatar: auth.avatar,
    })
    // 要等驗証過，再設定資料(簡單的直接設定)

    okAlert()
  }
  useEffect(() => {
    setAuth(loginAuth)
  }, [loginAuth])

  function okAlert() {
    Swal.fire({
      icon: 'success',
      title: '修改成功',
      text: '已將您的資料修改完成囉',
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
          <h2>會員基本資料</h2>
          <hr />
          <Avatar auth={auth} setAuth={setAuth} />
          {/* 表單開始 */}
          <form
            name="mb-profile-form"
            className="row"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="mb-input-box">
              <label htmlFor="fName">姓：</label>
              <input
                type="text"
                name="fName"
                value={fields.fName}
                onChange={handleFieldChange}
                placeholder="請輸入您的姓"
                title="自訂訊息：格式錯誤"
                id="fName"
              />
            </div>
            <div className="mb-input-box">
              <label htmlFor="text">名：</label>
              <input
                type="text"
                id="text"
                name="lName"
                value={fields.lName}
                onChange={handleFieldChange}
                placeholder="請輸入您的名"
              />
            </div>
            <div className="mb-input-box">
              <label htmlFor="nickname">暱稱</label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                value={fields.nickname}
                onChange={handleFieldChange}
                placeholder="請輸入您的暱稱"
              />
            </div>
            <div className="mb-input-box"></div>
            <div className="mb-input-box">
              <label htmlFor="birthday">生日：</label>
              <input
                id="birthday"
                type="date"
                value={fields.birthday}
                name="birthday"
                onChange={handleFieldChange}
              ></input>
            </div>
            <div className="mb-redio-box">
              <label>性別：</label>
              <br />
              <input
                id="men"
                type="radio"
                value="男"
                name="gender"
                checked={fields.gender === '男'}
                onChange={handleFieldChange}
              />
              <label htmlFor="men">男生</label>

              <input
                id="woman"
                type="radio"
                value="女"
                name="gender"
                checked={fields.gender === '女'}
                onChange={handleFieldChange}
              />
              <label htmlFor="woman">女生</label>
            </div>

            <div className="mb-input-box">
              <label htmlFor="phone">手機號碼：</label>
              <input
                id="phone"
                type="text"
                value={fields.phone}
                name="phone"
                onChange={handleFieldChange}
              />
            </div>
            <button
              type="submit"
              className=" mb-yellow mb-button mb-profile-buttom"
            >
              確認修改
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberProfile)
