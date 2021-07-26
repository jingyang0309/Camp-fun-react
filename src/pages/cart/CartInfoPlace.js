import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import '../../styles/cart.scss'
// import { countries, townships, postcodes } from '../../json/townships'
// import { ImCreditCard } from 'react-icons/im'
//reactBootstrap用
import PaymentForm from './PaymentForm'
// import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import moment from 'moment'
// import { date } from 'yup'

// import { withFormik, Form, Field, ErrorMessage } from 'formik'
// import * as yup from 'yup'

// import CartTitle from './CartTitle'
// import CartItem from './CartItem'
// import Item from 'antd/lib/list/Item'

function CartInfoPlace(props) {
  const {
    setPlaceCart,
    cartLogistics,
    endTime,
    startTime,
    fetchmid,
    placeCart,
    gameDay,
    newMember,
    placeDay,
  } = props
  // console.log(countries, townships, postcodes)
  //reactBootstrap用
  const [modalShow, setModalShow] = React.useState(false)
  const history = useHistory()
  const { setTotal, getSession, sessionClear, pTotal, sum, handeleClass, mid } =
    props
  //記錄陣列的索引值,預設值是-1,相當於'請選擇xxx'
  const [country, setCountry] = useState(-1)
  const [township, setTownship] = useState(-1)
  const [pay, setPay] = useState(false)
  const [orderer, setOrderer] = useState(false)
  //用來存放會員帶進來的使用者名稱
  const [userName, setUserName] = useState('')
  const [userCell, setUserCell] = useState('')
  const [userEmail, setUserEmail] = useState('')
  //用來抓會員資料
  // const [fetchmid, setFetchmid] = useState('')
  // console.log(country)
  // console.log(township)
  const [countError, setCountError] = useState({
    country: '',
    township: '',
    nNN: '',
    nAA: '',
    nCC: '',
    nEE: '',
  })
  //定義foucs
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const nNNRef = useRef()
  const nCCRef = useRef()
  const nEERef = useRef()
  const nAARef = useRef()

  // console.log(countries[country])
  // console.log(townships[country][township])
  // console.log(township)
  const [cartPayId, setCartPayId] = useState()
  const [inputs, setInputs] = useState({
    nNN: '',
    nAA: '大安路一段',
    nCC: '0919999999',
    nEE: 'eaag@gmail.com',
    cartPayId: '',
    cartLogisticsId: cartLogistics,
    mid: mid,
    cartTotal:
      sum(placeCart) * placeDay >= 10000
        ? (sum(placeCart) * placeDay -
            (newMember ? 100 : 0) +
            (cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0)) *
          0.9
        : sum(placeCart) * placeDay -
          (newMember ? 100 : 0) +
          (cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0),
    cartDescription: '1',
    cartStatus: '已預訂',
    orderclass: '3',
  })
  //如果資料傳進來的是value該怎麼處理
  // console.log(countries)
  // console.log(countries[3])
  // console.log(townships[3][2])
  //寫入訂單
  async function addCartToSever(e) {
    e.preventDefault()

    // console.log(countries[country])
    //對地址做表單驗證
    // if (country >= 0 && township >= 0) {
    //   const orderid = +new Date()
    //   let data = {
    //     orderItem: [],
    //   }
    const orderid = +new Date()
    let data = {
      orderItem: [],
    }
    for (let item of placeCart) {
      const tempObj = {
        placeAreapic: item.PlaceAreaPic, //圖
        cpName: item.PlaceName, //主區域
        cpArea: item.orderArea, //分區
        cpQty: item.orderTCount, //帳數
        cpPrice: item.orderTPrice, //單價
        cartOrderId: orderid,
        // placeAreaPic: item.product_oimg,//圖
      }
      data.orderItem.push(tempObj)
    }

    data.orderInfo = {
      nNN: inputs.nNN,
      countries: '',
      townships: '',
      nAA: inputs.nAA,
      nCC: inputs.nCC,
      nEE: inputs.nEE,
      cartPayId: cartPayId,
      cartLogisticsId: '3',
      mid: inputs.mid,
      cartTotal: inputs.cartTotal,
      cartDescription: inputs.cartDescription,
      cartStatus: inputs.cartStatus,
      cartOrderId: orderid,
      orderclass: inputs.orderclass,
      created_at: new Date(),
      startTime: moment(placeCart?.[0]?.orderSDay).format('YYYY-MM-DD'),
      endTime: moment(placeCart?.[0]?.orderEDay).format('YYYY-MM-DD'),
      gameDay: placeCart[0].orderTDay,
      newMember: newMember,
    }
    console.log('一開始收到的資料', data)
    //寫入的網址
    const url = 'http://localhost:4000/cartorder/addp'

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    console.log('JSON字串', JSON.stringify(data))
    const response = await fetch(request)
    const dataRes = await response.json()

    console.log('伺服器回傳的json資料', dataRes)
    //送出資料後清除session
    // 送出資料後跳轉頁面
    setTimeout(() => {
      localStorage.setItem('placeCart', '')
      setPlaceCart('')
      // setSubmitting(false)
      userNewMember(e)
      history.push('/cartdetail', { cartId: data })
      Swal.fire('結帳成功!', '感謝您的購買!', 'success')
    }, 500)

    // } else {
    //   const NewCountError = {}
    //   if (country == -1 && township == -1) {
    //     NewCountError.country = '請填寫收件人欄位'
    //   }

    // setCountError(NewCountError)
  }

  async function userNewMember(e) {
    // e.preventDefault()

    const data = {
      newMember: 0,
    }
    const url = `http://localhost:4000/cartorder/coupon/${sessionStorage.getItem(
      'mId'
    )}`

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const dataRes = await response.json()
    // console.log('伺服器回傳的json資料', dataRes)
  }

  //抓會員資料
  // const memberToSever = async () => {
  //   const url = `http://localhost:4000/cartorder/member/${mId}`
  //   const request = new Request(url, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //     }),
  //   })
  //   const response = await fetch(request)
  //   const data = await response.json()
  //   setFetchmid(data)
  // }
  // useEffect(() => {
  //   memberToSever()
  // }, [])

  //處理每個欄位的變動
  const handelChange = (e) => {
    const newInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    }
    setInputs(newInputs)
  }
  // 每個欄位的錯誤訊息
  const [fieldErrors, setFieldErrors] = useState({
    nNN: '',
    nAA: '',
    nCC: '',
    nEE: '',
    country: '',
  })
  // form有更動會觸發這個函式
  const handleChangeInput = (e) => {
    console.log('更動欄位:', e.target.name)
    //該欄位錯誤訊息清空
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: '',
    }
    setFieldErrors(updatedFieldErrors)
  }
  // 有錯誤的訊息會出觸發在這裡
  const handleInvalid = (e) => {
    e.preventDefault()

    const fields = [
      {
        name: 'nAA',
        value: inputs.nAA,
        message: '請輸入地址',
      },
      { name: 'nEE', value: inputs.nEE, message: '請輸入信箱' },
      { name: 'nCC', value: inputs.nCC, message: '請輸入電話' },
      {
        name: 'nNN',
        value: inputs.nNN,
        message: '請輸入文字',
      },
    ]
    const isNotFilled = fields.forEach((field) => {
      if (!field.value.trim()) {
        setErrorMsg(field.message)

        if (field.name === 'nNN') {
          nNNRef.current.focus()
          return
        }
        if (field.name === 'nAA') {
          nAARef.current.focus()
          return
        }
        if (field.name === 'nCC') {
          nCCRef.current.focus()
          return
        }
        if (field.name === 'nEE') {
          nEERef.current.focus()
          return
        }
      }
      setErrorMsg('')
      return false
    })

    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    }
    setFieldErrors(updatedFieldErrors)
  }

  const handleInputChange = (e) => {
    if (e == 1) {
      setModalShow(true)
    } else {
      setModalShow(false)
    }
  }

  useEffect(() => {
    if (orderer) {
      setInputs({
        ...inputs,
        nNN: fetchmid.fName + fetchmid.lName,
        nCC: fetchmid.phone,
        nEE: fetchmid.email,
      })
    }
  }, [orderer])

  return (
    <>
      {/* <div className="container">
        <CartTitle />
      </div> */}
      {/* <h5>1.購物明細</h5> */}
      <div className="cartMain">{/* <CartItem /> */}</div>
      <div className="cartPiceDetil">
        <div className="cartPiceDetilItem1">
          <p>品項:</p>
          <p>總計金額:</p>
        </div>
        <div className="cartPiceDetilItem2">
          <p>共 {pTotal(placeCart)} 項</p>{' '}
          <p>
            NT $
            {sum(placeCart) * placeDay >= 10000
              ? (sum(placeCart) * placeDay -
                  (newMember ? 100 : 0) +
                  (cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0)) *
                0.9
              : sum(placeCart) * placeDay -
                (newMember ? 100 : 0) +
                (cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0)}
          </p>
        </div>
      </div>
      <h5>2.訂購人資料</h5>
      <div className="cartMain cartMainRWD">
        <form
          name="Newebpay"
          method="post"
          // action="https://ccore.newebpay.com/MPG/mpg_gateway"
          className="cartInfoMenber cartInfoMenberRWD"
          onSubmit={addCartToSever}
          // onChange={handleChangeInput}
          // onInvalid={handleInvalid}
        >
          <br />
          {/* <label htmlFor="">訂購人姓名:</label>
          <br />
          <input
            name="userName"
            type="text"
            value={fetchmid.fName + fetchmid.lName}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />

          <br />
          <label htmlFor="">訂購人手機:</label>
          <br />
          <input
            name="userCell"
            type="text"
            value={fetchmid.phone}
            onChange={(e) => {
              setUserCell(e.target.value)
            }}
          />
          <br />
          <label htmlFor="">訂購人信箱:</label>
          <br />
          <input
            name="userEmail"
            type="email"
            value={fetchmid.email}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <br />
          <input
            type="checkbox"
            checked={orderer}
            style={{ width: '20px' }}
            onClick={(e) => {
              setOrderer(e.target.checked)
            }}
          /> */}
          {/* <label htmlFor="">同訂購人</label> */}
          <br />
          <label htmlFor="">
            收件人姓名:
            {fieldErrors.nNN && (
              <small className="text-danger ">{fieldErrors.nNN}</small>
            )}
          </label>
          <br />
          <input
            type="text"
            name="nNN"
            ref={nNNRef}
            value={inputs.nNN}
            onChange={handelChange}
            placeholder="請輸入收件人姓名"
            required
          />
          <br />
          <label>
            收件人手機:
            {fieldErrors.nCC && (
              <small className="text-danger "> {fieldErrors.nCC}</small>
            )}
          </label>
          <br />
          <input
            type="text"
            name="nCC"
            ref={nCCRef}
            // defaultValue={orderer && fetchmid[0]?.phone}
            value={inputs.nCC}
            onChange={handelChange}
            placeholder="請輸入手機"
            pattern="09\d{2}-?\d{3}-?\d{3}"
            maxlength="10"
            required
          />
          <br />
          <label htmlFor="">
            收件人信箱:
            {fieldErrors.nEE && (
              <small className="text-danger ">{fieldErrors.nEE}</small>
            )}
          </label>
          <br />
          <input
            type="email"
            name="nEE"
            ref={nEERef}
            value={inputs.nEE}
            onChange={handelChange}
            placeholder="請輸入信箱"
            required
          />
          <br />
          <label htmlFor="">收件人地址:</label>
          {countError.country && (
            <small className="text-danger">{countError.country}</small>
          )}
          {fieldErrors.nAA && (
            <small className="text-danger ">{fieldErrors.nAA}</small>
          )}
          <br />
          {/* <div>
            <select
              name="country"
              value={country}
              onChange={(e) => {
                // 將字串轉成數字
                setCountry(+e.target.value)
                // 重置township的值
                setTownship(-1)
              }}
            >
              <option value="-1">選擇縣市</option>
              {countries.map((value, index) => (
                <option key={index} value={index}>
                  {value}
                </option>
              ))}
            </select>

            <select
              name="township"
              value={township}
              onChange={(e) => {
                // 將字串轉成數字
                setTownship(+e.target.value)
              }}
            >
              <option value="-1">選擇區域</option>
              {country > -1 &&
                townships[country].map((value, index) => (
                  <option key={index} value={index}>
                    {value}
                  </option>
                ))}
            </select>

            <select
              className="postalRWD"
              disabled
              name=""
              id=""
              value={country > -1 && township > -1 && postcodes[township]}
            >
              <option className="postalRWD">
                郵遞區號:
                {country > -1 && township > -1 && postcodes[country][township]}
              </option>
            </select>
          </div>
          <br />
          <input
            type="text"
            name="nAA"
            ref={nAARef}
            value={inputs.nAA}
            onChange={handelChange}
            placeholder="請輸入地址"
          />
          <br /> */}
          <label htmlFor="">發票資訊</label>
          <br />
          <select name="" id="">
            <option value="">捐贈發票</option>
          </select>
          <br />
          <br />
          {/* <h5>3.付款方式</h5> */}
          <label htmlFor="">選擇付款方式:</label>
          <br />
          <select
            name="cartPayId"
            id=""
            value={cartPayId}
            onChange={(e) => {
              handleInputChange(e.target.value)
              setCartPayId(e.target.value)
            }}
          >
            {console.log(cartPayId)}
            <option value="-1">請選擇</option>
            <option value="3">現場結帳</option>
            <option value="1">信用卡支付</option>
          </select>
          <br />
          <>
            <PaymentForm
              show={modalShow}
              onHide={() => setModalShow(false)}
              setModalShow={setModalShow}
              setPay={setPay}
            />
            {pay && (
              <div className="cartPayImg">
                <img src="./img/pay2.png" alt="" style={{ width: '300px' }} />
                {/* <ImCreditCard /> */}
                {/* <h3>信用卡已認證成功</h3> */}
              </div>
            )}
          </>
          <div className="cartPiceBtn cartInfoBtn">
            <button
              onClick={() => {
                setTotal(false)
                handeleClass(0)
              }}
            >
              上一頁
            </button>

            <button
              value="Sbumit"
              type="submit"
              onSubmit={() => addCartToSever()}

              // disabled={isSubmitting}
            >
              確認結帳
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default CartInfoPlace
