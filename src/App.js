import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import moment from 'moment'
import ScrollToTop from './components/ScrollToTop'
//載入全站共用頁面
import NavBar from './components/NavBar.js'
import SrNavBar from './components/SrNavBar.js'
import Footer from './components/Footer.js'
import Index from './pages/Index'
import MainContent from './components/MainContent'
import Searchbar from './components/Searchbar'

// 載入商品頁面
import Product from './pages/Product'
import ProductData from './pages/ProductData.js'
import ProductSearch from './pages/ProductSearch.js'
import ProductCat from './pages/ProductCat'

//載入購物車頁面
import Cart from './pages/cart/Cart'
import CartInfo from './pages/cart/CartInfo'
import CartDetail from './pages/cart/CartDetail'
import CartOrder from './pages/cart/CartOrder'
import CartCheck from './pages/cart/CartCheck'
import CartCheckOrder from './pages/cart/CartCheckOrder'

//載入風格誌頁面
import ArticleList from './pages/Article/ArticleList'
import Category from './pages/Article/Category'
import Tag from './pages/Article/Tag'
import ArticlePost from './pages/Article/ArticlePost'
//載入找場地頁面
import Pickplace from './pages/Pickplace/Pickplace.js'

//載入會員頁面
import Login from './pages/member/Login'
import Register from './pages/member/Register'
import Member from './pages/member/Member'
import MemberProfile from './pages/member/MemberProfile'
import AddressBookAdd from './pages/member/AddressBookAdd'
import AddressBook from './pages/member/AddressBook'
import Coupon from './pages/member/Coupon'
import Logout from './pages/member/Logout'
import EditPassword from './pages/member/EditPassword'
import CustomerService from './components/member/CustomerService'
import CustomersServiceStaff from './components/member/CustomersServiceStaff'

