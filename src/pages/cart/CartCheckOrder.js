import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { countries, townships } from '../../json/townships'
import moment from 'moment'
import { IoWarning } from 'react-icons/io5'
import { FaMinus } from 'react-icons/fa'
import { BiPlusMedical } from 'react-icons/bi'
import Swal from 'sweetalert2'

const CartCheckOrder = () => {
  // const history = useHistory()
  const location = useLocation()
  const loadingRef = useRef(true)
  //測試用按鈕
  const [count, setCount] = useState({ cartBuyQty: 0 })
  const [orderCheck, setOrderCheck] = useState([])
  const useOrderCell = location?.state?.useOrderCell || 0
  const useOrderId = location?.state?.useOrderId || 0
  // console.log(useOrderCell)
  // console.log(useOrderId)
  //查詢訂單

  //測試增減數量的function
  const handleCount = (item, isAdded = true) => {
    let current = [...orderCheck]
    const index = current.findIndex((v) => v.cartName === item)

    if (index > -1) {
      switch (isAdded) {
        case true:
          ++current[index].cartBuyQty
          break
        case false:
          --current[index].cartBuyQty
          break
        default:
          break
      }
      // isAdded ? current[index].cartBuyQty++ : current[index].cartBuyQty--
    }
    setOrderCheck(current)
  }

  const checkOrderServer = async () => {
    // const newData = {}
    const url = `http://localhost:4000/cartorder/ordercheck/${useOrderId}/${useOrderCell}`
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log('123', data)
    loadingRef.current = false
    setOrderCheck(data)
  }
  useEffect(() => {
    checkOrderServer()
  }, [])

  //修改訂單
  // async function orderEdit(e) {
  //   // e.preventDefault()
  //   const nnn = e
  //   let data = {
  //     orderItem: [],
  //   }
  //   for (let item of orderCheck) {
  //     const tempObj = {
  //       cartBuyQty: item.cartBuyQty,
  //     }
  //     data.orderItem.push(tempObj)
  //   }
  //   data.orderInfo = {
  //     cartStatus: nnn ? '已完成' : '已取消',
  //     // cartBuyQty: orderCheck.cartButQty,
  //   }
  //   const url = `http://localhost:4000/cartorder/ordercheck/${useOrderId}/${useOrderCell}`

  //   const request = new Request(url, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //   const response = await fetch(request)
  //   const dataRes = await response.json()
  //   // console.log('伺服器回傳的json資料', dataRes)
  //   checkOrderServer()
  // }
  //商品數量修改
  async function orderEditGo() {
    // e.preventDefault()
    // const nnn = e
    // let data = {
    //   orderItem: [],
    // }
    for (let item of orderCheck) {
      const data = {
        cartBuyQty: item.cartBuyQty,
      }
      console.log(useOrderId)
      console.log(item.product_id)
      const url = `http://localhost:4000/cartorder/ordercheck1/${useOrderId}/${+item.product_id}`
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
      // data.orderItem.push(tempObj)
    }
    // console.log('伺服器回傳的json資料', dataRes)
    // checkOrderServer()
  }
  //修改訂單（（保存版
  async function orderEdit(e) {
    // e.preventDefault()
    const nnn = e
    const data = {
      cartStatus: nnn ? '線下訂單已完成' : '已取消',
      cartTotal: sum(orderCheck),
    }
    const url = `http://localhost:4000/cartorder/ordercheck/${useOrderId}/${useOrderCell}`

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
    console.log('伺服器回傳的json資料', dataRes)
    checkOrderServer()
  }
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].cartBuyP * items[i].cartBuyQty
    }
    return total
  }

  return (
    <>
      {!loadingRef.current && (
        <>
          <div className="containerPretty ">
            <div className="container">
              <h1 style={{ textAlign: 'center', padding: '10px' }}>
                <a href="/">
                  <img
                    className="chk-board-logo"
                    src="http://localhost:3000/images/logo.png"
                    alt=""
                    style={{ width: '30px' }}
                  />
                </a>
                訂單點交系統
              </h1>
              <h6
                style={{
                  // backgroundColor: '#145041',
                  color: '#FFBB00',
                  fontWeight: '800',
                  lineHeight: '40px',
                  textAlign: 'center',
                }}
              >
                <IoWarning size="30px" />
                此為門市取貨系統，請門市夥伴與務必與消費者共同確認商品無誤再送出訂單，謝謝。
                <IoWarning size="30px" />
              </h6>
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-3">訂單編號</div>
                  <div className="col col-3">訂單日期</div>
                  <div className="col col-2">訂單狀態</div>
                  <div className="col col-2">付款方式</div>
                  <div className="col col-2">付款金額</div>
                </li>
                <li className="table-row">
                  <div className="col col-3" data-label="Job Id">
                    {/* 1625747009517 */}
                    {orderCheck[0]?.cartOrderId}
                  </div>
                  <div className="col col-3" data-label="Customer Name">
                    {moment(orderCheck[0]?.created_at).format('YYYY-MM-DD')}
                    {/* 2021-07-08 */}
                  </div>
                  <div className="col col-2" data-label="Amount">
                    {orderCheck[0]?.cartStatus}
                    {/* 已取消 */}
                  </div>
                  <div className="col col-2" data-label="Payment Status">
                    {orderCheck[0]?.cartPayName}
                    {/* APPLE PAY */}
                  </div>
                  <div className="col col-2" data-label="Payment Status">
                    {sum(orderCheck)}
                    {/* 2470 */}
                  </div>
                </li>
              </ul>

              <ul>
                <div id="itemDetail" className="itemDetail ">
                  <div className="cartMain cartOrderItemBody">
                    <div className="col-9">
                      <div className=" cartTable">
                        <table className="tableCart ">
                          <thead>
                            <tr>
                              <th></th>
                              <th></th>
                              <th>商品名稱</th>
                              <th>單價</th>
                              <th>數量</th>
                              <th></th>
                            </tr>
                          </thead>
                          {orderCheck?.map((v, i) => {
                            return (
                              <tbody className="">
                                <tr>
                                  <td>
                                    <b>{i + 1}</b>
                                  </td>
                                  <td>
                                    <img src={v.product_oimg} alt="" />
                                  </td>
                                  <td>{v.cartName}</td>
                                  <td>
                                    {v.cartBuyP * orderCheck[i].cartBuyQty}
                                  </td>
                                  {orderCheck[0].cartStatus !==
                                  '線下訂單已完成' ? (
                                    <td>
                                      <button
                                        onClick={() => {
                                          if (v.cartBuyQty === 0) return
                                          handleCount(v.cartName, false)
                                        }}
                                        // style={{
                                        //   color: '#FFBB00',
                                        //   fontSize: '30px',
                                        //   fontWeight: '1200',
                                        // }}
                                      >
                                        <FaMinus color="#FFBB00" />
                                      </button>

                                      {orderCheck[i].cartBuyQty}
                                      <button
                                        onClick={() => {
                                          handleCount(v.cartName, true)
                                          console.log(v.cartBuyQty)
                                        }}
                                        // style={{
                                        //   color: '#FFBB00',
                                        //   fontSize: '30px',
                                        //   fontWeight: '1200',
                                        // }}
                                      >
                                        <BiPlusMedical color="#FFBB00" />
                                      </button>
                                    </td>
                                  ) : (
                                    <td>{orderCheck[i].cartBuyQty}</td>
                                  )}
                                </tr>
                              </tbody>
                            )
                          })}
                        </table>
                      </div>
                    </div>
                    <div className="col-3 cartOrderItemBox">
                      <p style={{ color: '#0071BC' }}>
                        租借起始：<small>{orderCheck[0]?.startTime}</small>
                      </p>

                      <p style={{ color: '#0071BC' }} className="mt-n3">
                        歸還時間：<small>{orderCheck[0]?.endTime}</small>
                      </p>
                      <p style={{ color: '#0071BC' }} className="mt-n3">
                        天數：<small>{orderCheck[0]?.gameDay}</small>
                      </p>
                      {console.log(orderCheck[0])}
                    </div>
                  </div>
                  <div className="cartOrderDetail">
                    <div className="item1 ">
                      <ul>
                        <li>收件人姓名</li>
                        <li>收件人地址</li>
                      </ul>
                    </div>
                    <div className="item2 ">
                      <ul>
                        <li>{orderCheck[0]?.nNN}</li>
                        <li>
                          {countries[orderCheck[0]?.countries] +
                            townships[orderCheck[0]?.countries][
                              orderCheck[0]?.townships
                            ] +
                            orderCheck[0]?.nAA}
                        </li>
                      </ul>
                    </div>
                    <div className="item1 ">
                      <ul>
                        <li>收件人手機</li>
                        <li>運送方式</li>
                      </ul>
                    </div>
                    <div className="item2 ">
                      <ul>
                        <li>{orderCheck[0]?.nCC}</li>
                        <li>{orderCheck[0]?.cartLogisticsName}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="cartPiceBtn">
                  <button
                    // value="2"
                    onClick={(e) => {
                      // setNumber('已取消')
                      setTimeout((e) => {
                        orderEdit(0)
                        Swal.fire('訂單已取消!', '期待您的再次購買!', 'success')
                      }, 500)
                    }}
                  >
                    想取消訂單
                  </button>
                  <button
                    value="1"
                    onClick={(e) => {
                      // setNumber('已完成')
                      setTimeout((e) => {
                        orderEditGo()
                        orderEdit(1)
                        Swal.fire('訂單已完成!', '感謝您的購買!', 'success')
                      }, 500)
                    }}
                  >
                    已確認訂單
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CartCheckOrder

{
  /* <div className="container">
          <Table striped bordered hover className="cartOrderItemHeard ">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>訂單日期</th>
                <th>訂單狀態</th>
                <th>付款方式</th>
                <th>訂單金額</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orderCheck[0]?.cartOrderId}</td>
                <td>
                  {moment(orderCheck[0]?.created_at).format('YYYY-MM-DD')}
                </td>
                <td>{orderCheck[0]?.cartStatus}</td>
                <td>{orderCheck[0]?.cartPayName}</td>
                <td>{orderCheck[0]?.cartTotal}</td>
              </tr>
            </tbody>
          </Table>
          <div id="itemDetail" className="itemDetail">
            <div className="cartMain cartOrderItemBody">
              <div className="col-9">
                <div className=" cartTable">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>商品名稱</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th></th>
                      </tr>
                    </thead>
                    {orderCheck?.map((v, i) => {
                      return (
                        <tbody className="">
                          <tr>
                            <th>{i + 1}</th>
                            <td>
                              <img
                                src="http://fakeimg.pl/440x320/282828/EAE0D0/"
                                alt=""
                              />
                            </td>
                            <td>{v.cartName}</td>
                            <td>{v.cartBuyP}</td>
                            <td>{v.cartBuyQty}</td>
                          </tr>
                        </tbody>
                      )
                    })}
                  </table>
                </div>
              </div>
              <div className="col-2 cartOrderItemBox">
                <p>預定日期:</p>
                <p>字串字串字串</p>
              </div>
            </div>
            <div className="cartOrderDetail">
              <div className="item1 ">
                <ul>
                  <li>收件人姓名</li>
                  <li>收件人地址</li>
                </ul>
              </div>
              <div className="item2 ">
                <ul>
                  <li>{orderCheck[0]?.nNN}</li>
                  <li>{orderCheck[0]?.nAA}</li>
                </ul>
              </div>
              <div className="item1 ">
                <ul>
                  <li>收件人手機</li>
                  <li>運送方式</li>
                </ul>
              </div>
              <div className="item2 ">
                <ul>
                  <li>{orderCheck[0]?.nCC}</li>
                  <li>{orderCheck[0]?.cartLogisticsName}</li>
                </ul>
              </div>
            </div>
          </div>
        </div> */
}
