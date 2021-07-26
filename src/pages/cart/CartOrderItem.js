import React from 'react'
import Swal from 'sweetalert2'
import { countries, townships } from '../../json/townships'

// import { IoIosArrowDown } from 'react-icons/io'
import { CgMoreO } from 'react-icons/cg'

const CartOrderItem = (props) => {
  const { item, select, setSelect, dataItem, orderEdit } = props
  //購買狀態的顏色改變
  const status = () => {
    if (item.cartStatus == '已完成') {
      return (
        <div
          className="col col-2"
          data-label="Amount"
          style={{ color: '#0E7F41' }}
        >
          {item.cartStatus}
        </div>
      )
    } else if (item.cartStatus == '已取消') {
      return (
        <div
          className="col col-2"
          data-label="Amount"
          style={{ color: '#E21441' }}
        >
          {item.cartStatus}
        </div>
      )
    } else {
      return (
        <div
          className="col col-2"
          data-label="Amount"
          style={{ color: '#0071BC' }}
        >
          {item.cartStatus}
        </div>
      )
    }
  }
  const handleOrderClass = (value) => {
    let str = ''
    switch (value) {
      case 1:
        str = '商品租借'
        break
      case 2:
        str = '活動預約'
        break
      case 3:
        str = '場地預約'
        break
      default:
        break
    }
    return str
  }

  const productItem = () => {
    if (item.orderclass == 1) {
      return (
        <>
          <th>編號</th>
          <th></th>
          <th>商品名稱</th>
          <th>單價</th>
          <th>數量</th>
          <th></th>
        </>
      )
    } else if (item.orderclass == 2) {
      return (
        <>
          <th>序號</th>
          <th></th>
          <th style={{ color: '#145041' }}>商品名稱</th>
          <th style={{ color: '#145041' }}>單價</th>
          <th style={{ color: '#145041' }}>數量</th>
          <th></th>
        </>
      )
    } else {
      return (
        <>
          {/* <th></th> */}
          <th colspan="2">{dataItem[0]?.cpName}</th>
          <th>分區</th>
          <th>價格</th>
          <th>帳數</th>
          <th></th>
        </>
      )
    }
  }

  const product = (v, i) => {
    if (item.orderclass == 1) {
      return (
        <>
          <td>{i + 1}</td>
          <td>
            <img src={v.product_oimg} alt="" />
          </td>
          <td>
            <p>{v.cartName}</p>
          </td>
          <td>
            {v.cartBuyP * v.cartBuyQty * item.gameDay}
            <small>/{item.gameDay}日</small>
          </td>
          <td>{v.cartBuyQty}</td>
        </>
      )
    } else if (item.orderclass == 2) {
      return (
        <>
          <td>{v.cartName}</td>
          <td>{v.cartBuyP}</td>
          <td>{v.cartBuyQty}</td>
        </>
      )
    } else {
      return (
        <>
          <td>{i + 1}</td>
          <td>
            <img src={v.placeAreaPic} alt="" />
          </td>
          <td>{v.cpArea}</td>
          <td>
            {v.cpQty * v.cpPrice * item.gameDay}
            <small>/{item.gameDay}日</small>
          </td>
          <td>{v.cpQty}</td>
        </>
      )
    }
  }
  console.log(item.orderclass)

  return (
    <>
      <div className="containerPretty ">
        <div className="cartOrderItemHeard">
          <ul className="responsive-table">
            <li className="table-row">
              <div className="col col-2" data-label="Job Id">
                {item.cartOrderId}
              </div>
              <div className="col col-2" data-label="Customer Name">
                {item.created_at}
              </div>
              {status()}
              {/* <div
                className="col col-2"
                data-label="Amount"
                style={{ color: 'red' }}
              >
                {item.cartStatus}
              </div> */}
              <div className="col col-2" data-label="Payment Status">
                {item.cartPayName}
              </div>
              <div className="col col-2" data-label="Payment Status">
                {item.cartTotal}
              </div>
              <div className="col col-1" data-label="Payment Status">
                {handleOrderClass(item.orderclass)}
              </div>
              <div className="col col-1" data-label="Payment Status">
                <button
                  onClick={() => {
                    select === item.cartOrderId
                      ? setSelect(null)
                      : setSelect(item.cartOrderId)
                  }}
                >
                  <CgMoreO />
                </button>
              </div>
            </li>
          </ul>
          <ul className="table-row">
            {item.cartOrderId === select && (
              <div id="itemDetail" className="itemDetail ">
                <div className="cartMain cartOrderItemBody ">
                  <div className="col-9">
                    <div className=" cartTable">
                      <table className="tableCart ">
                        <thead>
                          <tr>{productItem()}</tr>
                        </thead>
                        {dataItem.map((v, i) => {
                          return (
                            <tbody className="" key={i}>
                              {/* <th>{i + 1}</th> */}
                              <tr>{product(v, i)}</tr>
                            </tbody>
                          )
                        })}
                      </table>
                    </div>
                  </div>
                  <div className="col-3 cartOrderItemBox">
                    <p style={{ color: '#0071BC' }}>
                      起始時間：
                      <small>{item.startTime}</small>
                    </p>

                    <p style={{ color: '#0071BC' }} className="mt-n3">
                      結束時間：
                      <small>{item.endTime}</small>
                    </p>
                    <p style={{ color: '#0071BC' }} className="mt-n3">
                      天數：<small>{item.gameDay}</small>
                    </p>
                    {console.log(item)}
                    {item.cartStatus == '待出貨' || '已預訂' ? (
                      <button
                        className="cancelButton"
                        onClick={(e) => {
                          // console.log(item.cartOrderId)
                          // setEditOrder(item.cartOrderId)
                          Swal.fire({
                            title: '你確定要取消嗎?',
                            text: '',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#D33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: '確定取消!',
                            cancelButtonText: '我點錯了',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire(
                                '已取消',
                                '期待下次再購買',
                                'success',
                                orderEdit(item.cartOrderId)
                              )
                            }
                          })
                        }}
                      >
                        取消訂單
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="cartOrderDetail">
                  <div className="item1 ">
                    <ul>
                      <li>
                        {item.orderclass === 1 ? '收件人姓名' : '訂購人姓名'}
                      </li>
                      {item.orderclass === 1 && <li>收件人地址</li>}
                    </ul>
                  </div>
                  <div className="item2 ">
                    <ul>
                      <li>{item.nNN}</li>
                      {item.orderclass === 1 ? (
                        <li>
                          {countries[item.countries] +
                            townships[item.countries][item.townships] +
                            item.nAA}
                        </li>
                      ) : (
                        ''
                      )}
                    </ul>
                  </div>
                  <div className="item1 ">
                    <ul>
                      <li>
                        {item.orderclass === 1 ? '收件人手機' : '訂購人手機'}
                      </li>
                      {item.orderclass === 1 && <li>運送方式</li>}
                    </ul>
                  </div>
                  <div className="item2 ">
                    <ul>
                      <li>{item.nCC}</li>
                      {item.orderclass === 1 && (
                        <li>{item.cartLogisticsName}</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CartOrderItem
