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
import AdressBookAdd from './pages/member/AdressBookAdd'
import AdressBook from './pages/member/AdressBook'
import Coupon from './pages/member/Coupon'
import Session from './pages/member/Session'
import Logout from './pages/member/Logout'
// 首頁+商品
import Index from './pages/Index'
import Product from './pages/Product'

// 測試區之後可刪除
// import Avatar from './pages/member/Avatar'

function App() {
  const [auth, setAuth] = useState(false)
  const [avatar, setAvatar] = useState(false)

  return (
    <>
      <Router>
        {/* 上選單 */}
        <NavBar
          auth={auth}
          setAuth={setAuth}
          avatar={avatar}
          setAvatar={setAvatar}
        />
        <Switch>
          {/* 會員中心 */}
          <Route path="/member/session">
            <Session auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/coupon">
            <Coupon auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/adressbookadd">
            <AdressBookAdd auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/adressbook">
            <AdressBook auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/coupon">
            <Coupon auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member/profile/">
            <MemberProfile auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/member">
            <Member auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/logout">
            <Logout auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/login">
            <Login auth={auth} setAuth={setAuth} />
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
            <Index />
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
