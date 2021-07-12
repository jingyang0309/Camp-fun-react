//套件
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

// Navbar跟Footer
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// 頁面元件
// 會員中心
import Login from './pages/member/Login'
import Register from './pages/member/Register'
import Member from './pages/member/Member'
import MemberProfile from './pages/member/MemberProfile'
import AddressBookAdd from './pages/member/AddressBookAdd'
import AddressBook from './pages/member/AddressBook'
import Coupon from './pages/member/Coupon'
import Session from './pages/member/Session'
import Logout from './pages/member/Logout'
// 首頁+商品
import Index from './pages/Index'
import Product from './pages/Product'

// 測試區之後可刪除
// import Avatar from './pages/member/Avatar'

function App() {
  const [auth, setAuth] = useState({
    login: false,
    email: '',
    nickname: '',
    avatar: '',
  })
  const [userEmail, setUserEmail] = useState('')
  const [userNickname, setUserNickname] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  return (
    <>
      <Router>
        {/* 上選單 */}
        <NavBar auth={auth} setAuth={setAuth} />
        <Switch>
          {/* 會員中心 */}
          <Route path="/member/session">
            <Session auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/coupon">
            <Coupon auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/addressbookadd">
            <AddressBookAdd auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/addressbook">
            <AddressBook auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/coupon">
            <Coupon auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/profile">
            <MemberProfile auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member">
            <Member auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/logout">
            <Logout auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/login">
            <Login
              auth={auth}
              setAuth={setAuth}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
              userNickname={userNickname}
              setUserNickname={setUserNickname}
            />
          </Route>
          <Route path="/register">
            <Register auth={auth} setAuth={setAuth} />
          </Route>
          {/* 商品 */}
          <Route exact path="/product">
            <Product />
          </Route>
          {/* 首頁 */}
          <Route exact path="/">
            <Index auth={auth} setAuth={setAuth} />
          </Route>
        </Switch>
        {/* 頁尾 */}
        {/* <h1>這是min版footer</h1>
        <Footer ver="min" /> */}
        <Footer ver="full" />
      </Router>
    </>
  )
}

export default App
