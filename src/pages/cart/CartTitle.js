import React from 'react'
import { AiFillCaretRight } from 'react-icons/ai'

const CartTitle = (props) => {
  const { title, setTitle } = props
  // 控制點亮title狀態用
  setTitle(true, false, false)

  return (
    <>
      <div className="cartTitle mt-5">
        <div className="row mt-5">
          <div className={title[0] ? 'cartTitleH1-box' : 'cartTitleH1'}>
            <h4>購物明細</h4>
          </div>
          <div>
            <h2>
              <AiFillCaretRight color="#808080" />
              <AiFillCaretRight color="#808080" />
              <AiFillCaretRight color="#808080" />
            </h2>
          </div>
          <h4 className={title[1] ? 'cartTitleH1-box' : 'cartTitleH1'}>
            訂單資訊
          </h4>
          <h2>
            <AiFillCaretRight color="#808080" />
            <AiFillCaretRight color="#808080" />
            <AiFillCaretRight color="#808080" />
          </h2>
          <h4 className={title[2] ? 'cartTitleH1-box' : 'cartTitleH1'}>
            訂單明細
          </h4>
        </div>
      </div>
    </>
  )
}

export default CartTitle
