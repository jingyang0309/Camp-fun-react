import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
// import CartTitle from './CartTitle'
import moment from 'moment'
import { AiFillCaretRight, AiOutlineFileDone } from 'react-icons/ai'
import { countries, townships } from '../../json/townships'
import { BiListCheck } from 'react-icons/bi'
import {
  FaCartPlus,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
  FaArrowRight,
} from 'react-icons/fa'
import { FiCheckSquare } from 'react-icons/fi'
import { MdUpdate } from 'react-icons/md'

// import CartItem from './CartItem'

const CartDetail = () => {
  const history = useHistory()
  const location = useLocation()
  const cartId = location?.state?.cartId || 0
  const [order, setOrder] = useState()

  useEffect(() => {
    setOrder(location.state)
  }, [])

  const orderPay = () => {
    if (cartId.orderInfo.cartPayId === '1') {
      return '信用卡結帳'
    } else if (cartId.orderInfo.cartPayId === '3') {
      return '現場結帳'
    }
    return '貨到付款'
  }
  return (
    <>
      <div className="container">
        <div className="cartTitle ">
          <div className="row ">
            <div className="cartTitleH1">
              <h4>
                <FaCartPlus />
                購物明細
              </h4>
            </div>
            <div>
              <h2>
                <AiFillCaretRight color="#808080" />
                <AiFillCaretRight color="#808080" />
                <AiFillCaretRight color="#808080" />
              </h2>
            </div>
            <h4 className="cartTitleH1">
              <BiListCheck />
              確認資訊
            </h4>
            <h2>
              <AiFillCaretRight color="#808080" />
              <AiFillCaretRight color="#808080" />
              <AiFillCaretRight color="#808080" />
            </h2>
            <h4 className="cartTitleH1-box">
              <FiCheckSquare />
              訂單完成
            </h4>
          </div>
        </div>
      </div>
      <div className="CartDetailText">
        <h1>
          <AiOutlineFileDone />
        </h1>
        <h4>已完成訂單 </h4>
        <h4>感謝您的購買</h4>
      </div>
      {/* <h5>購物明細:</h5> */}
      <div className="cartMain container">
        <div className="row cartItemDay">
          <p className="cart-date-hl">
            <strong>
              <FaRegCalendarCheck className="timeicon" />
              起始時間：{cartId?.orderInfo.startTime}
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
              結束時間：{cartId?.orderInfo.endTime}
            </strong>
          </p>

          <p className="cart-date-hl2">
            <strong>
              <MdUpdate className="timeicon" />
              天數：{cartId?.orderInfo.gameDay}
            </strong>
          </p>
        </div>
        <div className=" cartTable">
          {console.log(cartId?.orderItem[0].product_id)}
          {cartId?.orderItem[0].product_id && (
            <table className="tableCart ">
              <thead>
                <tr>
                  <th></th>
                  <th>商品名稱</th>
                  <th>價格</th>
                  <th>數量</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {cartId?.orderItem?.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <img src={v.product_oimg} alt="" />
                      </td>

                      <td>{v.cartName}</td>
                      <td>
                        {v.cartBuyP * cartId?.orderInfo.gameDay * v.cartBuyQty}

                        <small>/{cartId?.orderInfo.gameDay}日</small>
                      </td>

                      <td>{v.cartBuyQty}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
          {cartId?.orderItem[0].cpName && (
            <table className="tableCart ">
              <thead>
                <tr>
                  <th>{cartId?.orderItem[0].cpName}</th>
                  <th>分區</th>
                  {/* <th style={{ color: '#145041' }}>露營天數</th> */}
                  <th>價格/日期</th>
                  <th>帳數</th>
                </tr>
              </thead>
              <tbody className="">
                {cartId?.orderItem?.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <img src={v.placeAreapic} alt="" />
                      </td>

                      <td>{v.cpArea}</td>
                      <td>
                        {v.cpQty * cartId?.orderInfo.gameDay * v.cpPrice}

                        <small>/{cartId?.orderInfo.gameDay}日</small>
                      </td>

                      <td>{v.cpQty}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="cartPiceDetil">
        <div className="cartPiceDetilItem1">
          <p>總共消費金額:</p>
        </div>
        <div className="cartPiceDetilItem2">
          <p>NT ${cartId.orderInfo.cartTotal}</p>
        </div>
      </div>
      <h5>訂單明細:</h5>
      {cartId?.orderItem[0].product_id && (
        <div className="containet CartDetail">
          <div className="CartDetail item1">
            <ul>
              <li>訂單編號</li>
              <li>訂單日期</li>
              <li>訂單狀態</li>
              <li>運送方式</li>
              <li>付款方式</li>
              {/* <li>訂購人姓名</li>
              <li>訂購人手機</li>
              <li>訂購人信箱</li> */}
            </ul>
          </div>
          <div className="CartDetail item2">
            <ul>
              <li>{cartId.orderInfo.cartOrderId}</li>
              <li>
                {moment(cartId.orderInfo.created_at).format('YYYY-MM-DD')}
              </li>
              <li>{cartId.orderInfo.cartStatus}</li>
              <li>
                {cartId.orderInfo.cartLogisticsId === 1 ? '宅配' : '自取'}
              </li>
              <li>{orderPay()}</li>
              {/* <li>{cartId.orderInfo.nNN}</li>
              <li>{cartId.orderInfo.nCC}</li>
              <li>{cartId.orderInfo.nEE}</li> */}
            </ul>
          </div>
          <div className="CartDetail item3">
            <ul>
              <li>收件人姓名</li>
              <li>收件人手機</li>
              <li>收件人信箱</li>
              <li>收件人地址</li>

              <li>付款狀態</li>
            </ul>
          </div>
          <div className="CartDetail item4">
            <ul>
              <li>{cartId.orderInfo.nNN}</li>
              <li>{cartId.orderInfo.nCC}</li>
              <li>{cartId.orderInfo.nEE}</li>
              <li>
                {cartId.orderInfo.countries >= 0
                  ? countries[cartId.orderInfo.countries] +
                    townships[cartId.orderInfo.countries][
                      cartId.orderInfo.townships
                    ] +
                    cartId.orderInfo.nAA
                  : ''}
              </li>

              <li>{cartId.orderInfo.cartPayId == 1 ? '已付清' : '待付款'}</li>
            </ul>
          </div>
        </div>
      )}
      {cartId?.orderItem[0].cpName && (
        <div className="containet CartDetail">
          <div className="CartDetail item1">
            <ul>
              <li>訂單編號</li>
              <li>訂單日期</li>
              <li>訂單狀態</li>
              <li>付款方式</li>
            </ul>
          </div>
          <div className="CartDetail item2">
            <ul>
              <li>{cartId.orderInfo.cartOrderId}</li>
              <li>
                {moment(cartId.orderInfo.created_at).format('YYYY-MM-DD')}
              </li>
              <li>{cartId.orderInfo.cartStatus}</li>
              <li>{orderPay()}</li>
            </ul>
          </div>
          <div className="CartDetail item3">
            <ul>
              <li>訂購人姓名</li>
              <li>訂購人手機</li>
              <li>訂購人信箱</li>

              <li>付款狀態</li>
            </ul>
          </div>
          <div className="CartDetail item4">
            <ul>
              <li>{cartId.orderInfo.nNN}</li>
              <li>{cartId.orderInfo.nCC}</li>
              <li>{cartId.orderInfo.nEE}</li>

              <li>{cartId.orderInfo.cartPayId == 1 ? '已付清' : '待付款'}</li>
            </ul>
          </div>
        </div>
      )}
      <div className="cartPiceBtn">
        <button>回到商品頁面</button>
        <button
          onClick={() => {
            history.replace('', null)
            history.push('/cartorder')
          }}
        >
          回到訂單頁面
        </button>
      </div>
    </>
  )
}

export default CartDetail
