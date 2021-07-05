//套件
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

// 頁面元件
import Login from './Pages/Menber/Login'
import Register from './Pages/Menber/Register'
import Menber from './Pages/Menber/Menber'
import MenberProfile from './Pages/Menber/Menber-profile'

// Navbar跟Footer
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
// import MainContent from './components/MainContent'
import AdressBookAdd from './Pages/Menber/AdressBookAdd'
import AdressBook from './Pages/Menber/AdressBook'
import Coupon from './Pages/Menber/Coupon'
import Session from './Pages/Menber/Session'

function App() {
  const [loggin, setLoggin] = useState(false)
  return (
    <>
      <Router>
        {/* 上選單 */}
        <MyNavbar />
        <Switch>
          <Route path="/menber/sesson">
            <Session
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/menber/coupon">
            <AdressBookAdd
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/menber/adressbookadd">
            <AdressBookAdd
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/menber/adressbook">
            <AdressBook
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/menber/coupon">
            <Coupon loggin={loggin} setLoggin={setLoggin} />
          </Route>
          <Route path="/menber/profile">
            <MenberProfile
              loggin={loggin}
              setLoggin={setLoggin}
            />
          </Route>
          <Route path="/menber">
            <Menber loggin={loggin} setLoggin={setLoggin} />
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
        <MyFooter />
      </Router>
    </>
  )
}

export default App
