import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

function Logout(props) {
  // 上層傳來的登入狀況
  const { auth, setAuth } = props
  // 子曾切換登入狀況
  const [loginAuth, setLoginAuth] = useState({
    login: false,
    email: '',
    nickname: '',
    avatar: '',
  })

  async function UserLogout() {
    if (!localStorage.token) {
      return props.history.push('/')
    }
    // 連接的伺服器資料網址
    const url = 'http://localhost:4000/member/logout'

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    sessionStorage.clear()
    localStorage.clear()
    setAuth(loginAuth)

    props.history.push('/')
  }
  UserLogout()

  return (
    <>
      <h1>登出頁面</h1>
    </>
  )
}

export default withRouter(Logout)
