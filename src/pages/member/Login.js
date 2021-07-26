import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import LoginLeftBcg from '../../components/member/LoginLeftbcg'
import LosePassword from './LosePassword'

function Login(props) {
  // 上層傳來的登入狀況
  const { auth, setAuth } = props
  // 子曾切換登入狀況
  const [loginAuth, setLoginAuth] = useState(auth)
  const [showPwd, setShowPwd] = useState(false)

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
    if (!!localStorage.getItem('token')) {
      return props.history.push('/')
    }
    return
  }
  checkLoggin()
  // 錯誤警告
  const [error, setError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  // 登入function
  function memberLogin(e) {
    e.preventDefault()
    let error = false
    let errorMessages = []

    // 測試用兩個，正式發表須改為8個字
    if (email.length < 6) {
      error = true
      errorMessages.push('帳號至少要6個字')
    }
    if (password.length < 6) {
      error = true
      errorMessages.push('密碼至少要6個字')
    }
    if (error) {
      setError(error)
      setErrorMessages(errorMessages)
      errorAlert(errorMessages)
      // setTimeout(() => {
      //   setError(false)
      // }, 1500)
      return
    }

    const userData = {
      email,
      password,
    }
    console.log(userData)

    sendLoginDataToServer(userData)

    async function sendLoginDataToServer(userData) {
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
        // 加密資料存進localStorage
        localStorage.setItem('token', data.token)
        // 其他組員要求的sessionStorage(明碼)
        sessionStorage.setItem('mId', data.mId)
        // 子曾的登入狀況寫入資料
        setLoginAuth({
          login: true,
          email: data.information.email,
          nickname: data.information.nickname,
          avatar: data.information.avatar,
        })
        okAlert()
      } else {
        // 帳號或密碼錯誤的錯誤處理 放sweetalter
        console.log(data.message.text)
        passwordErrorAlert()
      }
    }
  }

  // 生命週期傳到Navbar
  useEffect(() => {
    setAuth(loginAuth)
  }, [loginAuth])

  function okAlert() {
    Swal.fire({
      icon: 'success',
      title: '登入成功',
      text: '歡迎您，已回到首頁',
      confirmButtonColor: '#ffbb00',
    })
  }

  function errorAlert(errorMessages) {
    Swal.fire({
      icon: 'error',
      title: '挖哩勒...',
      text: errorMessages,
      confirmButtonColor: '#ffbb00',
    })
  }
  function passwordErrorAlert(errorMessages) {
    Swal.fire({
      icon: 'error',
      title: '挖哩勒...',
      text: '請再次確認您輸入的帳號密碼',
      confirmButtonColor: '#ffbb00',
    })
  }
  return (
    <>
      <div className="mb-login-content">
        {/* 大圖 */}
        <LoginLeftBcg />
        <div className="mb-login-form">
          <div className="mb-login-logo">
            <img
              src="./images/Member-logo.png"
              alt="logo"
            />
          </div>
          <form className="text-center">
            <label htmlFor="email"> 帳號: </label>
            {/* 最後type要記得改成E-mail */}
            <input
              type="text"
              placeholder="請輸入您的電子信箱"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="mb-login-input"
              id="email"
            />
            <br />
            <label htmlFor="password"> 密碼:</label>
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="請輸入登入密碼"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="mb-login-input mb-login-input-pwd"
              id="password"
            />
            <div className="mb-show-pwd">
              <img
                src={
                  showPwd
                    ? './images/eye.png'
                    : './images/eye2.png'
                }
                alt="showPwd"
                onClick={() => {
                  setShowPwd(!showPwd)
                }}
              />
            </div>
            <br />
            <LosePassword />
            <button
              className="mb-button mb-brown mb-login-button mt-5"
              onClick={(e) => {
                memberLogin(e)
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
          {/* <div className="mb-text-line py-3 mx-auto">或者使用社群帳號登入</div>
          <div className="d-flex justify-content-center">
            <div className="mb-login-icon mr-5">
              <img src="./svg/facebook.svg" alt="facebook"></img>
            </div>
            <div className="mb-login-icon">
              <img src="./svg/instagram.svg" alt="instagram"></img>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default withRouter(Login)
