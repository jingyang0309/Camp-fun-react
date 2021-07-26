import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import '../../styles/OrderCheck.css'
import MainLogo from '../../images/logo.svg' //logo檔案
import { CgFileDocument } from 'react-icons/cg'
import { FiPhone } from 'react-icons/fi'
import { RiInboxUnarchiveLine } from 'react-icons/ri'

const CartCheck = () => {
  const history = useHistory()
  const [state, setState] = useState({
    useOrderId: '',
    useOrderCell: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [checkOrder, setCheckOrder] = useState()

  const useOrderIdRef = useRef()
  const useOrderCellRef = useRef()

  //查詢訂單
  const checkOrderServer = async (e) => {
    e.preventDefault()
    const isInvalid = validateInput()
    if (!isInvalid) {
      // const newData = {}
      const url = `http://localhost:4000/cartorder/ordercheck/${state.useOrderId}/${state.useOrderCell}`
      const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          // 'Content-Type': 'application/json',
        }),
      })
      const response = await fetch(request)
      const data = await response.json()
      console.log(data)
      setCheckOrder(data)
      if (data == '找不到資料') {
        setTimeout(() => {
          Swal.fire('找不到資料!', '請重新確認!', 'error')
        }, 500)
        return
      }
      //跳轉到下一頁
      history.push('/cartcheckorder', {
        useOrderId: state.useOrderId,
        useOrderCell: state.useOrderCell,
      })
      
    }
  }

  function setPage() {
    document.querySelector('nav').style.display = 'none'
  }
  //以下全處理訂單
  useEffect(() => {
    useOrderIdRef.current.focus()
    setPage()
  }, [])
  //先隱藏NAV

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const validateInput = () => {
    const fields = [
      {
        name: 'useOrderId',
        value: state.useOrderId,
        message: '錯誤:請輸入訂單編號',
      },
      {
        name: 'useOrderCell',
        value: state.useOrderCell,
        message: '錯誤:請輸入收件人電話',
      },
    ]
    const isNotFilled = fields.some((field) => {
      if (field.value.trim() === '') {
        setErrorMsg(field.message)
        field.name === 'useOrderId'
          ? useOrderIdRef.current.focus()
          : useOrderCellRef.current.focus()
        return true
      }
      setErrorMsg('')
      return false
    })
    return isNotFilled
  }

  //   const handleOnSubmit = (event) => {
  //     event.preventDefault()
  //     const isInvalid = validateInput()
  //     if (!isInvalid) {
  //       setSuccessMsg("You're good to go!")
  //     } else {
  //       setSuccessMsg('')
  //     }
  //   }
  return (
    <Container className="chk-board" fluid>
      <Row className="chk-board-login" mx-auto>
        <Col className="chk-" md={12}>
          <div className="chk-board-title text-center">
            <a href="/">
              <img className="chk-board-logo" src={MainLogo} alt="" />
            </a>
            <br />
            <h1>
              <RiInboxUnarchiveLine />
              門市專用提貨頁面
            </h1>

            {successMsg && <p className="successMsg">{successMsg}</p>}
          </div>
        </Col>
        <div className="chk-board-form col-md-6 offset-md-3 mt-5">
          <Form onSubmit={checkOrderServer}>
            <Form.Group controlId="email">
              <Form.Label>
                <CgFileDocument />
                訂單編號
              </Form.Label>
              <Form.Control
                type="cel"
                name="useOrderId"
                ref={useOrderIdRef}
                value={state.useOrderId}
                placeholder="輸入訂單編號"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>
                <FiPhone />
                收件人電話
              </Form.Label>
              <Form.Control
                type="cel"
                name="useOrderCell"
                ref={useOrderCellRef}
                value={state.useOrderCell}
                placeholder="輸入電話"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="chk-board-submit">
              <Button className="chk-go-btn" type="submit" variant="warning">
                查詢
              </Button>
              <br />
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            </div>
          </Form>
        </div>
      </Row>
    </Container>
  )
}

export default CartCheck
