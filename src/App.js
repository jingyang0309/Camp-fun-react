//套件
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

// 頁面元件
import Login from './pages/member/Login'
import Register from './pages/member/Register'
import Member from './pages/member/Member'
import MemberProfile from './pages/member/member-profile'

// Navbar跟Footer
import NavBar from './components/NavBar'
import Footer from './components/Footer'
// import MainContent from './components/MainContent'
import AdressBookAdd from './pages/member/AdressBookAdd'
import AdressBook from './pages/member/AdressBook'
import Coupon from './pages/member/Coupon'
import Session from './pages/member/Session'
import Logout from './pages/member/Logout'

function App() {
  const [loggin, setLoggin] = useState(false)
  return (
    <>
      <Router>
        {/* 上選單 */}
        <NavBar />
        <Switch>
          <Route path="/member/session">
            <Session
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/member/coupon">
            <AdressBookAdd
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/member/adressbookadd">
            <AdressBookAdd
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/member/adressbook">
            <AdressBook
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/member/coupon">
            <Coupon loggin={loggin} setLoggin={setLoggin} />
          </Route>
          <Route path="/member/profile">
            <MemberProfile
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/member">
            <Member loggin={loggin} setLoggin={setLoggin} />
          </Route>
          <Route path="/logout">
            <Logout loggin={loggin} setLoggin={setLoggin} />
          </Route>
          <Route path="/login">
            <Login loggin={loggin} setLoggin={setLoggin} />
          </Route>
          <Route path="/register">
            <Register
              loggin={loggin}
              setLoggin={setLoggin}
            />
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
