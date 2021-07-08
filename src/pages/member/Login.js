import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

function Login(props) {
  // 上層傳來的登入狀況
  const { auth, setAuth } = props
  // 子曾切換登入狀況
  const [loginAuth, setLoginAuth] = useState('')

  // 頁面input紀錄的資料
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 切換顯示項目(可能不使用)
  // const [signmode, setSignmode] = useState(false)
  // 下個導向的網站
  // 改成已登入就導向回首頁
  // const nextpage = <Redirect to="/signup" />

  // 檢查是否登入，已登入就送回首頁
  function checkLoggin() {
    if (!!sessionStorage.getItem('mId')) {
      return props.history.push('/')
    }
    return
  }
  checkLoggin()
  // 錯誤警告
  const [error, setError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  // 檢查是否已登入
  async function UserLogged() {
    if (!sessionStorage.getItem('mId')) {
      return
    }
    // 連接的伺服器資料網址
    const url = 'http://localhost:4000/member/checklogin'
    let mIddata = sessionStorage.getItem('mId')
    const request = new Request(url, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
  }
  // UserLogged()

  // 登入function
  function memberLogin() {
    let error = false
    let errorMessages = []

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

    sendLoginDataToServer(userData, () =>
      // 改成SWEETALTER
      alert('登入成功，即將回到首頁')
    )

    async function sendLoginDataToServer(
      userData,
      callback
    ) {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request(
        'http://localhost:4000/member/login',
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
      // console.log('response :', response)
      const data = await response.json()
      console.log(data)

      if (data.success === true) {
        // 登入成功這裡導向首頁
        console.log(data.message.text)
        sessionStorage.setItem(
          'mId',
          JSON.stringify(data.mId)
        )
        sessionStorage.setItem('email', data.email)

        // 子曾的登入狀況切換成true
        setLoginAuth(true)
      } else {
        // 帳號或密碼錯誤的錯誤處理
        console.log(data.message.text)
      }
      callback()
      return data
    }
    //直接在一段x秒關掉指示器
    setTimeout(() => {
      props.history.push('/')
    }, 500)
  }

  // 生命週期傳到Navbar
  useEffect(() => {
    setAuth(loginAuth)
  }, [loginAuth])

  return (
    <>
      <div className="mb-login-content">
        <div className="mb-login-background"></div>
        <div className="mb-login-form">
          <div className="mb-login-logo">
            <img src="./image/Member-logo.png" alt="logo" />
          </div>
          {/* {sessionStorage.getItem('mId')
            ? 'session存的ID : ' +
              sessionStorage.getItem('mId')
            : ''}
          <br />
          {sessionStorage.getItem('email')
            ? 'session存的email : ' +
              sessionStorage.getItem('email')
            : ''} */}
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
