import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

import MbAside from '../../components/member/MbAside'

function EditPassword(props) {
  const { auth, setAuth } = props
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  const [showPwd3, setShowPwd3] = useState(false)

  const formRef = useRef(null)

  // 定義表單有哪些欄位屬性
  const [fields, setFields] = useState({
    password: '',
    newPassword: '',
    newPasswordAgain: '',
  })

  // 處理每個欄位的變動
  const handleFieldChange = (e) => {
    const updatedFields = {
      ...fields,
      [e.target.name]: e.target.value,
    }

    setFields(updatedFields)
  }

  // 處理表單送出，更新會員資料
  const handleSubmit = async () => {
    // FormData
    // const data = new FormData(e.target)
    const token = localStorage.getItem('token')

    const url = 'http://localhost:4000/member/editPassword'

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })

    console.log(JSON.stringify(fields))

    const response = await fetch(request)
    const reportData = await response.json()

    console.log('伺服器回傳的json資料', reportData)

    if (!reportData.email) {
      ErrorAlert()
    } else {
      okAlert()
      const newObj = {
        password: '',
        newPassword: '',
        newPasswordAgain: '',
      }
      setFields(newObj)
    }
  }

  function okAlert() {
    Swal.fire({
      icon: 'success',
      title: '修改成功',
      text: '下次請您使用新密碼登入',
      confirmButtonColor: '#ffbb00',
    })
  }

  function ErrorAlert(errorMessages) {
    Swal.fire({
      icon: 'error',
      title: '挖哩勒...',
      text: '輸入錯誤哦，再檢查一下',
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
          <h2>修改登入密碼</h2>
          <hr />
          {/* 表單開始 */}
          {/* <form
            name="mb-profile-form"
            ref={formRef}
            onSubmit={handleSubmit}
          > */}
          <div className="mb-input-box">
            <label>舊密碼</label>
            <input
              type={showPwd ? 'text' : 'password'}
              name="password"
              value={fields.password}
              onChange={handleFieldChange}
              placeholder="請輸入您的密碼"
              required
            />
            <div className="mb-show-pwd4">
              <img
                src={showPwd ? './../images/eye.png' : './../images/eye2.png'}
                alt="showPwd"
                onClick={() => {
                  setShowPwd(!showPwd)
                }}
              />
            </div>
          </div>
          <div className="mb-input-box">
            <label>新密碼</label>
            <input
              type={showPwd2 ? 'text' : 'password'}
              name="newPassword"
              value={fields.newPassword}
              onChange={handleFieldChange}
              placeholder="請輸入您的新密碼"
              required
            />
            <div className="mb-show-pwd4">
              <img
                src={showPwd2 ? './../images/eye.png' : './../images/eye2.png'}
                alt="showPwd"
                onClick={() => {
                  setShowPwd2(!showPwd2)
                }}
              />
            </div>
          </div>
          <div className="mb-input-box">
            <label>確認新密碼</label>
            <input
              type={showPwd3 ? 'text' : 'password'}
              name="newPasswordAgain"
              value={fields.newPasswordAgain}
              onChange={handleFieldChange}
              placeholder="請確認您的新密碼"
            />
            <div className="mb-show-pwd4">
              <img
                src={showPwd3 ? './../images/eye.png' : './../images/eye2.png'}
                alt="showPwd"
                onClick={() => {
                  setShowPwd3(!showPwd3)
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="my-5 mb-yellow mb-button"
            onClick={() => {
              handleSubmit()
            }}
          >
            確認修改
          </button>
          {/* </form> */}
        </div>
      </div>
    </>
  )
}

export default withRouter(EditPassword)
