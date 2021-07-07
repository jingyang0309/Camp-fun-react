import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'

function MemberProfile(props) {
  const formRef = useRef(null)
  const [gender, setGender] = useState('')

  // 定義表單有哪些欄位屬性
  const [fields, setFields] = useState({
    fName: '',
    lName: '',
    birth: '',
    gender: '',
    phone: '',
  })
  // 定義表單有哪些欄位屬性
  const [fieldErrors, setFieldErrors] = useState({
    fName: '錯誤訊息',
    lName: '',
    birth: '',
    gender: '',
    phone: '',
  })

  // 處理每個欄位的變動
  const handleFieldChange = (e) => {
    console.log(
      '訊息',
      e.target.name,
      e.target.type,
      e.target.value,
      e.target.checked
    )

    // 更新輸入欄位
    const updatedFields = {
      ...fields,
      [e.target.name]: e.target.value,
    }

    setFields(updatedFields)
  }

  // 處理表單送出
  const handleSubmit = (e) => {
    // 阻擋表單送出預設行為
    e.preventDefault()

    // FormData
    const data = new FormData(e.target)

    console.log(data.get('email'))
    console.log(data.get('password'))

    // 利用狀態來得到輸入的值
    console.log(fields)

    // ex. 送出表單資料到伺服器
    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // })
  }

  // form有更動會觸發這個函式
  const handleChange = (e) => {
    console.log('更動欄位：', e.target.name)

    // 該欄位錯誤訊息清空
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: '',
    }

    setFieldErrors(updatedFieldErrors)
  }

  // 有錯誤的訊息會觸發在這裡
  const handleInvalid = (e) => {
    e.preventDefault()

    // 表單實體的物件參照
    const form = formRef.current

    let errorMsg = {}

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i]

      if (
        element.tagName !== 'button' &&
        element.willValidate &&
        !element.validity.valid
      ) {
        // 必填用預設訊息，但錯誤格式驗証用title中的字串
        if (element.validity.valueMissing) {
          errorMsg = {
            ...errorMsg,
            [element.name]: element.validationMessage,
          }
        } else {
          errorMsg = {
            ...errorMsg,
            [element.name]: element.title,
          }
        }
      }
    }
  }

  return (
    <>
      <div className="d-flex mb-content mx-auto ">
        {/* 之後補做 */}
        <div>麵包屑</div>
        <MbAside />

        <div
          className="
        mb-right-content"
        >
          <h2>會員基本資料</h2>
          <hr />
          <div className="d-flex mb-5">
            <div className="avatar200 ml-5">
              <img
                src="https://i.kfs.io/playlist/global/62588733v1/fit/500x500.jpg"
                alt="123"
              />
            </div>
            <button
              className="mb-avatar-button mb-yellow mt-auto"
              onClick={() => {}}
            >
              更換大頭貼
            </button>
          </div>
          {/* 表單開始 */}
          <form
            name="mb-profile-form"
            className="row"
            ref={formRef}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onInvalid={handleInvalid}
          >
            <div className="mb-input-box">
              <label>姓：</label>
              <input
                type="text"
                name="fName"
                value={fields.fName}
                onChange={handleFieldChange}
                placeholder="請輸入您的姓"
              />
            </div>
            <div className="mb-input-box">
              <label>名：</label>
              <input
                type="text"
                name="lName"
                value={fields.lName}
                onChange={handleFieldChange}
                placeholder="請輸入您的名"
              />
            </div>
            <div className="mb-input-box">
              <label>生日：</label>
              <input
                type="date"
                value={fields.birth}
                name="birth"
                onChange={handleFieldChange}
              ></input>
            </div>
            <div className="mb-redio-box">
              <label className="">性別：</label>
              <br />
              <input
                type="radio"
                value="男"
                name="gender"
                checked={fields.gender === '男'}
                onChange={handleFieldChange}
              />
              男生
              <input
                type="radio"
                value="女"
                name="gender"
                checked={fields.gender === '女'}
                onChange={handleFieldChange}
              />
              女生
            </div>

            <div className="mb-input-box">
              <label>手機號碼：</label>
              <input
                type="text"
                value={fields.phone}
                name="phone"
                onChange={handleFieldChange}
              />
            </div>
          </form>
          <button onClick={() => {}} className="my-5 mb-yellow mb-button">
            確認修改
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberProfile)