//主要程式開始
function App() {
  //會員資料儲存
  const [auth, setAuth] = useState({
    login: false,
    email: '',
    nickname: '',
    avatar: '',
  })
  //購物車儲存SESSION
  const [getSession, setGetSession] = useState('')
  //進站時立即檢查購物車SESSION
  const sessionServer = async () => {
    const url = `http://localhost:4000/cart`
    const request = new Request(url, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setGetSession(data)
  }
  //一進入頁面就讀取購物車內有無東西
  useEffect(() => {
    sessionServer()
  }, [])
  //抓取營地的session
  const [placeCart, setPlaceCart] = useState([])
  const placeToCart = () => {
    if (localStorage.getItem('placeCart') !== placeCart) {
      setPlaceCart(JSON.parse(localStorage.getItem('placeCart')))
    }
  }
  useEffect(() => {
    placeToCart()
  }, [])
  //設定基本日期

  const StartDay = moment().add(1, 'days').format('YYYY-MM-DD')
  const EndDay = moment(StartDay).add(1, 'days').format('YYYY-MM-DD')
  const [startTime, setStartTime] = useState(StartDay)
  const [endTime, setEndTime] = useState(EndDay)
  // 設定搜尋handle
  const [searchKey, setSearchKey] = useState('')
  function handleSearch(keyword) {
    const pattern =
      /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？]/g
    setSearchKey(keyword.replace(pattern, ''))
  }
  const Navstate = {
    getSession: getSession,
    setGetSession: setGetSession,
    auth: auth,
    setAuth: setAuth,
  }
  const Searchbarstate = {
    startTime: startTime,
    endTime: endTime,
    setstart: setStartTime,
    setend: setEndTime,
    today: StartDay,
    nextday: EndDay,
    searchKey: searchKey,
    setSearchKey: handleSearch,
    sessionServer: sessionServer,
  }
  return (
    <Router>
      {/* Route部分請由此往下增加 */}
      <ScrollToTop>
        {/* 門市線下系統起始 */}
        <Switch>
          <Route path="/cartcheck">
            <CartCheck /> {/*實際頁面*/}
            <Footer ver="min" />
          </Route>
          <Route path="/cartcheckorder">
            <MainContent>
              <CartCheckOrder /> {/*實際頁面*/}
            </MainContent>
            <Footer ver="min" />
          </Route>
        </Switch>
        {/* 線下系統結束 */}
        <CustomerService auth={auth} setAuth={setAuth} />
        <NavBar {...Navstate} />
        <Switch>
          {/* 購物車單元 */}

          <Route path="/cartorder">
            <MainContent>
              <CartOrder /> {/*實際頁面*/}
            </MainContent>
            <Footer ver="full" />
          </Route>
          <Route path="/cartdetail">
            <MainContent>
              <CartDetail /> {/*實際頁面*/}
            </MainContent>
            <Footer ver="full" />
          </Route>
          <Route path="/cartinfo">
            <MainContent>
              <CartInfo />
            </MainContent>
            <Footer ver="full" />
          </Route>
          <Route path="/cart">
            <MainContent>
              <Cart
                placeToCart={placeToCart}
                placeCart={placeCart}
                setPlaceCart={setPlaceCart}
                startTime={startTime}
                endTime={endTime}
                getSession={getSession}
                setGetSession={setGetSession}
                sessionServer={sessionServer}
              />
            </MainContent>
            <Footer ver="full" />
          </Route>
          {/* </MainContent> */}
          {/* 風格誌單元 */}
          <Route path="/articles/tags/:tagId">
            <Tag />
            <Footer ver="full" />
          </Route>

          <Route exact path="/articles/cate/:aCategoryId?">
            <Category />
            <Footer ver="full" />
          </Route>

          <Route exact path="/articles/a/:aId?">
            <ArticlePost auth={auth} />
            <Footer ver="full" />
          </Route>

          <Route exact path="/articles/tag">
            <Tag />
            <Footer ver="full" />
          </Route>

          <Route exact path="/articles/">
            <ArticleList />
            <Footer ver="full" />
          </Route>
          {/* 找場地單元 */}
          <Route exact path="/pickplace">
            <Pickplace
              startTime={startTime}
              endTime={endTime}
              setstart={setStartTime}
              setend={setEndTime}
              today={StartDay}
              nextday={EndDay}
            />
            <Footer ver="min" />
          </Route>
          {/* 會員單元 */}
          <Route path="/member/coupon">
            <Coupon auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>

          <Route path="/member/addressbookadd">
            <AddressBookAdd auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/member/editpassword">
            <EditPassword auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/member/addressbook">
            <AddressBook auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/member/coupon">
            <Coupon auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/member/profile">
            <MemberProfile auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/member">
            <Member auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/logout">
            <Logout auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/login">
            <Login auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/register">
            <Register auth={auth} setAuth={setAuth} />
            <Footer ver="full" />
          </Route>
          <Route path="/csStaff">
            <CustomersServiceStaff />
          </Route>
          {/* 商品單元 */}

          <Route exact path="/product">
            <Searchbar {...Searchbarstate} />
            <Product {...Searchbarstate} />
            <Footer ver="full" />
          </Route>
          {/* 商品搜尋 */}
          <Route exact path="/search">
            <Searchbar {...Searchbarstate} />
            <ProductSearch {...Searchbarstate} />
            <Footer ver="full" />
          </Route>
          {/* 商品分類頁 */}
          <Route exact path="/product/cat/:cid">
            <Searchbar {...Searchbarstate} />
            <ProductCat sessionServer={sessionServer} />
            <Footer ver="full" />
          </Route>
          {/* 商品頁 */}
          <Route exact path="/product/:pid">
            <Searchbar {...Searchbarstate} />
            <ProductData
              startTime={startTime}
              endTime={endTime}
              sessionServer={sessionServer}
            />
            <Footer ver="full" />
          </Route>

          {/* 首頁 */}
          <Route exact path="/">
            <Index
              startTime={startTime}
              endTime={endTime}
              setstart={setStartTime}
              setend={setEndTime}
              today={StartDay}
              nextday={EndDay}
              searchKey={searchKey}
              setSearchKey={handleSearch}
              sessionServer={sessionServer}
            />
            <Footer ver="full" />
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>
  )
}

export default App
