import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function memberLogin() {
    const newData = { email, password }

    // 連接網址
    const url = 'http://localhost:4000/member/login'

    // fetch上傳資料
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    console.log(newData)
    console.log(JSON.stringify(newData))

    const response = await fetch(request)
    const data = await response.json()

    console.log('伺服器回傳的json資料', data)
    // 要等驗証過，再設定資料(簡單的直接設定)

    //直接在一段x秒關掉指示器
    // setTimeout(() => {
    //   props.history.push('/menber')
    // }, 500)
  }

  return (
    <>
      <div className="mb-login-content">
        <div className="mb-login-background"></div>
        <div className="mb-login-form">
          <div className="mb-login-logo">
            <img src="./image/menber-logo.png" alt="logo" />
          </div>
          <form
            action="./"
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
            />
            <br />
            <button
              className="mb-button mb-brown mb-login-button mt-5"
              onClick={() => {
                memberLogin()
              }}
            >
              登入
            </button>
            <button
              className="mb-button mb-yellow"
              onClick={() => {
                props.history.push('/register')
              }}
            >
              註冊
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

export default withRouter(Login)
