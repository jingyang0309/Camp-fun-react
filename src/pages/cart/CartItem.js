import React, { useState } from 'react'
import {
  FaTrashAlt,
  FaMinus,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
  FaArrowRight,
} from 'react-icons/fa'
import { MdUpdate } from 'react-icons/md'
import { BiPlusMedical } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import CartInfo from './CartInfo'

// import Swal from 'sweetalert2'

const CartItem = (props) => {
  const {
    gameDay,
    newMember,
    setNewMember,
    fetchmid,
    setFetchmid,
    mid,
    pTotal,
    sum,
    total,
    setTotal,
    getSession,
    sessionUpdate,
    sessionDelete,
    sessionClear,
    handeleClass,
    handleMin,
    startTime,
    endTime,
  } = props
  const [cartLogistics, setCartLogistics] = useState()

  // let placeTotle = { placename: 'a區', price: '100' }

  // const cart = localStorage.setItem('place', JSON.stringify(placeTotle))

  const history = useHistory()

  return (
    <>
      <div className="cartMobilesection">
        <div className="cartMain  rwdItem">
          {getSession.length >= 1 ? (
            <>
              <div className="col-12 day">
                <p style={{ fontSize: '14px' }}>
                  <FaRegCalendarCheck />
                  起始時間：{startTime}
                </p>
                <p style={{ fontSize: '14px' }}>
                  <FaRegCalendarTimes />
                  結束時間：{endTime}
                </p>
                <p style={{ fontSize: '14px' }}>總天數：{gameDay}</p>
              </div>
              {getSession.length &&
                getSession?.map((item, i) => {
                  return (
                    <div className="row col-12" key={i}>
                      {/* <div className="col-1">{i + 1}</div> */}
                      <div className="col-5">
                        <img src={item.product_oimg} alt="" />
                      </div>
                      <div className="col-6 detail">
                        <div className="mt-1">{item.product_name}</div>
                        <div className="mt-1">
                          ${item.quantity * item.product_price * gameDay}
                          <small>/ {gameDay}日</small>
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
                                if (item.quantity === 1) return
                                sessionUpdate(
                                  item.product_id,
                                  item.quantity,
                                  false
                                )
                              }}
                            >
                              <FaMinus color="#FFBB00" />
                            </button>

                            {item.quantity}

                            <button
                              onClick={() => {
                                sessionUpdate(
                                  item.product_id,
                                  item.quantity,
                                  true
                                )
                              }}
                            >
                              <BiPlusMedical color="#FFBB00" />
                            </button>
                          </div>
                        ) : (
                          <p> 數量：{item.quantity}</p>
                        )}
                      </div>
                      {!total && (
                        <div className="row col-1">
                          <button
                            onClick={() => {
                              sessionDelete(item.product_id)
                            }}
                          >
                            <FaTrashAlt color="#000" size="15px" />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
            </>
          ) : (
            <div className="container">
              <img
                src="http://localhost:3000/images/logo.png"
                alt="logo"
                style={{ height: '30px' }}
              />
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
                <p>
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
                </p>
              </div>
              <div className="col-6">
                <p>訂購數量</p>
              </div>
              <div className="col-6 ">
                <p style={{ color: '#555' }}>共{pTotal(getSession)}項</p>
              </div>
              <div className="col-6">
                <p>小計</p>
              </div>
              <div className="col-6 ">
                <p style={{ color: '#555' }}>
                  NT $ {sum(getSession) * gameDay}
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
                      NT ${' '}
                      {cartLogistics == 1 ? +(pTotal(getSession) * 100) : 0}
                    </p>
                  </div>
                </>
              ) : (
                ''
              )}
              {sum(getSession) * gameDay >= 10000 && (
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
                  {sum(getSession) >= 10000
                    ? (sum(getSession) * gameDay -
                        (newMember ? 100 : 0) +
                        (cartLogistics == 1
                          ? +(pTotal(getSession) * 100)
                          : 0)) *
                      0.9
                    : sum(getSession) * gameDay -
                      (newMember ? 100 : 0) +
                      (cartLogistics == 1 ? +(pTotal(getSession) * 100) : 0)}
                </h5>
              </div>
            </div>
            <div className="cartPiceBtn">
              <button>繼續選購</button>
              <button
                onClick={() => {
                  if (cartLogistics >= 0) {
                    handleMin()
                    getSession.length && setTotal(true)
                    getSession.length && handeleClass(1)
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
          {getSession.length ? (
            <div className="row cartItemDay">
              <p className="cart-date-hl">
                <strong>
                  <FaRegCalendarCheck className="timeicon" />
                  預定起始日：{startTime}
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
                  預訂歸還日：{endTime}
                </strong>
              </p>

              <p className="cart-date-hl2">
                <strong>
                  <MdUpdate className="timeicon" />
                  租借天數：{gameDay}
                </strong>
              </p>
            </div>
          ) : (
            ''
          )}
          <div className=" cartTable">
            {getSession?.length > 0 ? (
              <table className="tableCart">
                <thead>
                  <tr>
                    <th></th>
                    <th>商品名稱</th>
                    <th>數量</th>
                    <th>價格</th>
                    <th></th>
                  </tr>
                </thead>

                {getSession?.map((item, index) => {
                  return (
                    <tbody className="" key={index}>
                      <tr>
                        <td>
                          <img
                            src={item.product_oimg}
                            alt=""
                            className="mt-1"
                          />
                        </td>

                        <td style={{ width: '400px' }}>{item.product_name}</td>

                        {!total ? (
                          <>
                            <td>
                              {/* <div className="tableItem"> */}
                              <button
                                onClick={() => {
                                  if (item.quantity === 1) return
                                  sessionUpdate(
                                    item.product_id,
                                    item.quantity,
                                    false
                                  )
                                }}
                              >
                                <FaMinus color="#FFBB00" />
                              </button>
                              {item.quantity}

                              <button
                                onClick={() => {
                                  sessionUpdate(
                                    item.product_id,
                                    item.quantity,
                                    true
                                  )
                                }}
                              >
                                <BiPlusMedical color="#FFBB00" />
                              </button>
                              {/* </div> */}
                            </td>
                            <td>
                              {item.quantity * item.product_price * gameDay}
                              <small>/{gameDay}日</small>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  sessionDelete(item.product_id)
                                }}
                              >
                                <FaTrashAlt color="#000" size="20px" />
                              </button>
                              {/* {setPrice(item.amount * item.price)} */}
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{item.quantity}</td>
                            <td>
                              {item.quantity * item.product_price * gameDay}
                              <small>/{gameDay}日</small>
                            </td>
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
                      history.push('/product')
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
                <p>
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
                </p>
              </div>
              <div className="cartPiceDetilItem1">
                <p>訂購數量</p>
                <p>小計</p>
                {newMember >= 1 && <p>滿五百折一百</p>}
                {cartLogistics == 1 ? <p>運費 １件/$100</p> : ''}
                {sum(getSession) >= 10000 && (
                  <p style={{ color: 'red' }}>滿萬送千活動</p>
                )}
                <h4>總計金額&emsp;</h4>
              </div>
              <div className="cartPiceDetilItem2">
                <p>共{pTotal(getSession)}項</p>
                <p>NT $ {sum(getSession) * gameDay}</p>
                {newMember >= 1 && (
                  <p style={{ color: 'red' }}>{newMember ? -100 : 0}</p>
                )}
                {cartLogistics == 1 ? (
                  <p>
                    NT $ {cartLogistics == 1 ? +(pTotal(getSession) * 100) : 0}
                  </p>
                ) : (
                  ''
                )}
                {sum(getSession) * gameDay >= 10000 && (
                  <p style={{ color: 'red' }}>滿萬九折</p>
                )}
                <h3>
                  NT $
                  {sum(getSession) * gameDay >= 10000
                    ? (sum(getSession) * gameDay -
                        (newMember ? 100 : 0) +
                        (cartLogistics == 1
                          ? +(pTotal(getSession) * 100)
                          : 0)) *
                      0.9
                    : sum(getSession) * gameDay -
                      (newMember ? 100 : 0) +
                      (cartLogistics == 1 ? +(pTotal(getSession) * 100) : 0)}
                </h3>
              </div>
            </div>

            <div className="cartPiceBtn">
              <button
                onClick={() => {
                  history.push('/product')
                }}
              >
                繼續選購
              </button>
              <button
                onClick={() => {
                  // if (fetchmid.fName === null && fetchmid.lName === null) {
                  //   Swal.fire(
                  //     '請先完成基本資料填寫,<br/>3秒後跳轉到會員資料頁面'
                  //   )
                  //   setTimeout(() => {
                  //     history.push('/member/profile')
                  //   }, 3000)
                  // }
                  if (cartLogistics >= 0) {
                    handleMin()
                    // getSession.length && setTotal(true)
                    // getSession.length && handeleClass(1)
                  }
                }}
              >
                下一步
              </button>
            </div>
          </>
        )}
      </div>

      {total && (
        <CartInfo
          gameDay={gameDay}
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
          sessionClear={sessionClear}
          cartLogistics={cartLogistics}
        />
      )}
    </>
  )
}

export default CartItem
