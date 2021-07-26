import React, { useState, useEffect } from 'react'
import {
  FaTrashAlt,
  FaMinus,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
  FaArrowRight,
} from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'
import { BiPlusMedical } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import CartInfoPlace from './CartInfoPlace'
import moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
const CartItemPlace = (props) => {
  const {
    setPlaceCart,
    placeCart,
    gameDay,
    newMember,
    setNewMember,
    fetchmid,
    setFetchmid,
    mid,
    placeToCart,
    total,
    setTotal,
    getSession,
    sessionUpdate,
    sessionDelete,
    sessionClear,
    handeleClass,
    handleMin2,
    startTime,
    endTime,
  } = props
  const [cartLogistics, setCartLogistics] = useState()

  const placeSDate = moment(placeCart && placeCart[0]?.orderSDay, 'YYYY-MM-DD')
  const placeEDate = moment(placeCart && placeCart[0]?.orderEDay, 'YYYY-MM-DD')
  const placeDay = placeEDate.diff(placeSDate, 'day')

  const history = useHistory()
  const updateCartToLocalStorage = (item, isAdded = true) => {
    // console.log(item, isAdded)
    let currentPlaceCart = JSON.parse(localStorage.getItem('placeCart')) || []
    const index = currentPlaceCart.findIndex((v) => v.orderArea === item)
    console.log('index', index)
    if (index > -1) {
      isAdded
        ? currentPlaceCart[index].orderTCount++
        : currentPlaceCart[index].orderTCount--
    }
    // console.log(currentPlaceCart)
    localStorage.setItem('placeCart', JSON.stringify(currentPlaceCart))
    setPlaceCart(currentPlaceCart)
  }
  // useEffect(() => {
  //   updateCartToLocalStorage()
  // }, [placeCart])
  //營地獨立計算
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items?.length; i++) {
      total += parseInt(items[i].orderTPrice || 0) * items[i].orderTCount
    }
    return total
  }
  //計件用
  const pTotal = (items) => {
    let total = 0
    for (let i = 0; i < items?.length; i++) {
      total += parseInt(items[i].orderTCount)
    }
    return total
  }
  return (
    <>
      <div className="cartMobilesection">
        <div className="cartMain  rwdItem">
          {placeCart ? (
            <>
              <div className="col-12 day">
                <p style={{ fontSize: '14px' }}>
                  起始時間：
                  {moment(placeCart?.[0]?.orderSDay).format('YYYY-MM-DD')}
                </p>
                <p style={{ fontSize: '14px' }}>
                  結束時間：
                  {moment(placeCart?.[0]?.orderEDay).format('YYYY-MM-DD')}
                </p>
                <p style={{ fontSize: '14px' }}>總天數：{placeDay}</p>
              </div>
              {placeCart.length > 0 &&
                placeCart?.map((item, i) => {
                  return (
                    <>
                      <div className="row col-12 " key={i}>
                        {/* <div className="col-1">{i + 1}</div> */}
                        <div className="col-5">
                          <img src={item.PlaceAreaPic} alt="" />
                        </div>
                        <div className="col-6 detail">
                          <div className="mt-1">{item.orderArea}</div>
                          <div className="mt-1">
                            {item.orderTCount * item.orderTPrice * placeDay}
                            <small>/{placeDay}日</small>
                          </div>
                          {!total ? (
                            <div
                              className="mt-1"
                              style={{
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                              }}
                            >
                              <button
                                onClick={() => {
                                  if (item.orderTCount === 0) return
                                  updateCartToLocalStorage(
                                    item.orderArea,
                                    false
                                  )
                                }}
                              >
                                <FaMinus color="#FFBB00" />
                              </button>
                              {item.orderTCount}

                              <button
                                onClick={() => {
                                  updateCartToLocalStorage(item.orderArea, true)
                                }}
                              >
                                <BiPlusMedical color="#FFBB00" />
                              </button>
                            </div>
                          ) : (
                            <p> 數量：{item.orderTCount}</p>
                          )}
                        </div>
                        {!total && <div className="row col-1"></div>}
                      </div>
                    </>
                  )
                })}
            </>
          ) : (
            <div className="container">
              <h3>目前購物車內尚無東西</h3>
              <button
                className="cartItemBtn"
                onClick={() => {
                  history.push('/product')
                }}
              >
                點我立即選購去
              </button>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          )}
        </div>
        {!total && (
          <>
            <div className=" row col-12 cart-rwd-detail ">
              <div className="col-12 text-center">
                <p>
                  選擇折價券
                  <br />
                  <select
                    name="newMember"
                    id="newMember"
                    value={newMember}
                    onChange={(e) => {
                      setNewMember(+e.target.value)
                    }}
                    style={{ width: '150px' }}
                  >
                    <option value="0">請選擇折價券</option>

                    {fetchmid?.newMember > 0 && (
                      <option value={fetchmid?.newMember}>滿五百折一百</option>
                    )}
                  </select>
                </p>
                {/* <p>
                  選擇運送方式
                  <br />
                  <select
                    name="cartLogistics1"
                    id=""
                    value={cartLogistics}
                    style={{ width: '150px' }}
                    onChange={(e) => setCartLogistics(e.target.value)}
                  >
                    <option value="-1">請選擇運送方式</option>
                    <option value="1">宅配1件/100</option>
                    <option value="2">自取</option>
                  </select>
                </p> */}
              </div>
              <div className="col-6">
                <p>訂購數量</p>
              </div>
              <div className="col-6 ">
                <p style={{ color: '#555' }}>共{pTotal(placeCart)}項</p>
              </div>
              <div className="col-6">
                <p>小計</p>
              </div>
              <div className="col-6 ">
                <p style={{ color: '#555' }}>
                  NT $ {sum(placeCart) * (placeDay || 0)}
                </p>
              </div>
              {newMember >= 1 && (
                <>
                  <div className="col-6">
                    <p>滿五百折一百</p>
                  </div>
                  <div className="col-6 ">
                    <p>
                      {newMember >= 1 && (
                        <p style={{ color: 'red' }}>{newMember ? -100 : 0}</p>
                      )}
                    </p>
                  </div>
                </>
              )}
              {cartLogistics == 1 ? (
                <>
                  <div className="col-6">
                    <p>運費1件/$100</p>
                  </div>
                  <div className="col-6">
                    <p style={{ color: '#555' }}>
                      NT $ {cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0}
                    </p>
                  </div>
                </>
              ) : (
                ''
              )}
              {sum(placeCart) * placeDay >= 10000 && (
                <>
                  <div className="col-6">
                    <p style={{ color: 'red' }}>滿萬送千活動</p>
                  </div>
                  <div className="col-6">
                    <p style={{ color: 'red' }}>滿萬九折</p>
                  </div>
                </>
              )}
              <div className="col-6">
                <h5>總計金額</h5>
              </div>
              <div className="col-6">
                <h5>
                  {sum(placeCart) >= 10000
                    ? (sum(placeCart) * (placeDay || 0) -
                        (newMember ? 100 : 0) +
                        (cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0)) *
                      0.9
                    : sum(placeCart) * (placeDay || 0) -
                      (newMember ? 100 : 0) +
                      (cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0)}
                </h5>
              </div>
            </div>
            <div className="cartPiceBtn">
              <button
                onClick={() => {
                  history.push('/pickplace')
                }}
              >
                繼續選購
              </button>
              <button
                onClick={() => {
                  if (cartLogistics >= 0) {
                    handleMin2()
                    placeCart.length && setTotal(true)
                    placeCart.length && handeleClass(1)
                  }
                  // cartLogisticsCheck()
                }}
              >
                下一步
              </button>
            </div>
          </>
        )}
      </div>
      {/* 以下為正式 */}
      <div className="cartWebsection">
        <div className="cartMain container">
          {placeCart ? (
            <div className="row cartItemDay">
              <p className="cart-date-hl">
                <strong>
                  <FaRegCalendarCheck className="timeicon" />
                  起始時間：
                  {moment(placeCart?.[0]?.orderSDay).format('YYYY-MM-DD')}
                </strong>
              </p>
              <p>
                <strong>
                  <FaArrowRight className="cart-date-to" />
                </strong>
              </p>
              <p className="cart-date-hl">
                <strong>
                  <FaRegCalendarTimes className="timeicon" />
                  結束時間：
                  {moment(placeCart?.[0]?.orderEDay).format('YYYY-MM-DD')}
                </strong>
              </p>

              <p className="cart-date-hl2">
                <MdUpdate className="timeicon" />
                <strong>預定天數：{placeDay}</strong>
              </p>
            </div>
          ) : (
            ''
          )}
          <div className=" cartTable">
            {placeCart?.length > 0 ? (
              <table className="tableCart ">
                <thead>
                  <tr>
                    <th>{placeCart[0].PlaceName}</th>
                    <th>分區</th>
                    <th>露營天數</th>
                    <th>價格／日期</th>
                    <th>帳數</th>
                    <th>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">整筆取消</Tooltip>
                        }
                      >
                        <button
                          onClick={() => {
                            localStorage.removeItem('placeCart')
                            // localStorage.setItem('placeCart', {})
                            setPlaceCart('')
                          }}
                        >
                          <AiOutlineClose
                            color="#fff"
                            size="25px"
                            alt="整筆取消"
                          />
                        </button>
                      </OverlayTrigger>
                    </th>
                  </tr>
                </thead>

                {placeCart?.map((item, index) => {
                  return (
                    <tbody className="" key={index}>
                      <tr>
                        <td>
                          <img src={item.PlaceAreaPic} alt="" />
                        </td>

                        <td style={{ width: '400px' }}>{item.orderArea}</td>

                        {!total ? (
                          <>
                            <td>{placeDay}</td>

                            <td>
                              {item.orderTCount * item.orderTPrice * placeDay}
                              <small>/{placeDay}日</small>
                            </td>
                            <td>
                              {/* <div className="tableItem"> */}
                              <button
                                onClick={() => {
                                  if (item.orderTCount === 0) return
                                  updateCartToLocalStorage(
                                    item.orderArea,
                                    false
                                  )
                                }}
                              >
                                <FaMinus color="#FFBB00" />
                              </button>
                              {item.orderTCount}

                              <button
                                onClick={() => {
                                  updateCartToLocalStorage(item.orderArea, true)
                                }}
                              >
                                <BiPlusMedical color="#FFBB00" />
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{placeDay}</td>
                            <td>
                              {item.orderTCount * item.orderTPrice * placeDay}
                              <small>/{placeDay}日</small>
                            </td>
                            <td>{item.orderTPrice}</td>
                          </>
                        )}
                      </tr>
                    </tbody>
                  )
                })}
              </table>
            ) : (
              <div className="container">
                <h3
                  className="d-flex mt-5 justify-content-center"
                  style={{ color: '#145041' }}
                >
                  <img
                    src="http://localhost:3000/images/logo.png"
                    alt="logo"
                    style={{ height: '30px' }}
                  />
                  目前購物車內尚無東西
                </h3>
                <div className="d-flex justify-content-center">
                  <button
                    className="cartItemBtn mt-3"
                    onClick={() => {
                      history.push('/pickplace')
                    }}
                  >
                    點我立即選購去
                  </button>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            )}
          </div>
        </div>

        {!total && (
          <>
            <div className="cartPiceDetil">
              <div className="cartPiceDetilItem3">
                <p>
                  選擇折價券
                  <br />
                  <select
                    name="newMember"
                    id="newMember"
                    value={newMember}
                    onChange={(e) => {
                      setNewMember(+e.target.value)
                    }}
                    style={{ width: '150px' }}
                  >
                    <option value="0">請選擇折價券</option>

                    {fetchmid?.newMember > 0 && (
                      <option value={fetchmid?.newMember}>滿五百折一百</option>
                    )}
                  </select>
                </p>
                {/* <p>
                  選擇運送方式
                  <br />
                  <select
                    name="cartLogistics1"
                    id=""
                    value={cartLogistics}
                    style={{ width: '150px' }}
                    onChange={(e) => setCartLogistics(e.target.value)}
                  >
                    <option value="-1">請選擇運送方式</option>
                    <option value="1">宅配1件/100</option>
                    <option value="2">自取</option>
                  </select>
                </p> */}
              </div>
              <div className="cartPiceDetilItem1">
                <p>訂購數量</p>
                <p>小計</p>
                {newMember >= 1 && <p>滿五百折一百</p>}
                {/* {cartLogistics == 1 ? <p>運費 １件/$100</p> : ''} */}
                {sum(placeCart) * placeDay >= 10000 && (
                  <p style={{ color: 'red' }}>滿萬送千活動</p>
                )}
                <h4>總計金額&emsp;</h4>
              </div>
              <div className="cartPiceDetilItem2">
                <p>共{pTotal(placeCart)}項</p>
                <p>NT $ {sum(placeCart) * (placeDay || 0)}</p>
                {newMember >= 1 && (
                  <p style={{ color: 'red' }}>{newMember ? -100 : 0}</p>
                )}
                {cartLogistics == 1 ? (
                  <p>
                    NT $ {cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0}
                  </p>
                ) : (
                  ''
                )}
                {sum(placeCart) * placeDay >= 10000 && (
                  <p style={{ color: 'red' }}>滿萬九折</p>
                )}
                <h3>
                  NT $
                  {sum(placeCart) * placeDay >= 10000
                    ? (sum(placeCart) * (placeDay || 0) -
                        (newMember ? 100 : 0) +
                        (cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0)) *
                      0.9
                    : sum(placeCart) * (placeDay || 0) -
                      (newMember ? 100 : 0) +
                      (cartLogistics == 1 ? +(pTotal(placeCart) * 100) : 0)}
                </h3>
              </div>
            </div>

            <div className="cartPiceBtn">
              <button
                onClick={() => {
                  history.push('/pickplace')
                }}
              >
                繼續選購
              </button>
              <button
                onClick={() => {
                  handleMin2()
                }}
              >
                下一步
              </button>
            </div>
          </>
        )}
      </div>

      {total && (
        <CartInfoPlace
          setPlaceCart={setPlaceCart}
          placeDay={placeDay}
          newMember={newMember}
          fetchmid={fetchmid}
          setFetchmid={setFetchmid}
          startTime={startTime}
          endTime={endTime}
          mid={mid}
          handeleClass={handeleClass}
          pTotal={pTotal}
          sum={sum}
          total={total}
          setTotal={setTotal}
          getSession={getSession}
          placeCart={placeCart}
          sessionClear={sessionClear}
          cartLogistics={cartLogistics}
        />
      )}
    </>
  )
}

export default CartItemPlace
