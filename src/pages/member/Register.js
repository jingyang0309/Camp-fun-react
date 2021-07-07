import React, { useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  // 切換顯示項目
  const [signmode, setSignmode] = useState(false)
  // 下個導向的網站
  // 改成已登入就導向回首頁
  const nextpage = <Redirect to="/signup" />

  // 錯誤警告
  const [error, setError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  function memberRegister() {
    let error = false
    let errorMessages = []
    if (password !== password2) {
      error = true
      errorMessages.push('兩組密碼需一致')
    }

    if (!email) {
      error = true
      errorMessages.push('帳號為必填欄位')
    }
    if (!password) {
      error = true
      errorMessages.push('密碼為必填欄位')
    }
    // 測試用兩個，正式發表須改為8個字
    if (email.length < 2) {
      error = true
      errorMessages.push('帳號至少要2個字')
    }
    if (password.length < 2) {
      error = true
      errorMessages.push('密碼至少要2個字')
    }

    if (error) {
      setError(error)
      setErrorMessages(errorMessages)
      return
    }

    const userData = {
      email,
      password,
    }
    console.log(userData)

    sendRegisterDataToServer(userData, () =>
      // 改成SWEETALTER
      alert('註冊成功，請重新登入')
    )

    async function sendRegisterDataToServer(
      userData
      // callback
    ) {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request(
        'http://localhost:4000/member/register',
        {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )

      const response = await fetch(request)
      console.log('response :', response)
      const data = await response.json()
      console.log(data)
      // callback()
      return data
    }
    setSignmode(true)
  }

  return (
    <>
      <div className="mb-login-content">
        <div className="mb-login-background"></div>
        <div className="mb-login-form">
          <div className="mb-login-logo">
            <img src="./image/Member-logo.png" alt="logo" />
          </div>
          <form
            method="POST"
            onClick={(e) => {
              e.preventDefault()
            }}
            className="text-center"
          >
            <label> 帳號: </label>
            {/* 最後type要記得改成E-mail */}
            <input
              type="text"
              placeholder="請輸入您的電子信箱"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="mb-login-input"
              required
            />
            <br />
            <label> 密碼:</label>
            <input
              type="password"
              placeholder="請輸入登入密碼"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="mb-login-input"
              required
            />
            <br />
            <label> 確認密碼:</label>
            <input
              type="password"
              placeholder="請再次輸入登入密碼"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value)
              }}
              className="mb-login-input"
              required
            />
            <br />
            {error ? (
              <>
                <div
                  className="alert alert-danger"
                  role="alert"
                >
                  {errorMessages.map((v, i) => (
                    <p key={i}>{v}</p>
                  ))}
                </div>
              </>
            ) : (
              ''
            )}
            <button
              className="mb-button mb-brown mb-login-button mt-5"
              onClick={() => {
                props.history.push('/login')
              }}
            >
              回上一頁
            </button>
            <button
              className="mb-button mb-yellow"
              onClick={() => {
                memberRegister()
              }}
            >
              確認註冊
            </button>
          </form>
          <div className="mb-text-line py-3">
            或者使用社群帳號登入
          </div>
          <div className="d-flex justify-content-center">
            <div className="mb-login-icon mr-5">
              <img
                src="./svg/facebook.svg"
                alt="facebook"
              ></img>
            </div>
            <div className="mb-login-icon">
              <img
                src="./svg/instagram.svg"
                alt="instagram"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Register)
