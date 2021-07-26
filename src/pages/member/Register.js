import React, { useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import Swal from 'sweetalert2'
import LoginLeftBcg from '../../components/member/LoginLeftbcg'
function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [bcg, setBcg] = useState(
    'http://localhost:4000/img/bcg/loginBcg1.jpg'
  )
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  // 錯誤警告
  const [error, setError] = useState(false)

  // let strEmail = 'foxfirejack@gmail.com'

  // //Regular expression Testing
  // let emailRule =
  //   /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

  // //validate ok or not
  // function qwe() {
  //   if (strEmail.search(emailRule) != -1) {
  //     alert('true')
  //   } else {
  //     alert('false')
  //   }
  // }

  function memberRegister() {
    let error = false
    let errorMessages = []

    let emailRule =
      /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

    console.log(email.search(emailRule))
    // 要上email的正規表達式
    if (email.search(emailRule) === -1) {
      error = true
      errorMessages.push('請使用信箱註冊帳號')
    }
    // 要上email的正規表達式
    // if (email !== checkEmail) {
    //   error = true
    //   errorMessages.push('請使用信箱註冊')
    // }
    if (password !== password2) {
      error = true
      errorMessages.push('兩組密碼需一致哦')
    }
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
      errorAlert(errorMessages)
      return
    }

    const userData = {
      email,
      password,
    }
    console.log('頁面發送的資料', userData)

    sendRegisterDataToServer(userData)

    async function sendRegisterDataToServer(userData) {
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
      if (data.id) okAlter()
      props.history.push('/login')
    }
  }

  function okAlter() {
    Swal.fire({
      icon: 'success',
      title: '註冊成功!',
      text: '新人送優惠，趕緊登入查看!',
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

  let newBcg = ''
  autoChangbcg()
  function autoChangbcg() {
    setTimeout(() => {
      switch (bcg) {
        case 'http://localhost:4000/img/bcg/loginBcg1.jpg':
          newBcg =
            'http://localhost:4000/img/bcg/loginBcg2.jpg'
          setBcg(newBcg)
          break
        case 'http://localhost:4000/img/bcg/loginBcg2.jpg':
          newBcg =
            'http://localhost:4000/img/bcg/loginBcg3.jpg'
          setBcg(newBcg)
          break
        case 'http://localhost:4000/img/bcg/loginBcg3.jpg':
          newBcg =
            'http://localhost:4000/img/bcg/loginBcg4.jpg'
          setBcg(newBcg)
          break

        default:
          newBcg =
            'http://localhost:4000/img/bcg/loginBcg1.jpg'
          setBcg(newBcg)
          break
      }
    }, 2000)
  }
  autoChangbcg()
  return (
    <>
      <div className="mb-login-content">
        <LoginLeftBcg />
        <div className="mb-login-form">
          <div className="mb-login-logo">
            <img
              src="./images/Member-logo.png"
              alt="logo"
            />
          </div>
          <form
            method="POST"
            onClick={(e) => {
              e.preventDefault()
            }}
            className="text-center"
          >
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
              className="mb-login-input"
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
            <label> 確認密碼:</label>
            <input
              type={showPwd2 ? 'text' : 'password'}
              placeholder="請再次輸入登入密碼"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value)
              }}
              className="mb-login-input-again"
              required
            />
            <div className="mb-show-pwd">
              <img
                src={
                  showPwd2
                    ? './images/eye.png'
                    : './images/eye2.png'
                }
                alt="showPwd"
                onClick={() => {
                  setShowPwd2(!showPwd2)
                }}
              />
            </div>
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
          {/* <div className="mb-text-line py-3">或者使用社群帳號登入</div>
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

export default withRouter(Register)
