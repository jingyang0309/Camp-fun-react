import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import MbAside from '../../components/member/MbAside'

// 匯入元件
import Avatar from '../../components/member/Avatar'

function EditPassword(props) {
  const { auth, setAuth } = props
  const [loginAuth, setLoginAuth] = useState(auth)

  const formRef = useRef(null)

  // 定義表單有哪些欄位屬性
  const [fields, setFields] = useState({
    password: '',
    newPassword: '',
    newPasswordAgain: '',
  })

  // 處理每個欄位的變動
  const handleFieldChange = (e) => {
    // console.log(
    //   '訊息',
    //   e.target.name,
    //   e.target.type,
    //   e.target.value,
    //   e.target.checked
    // )

    // 更新輸入欄位
    const updatedFields = {
      ...fields,
      [e.target.name]: e.target.value,
    }

    setFields(updatedFields)
  }

  // 處理表單送出，更新會員資料
  const handleSubmit = async (e) => {
    // 阻擋表單送出預設行為
    e.preventDefault()

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
          <h2>修改登入密碼</h2>
          <hr />
          {/* 表單開始 */}
          <form
            name="mb-profile-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="mb-input-box">
              <label>舊密碼</label>
              <input
                type="text"
                name="password"
                value={fields.password}
                onChange={handleFieldChange}
                placeholder="請輸入您的密碼"
                required
              />
            </div>
            <div className="mb-input-box">
              <label>新密碼</label>
              <input
                type="text"
                name="newPassword"
                value={fields.newPassword}
                onChange={handleFieldChange}
                placeholder="請輸入您的新密碼"
                required
              />
            </div>
            <div className="mb-input-box">
              <label>確認新密碼</label>
              <input
                type="text"
                name="newPasswordAgain"
                value={fields.newPasswordAgain}
                onChange={handleFieldChange}
                value={fields.nickname}
                placeholder="請確認您的新密碼"
              />
            </div>

            <button
              type="submit"
              className="my-5 mb-yellow mb-button"
            >
              確認修改
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default withRouter(EditPassword)
