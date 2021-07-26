import React, { useState, useRef } from 'react'
import { Modal } from 'react-bootstrap'
// import { withFormik, Form, Field, ErrorMessage, Formik } from 'formik'
// import * as Yup from 'yup'
import Swal from 'sweetalert2'
//加入卡片翻轉
import Cards from 'react-credit-cards'

const PaymentForm = (props) => {
  const { setModalShow, setPay } = props
  //表單的ref
  const formRef = useRef(null)
  const [focus, setFocus] = useState('')
  //定義個屬性欄位
  const [inputs, setInputs] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  })
  //每個欄位的錯誤訊息
  const [fieldErrors, setFieldErrors] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  })
  // const errMsg = {
  //   color: 'red',
  //   fontSize: '12px',
  //   paddingLeft: '5px',
  // }
  //處理每個欄位的變動
  const handelChange = (e) => {
    const newInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    }
    setInputs(newInputs)
  }
  //處理聚焦
  const handleInputFocus = (e) => {
    setFocus(e.target.name)
  }

  //form 有更動會觸發這個韓式
  const handleChange = (e) => {
    console.log('更動欄位:', e.target.name)
    //該欄位錯誤訊息清空
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: '',
    }
    setFieldErrors(updatedFieldErrors)
  }
  const handleSubmit = () => {
    // e.preventDefault()
    if (
      inputs.number.length >= 16 &&
      inputs.name !== '' &&
      inputs.expiry.length >= 4 &&
      inputs.cvc.length >= 3
    ) {
      // debugger
      setTimeout(() => {
        // setSubmitting(false)
        setPay(true)
        setModalShow(false)
        Swal.fire('認證成功!', '您的信用卡已成功認證!', 'success')
      }, 400)
    } else {
      const NewFieldErrors = {}
      if (inputs.number.length <= 15) {
        NewFieldErrors.number = '請輸入正確卡號'
      }
      if (inputs.name === '') {
        NewFieldErrors.name = '請輸入持卡人姓名'
      }
      if (inputs.expiry.length <= 4) {
        NewFieldErrors.expiry = '請輸入有效日期'
      }
      if (inputs.cvc.length <= 3) {
        NewFieldErrors.cvc = '請輸入驗證碼'
      }
      setFieldErrors(NewFieldErrors)
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          請填寫信用卡資訊
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Formik
          //先預設表格為空值
          initialValues={{
            number: '',
            name: '',
            expiry: '',
            cvc: '',
          }}
          validationSchema={Yup.object({
            number: Yup.number()
              .typeError('內容必為數字')

              .required('必填'),
            name: Yup.string().required('必填'),
            expiry: Yup.number()
              .typeError('內容必為數字')

              .required('必填'),
            cvc: Yup.number()
              .typeError('內容必為數字')

              .required('必填'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
              setModalShow(false)
              Swal.fire('認證成功!', '您的信用卡成功付款!', 'success')
            }, 400)
          }}
        > */}
        {/* {({ isSubmitting }) => ( */}
        <div
          ref={formRef}
          className="cartMain"
          id="PaymentForm"
          // onInvalid={handleInvalid}
          onChange={handleChange}
          onSubmit={() => {
            handleSubmit()
          }}
          // onClick={handleSubmit}
        >
          <br />
          <Cards
            className="cartCards"
            cvc={inputs.cvc}
            expiry={inputs.expiry}
            focused={focus}
            name={inputs.name}
            number={inputs.number}
          />
          <div
            className="cartInfoMenber cartInfoMenberRWD paymentRWD"
            ref={formRef}
            onSubmit={handleSubmit}
            // onInvalid={handleInvalid}
            onChange={handleChange}
          >
            <label>卡號:</label>
            {fieldErrors.number && (
              <small className="text-danger">{fieldErrors.number}</small>
            )}
            {/* <ErrorMessage name="number" style={{ color: 'red' }} /> */}
            <input
              className="paymentRWD"
              type="tel"
              name="number"
              placeholder="請輸入卡號"
              onChange={handelChange}
              onClick={handleInputFocus}
              maxlength="16"
              title="自訂訊息：格式錯誤"
              required
            />
            <br />

            <label>持卡人:</label>
            {fieldErrors.name && (
              <small className="text-danger">{fieldErrors.name}</small>
            )}
            {/* <ErrorMessage name="name" /> */}
            <input
              className="paymentRWD"
              type="tel"
              name="name"
              placeholder="請輸入持卡人姓名"
              onChange={handelChange}
              onFocus={handleInputFocus}
              required
            />
            <br />
            <label>有效日期:</label>
            {/* <ErrorMessage name="expiry" /> */}
            {fieldErrors.expiry && (
              <small className="text-danger">{fieldErrors.expiry}</small>
            )}
            <input
              className="paymentRWD"
              type="tel"
              name="expiry"
              maxlength="4"
              placeholder="請輸入有效日期"
              onChange={handelChange}
              onFocus={handleInputFocus}
              minLength="4"
              required
            />
            <br />
            <label>驗證碼:</label>
            {fieldErrors.cvc && (
              <small className="text-danger">{fieldErrors.cvc}</small>
            )}
            {/* <ErrorMessage name="cvc" /> */}
            <input
              className="paymentRWD"
              type="tel"
              name="cvc"
              maxlength="3"
              placeholder="請輸入驗證碼"
              onChange={handelChange}
              onFocus={handleInputFocus}
              required
            />
            <br />
            <div className="cartPayBtn">
              <button onClick={() => setModalShow(false)}>取消</button>
              <button
                // type="submit"
                ref={formRef}
                onClick={() => {
                  handleSubmit()
                }}
              >
                送出
              </button>
            </div>
            <br />
          </div>
        </div>
        {/* )} */}
        {/* </Formik> */}
        {/* <div className="cartMain col-12">
          <form action="">
            <div id="PaymentForm">
              <Cards />
            </div>
            <label htmlFor="">卡號:</label>
            <br />
            <input type="text" placeholder="卡號" />
            <br />
            <label htmlFor="">持卡人姓名:</label>
            <br />
            <input type="text" placeholder="持卡人姓名" />
            <br />
            <label htmlFor="">有效日期:</label>
            <br />
            <input type="text" style={{ width: '180px' }} placeholder="MM/YY" />
            <br />
            <label htmlFor="">驗證碼:</label>
            <br />
            <input type="text" style={{ width: '180px' }} placeholder="XXX" />
            <br />
          </form>
        </div> */}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  )
}

export default PaymentForm
