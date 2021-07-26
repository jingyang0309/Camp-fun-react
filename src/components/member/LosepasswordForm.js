import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

function LosepasswordForm(props) {
  const { setModalShow } = props
  const [mode, setMode] = useState({
    page1: true,
    page2: false,
    page3: false,
  })
  const [getPwdEmail, setGetPwdEmail] = useState('')
  const [otg, setOtg] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [showPwd3, setShowPwd3] = useState(false)

  let nextMode = {}

  // 寄信
  const emailData = { email: getPwdEmail }

  async function send() {
    let emailRule =
      /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

    if (getPwdEmail.search(emailRule) === -1) {
      mailErrorAlert()
      return
    }

    fetch('http://localhost:4000/member/losepassword/', {
      method: 'POST',
      body: JSON.stringify(emailData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data)
      })
      .then(
        (nextMode = {
          page1: false,
          page2: true,
          page3: false,
        }),
        setMode(nextMode)
      )
  }

  // 確認驗整碼
  const otgData = { email: getPwdEmail, otg: otg }

  async function ckeckOtg() {
    if (!otg.length) {
      otgErrorAlert('未填寫驗證碼喔')
      return
    }
    const url = 'http://localhost:4000/member/checkotg'

    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(otgData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log('送出OTG後的資料: ', data)
    if (!data.success) {
      otgErrorAlert('驗證碼錯誤')
      return
    } else {
      nextMode = {
        page1: false,
        page2: false,
        page3: true,
      }
      setMode(nextMode)
    }
  }

  // 修改為新密碼
  const newPwdData = { email: getPwdEmail, newPwd: newPwd }
  // console.log(newPwdData)

  async function changeNewPwd() {
    if (newPwd.length < 6) {
      pwdErrorAlert()
      return
    }
    fetch('http://localhost:4000/member/findLostPwd/', {
      method: 'POST',
      body: JSON.stringify(newPwdData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        closeModal()
      })
  }

  // 關閉視窗
  const closeModal = () => {
    setModalShow(false)
    const mode = {
      page1: true,
      page2: false,
      page3: false,
    }
    setMode(mode)
    setGetPwdEmail('')
    setOtg('')
    setNewPwd('')
  }

  // 第一頁，寄卻忍信
  const sendMailPage = (
    <>
      <Modal
        {...props}
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ background: 'transparent' }}
      >
        <Modal.Body className="mb-losepassword">
          <h2>忘記密碼了嗎?</h2>
          <label htmlFor="getPwdEmail">電子郵件地址:</label>
          <input
            type="text"
            name="email"
            value={getPwdEmail}
            onChange={(e) => {
              setGetPwdEmail(e.target.value)
            }}
            placeholder="請輸入您的電子信箱"
            id="getPwdEmail"
          />
          <div>
            <button
              className="my-4 mb-yellow mb-button mr-3"
              onClick={() => {
                send()
              }}
            >
              確認送出
            </button>
            <button
              className="my- mb-yellow mb-button mb-red-orange"
              onClick={props.onHide}
            >
              取消
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
  // 第二頁，填寫驗證碼
  const checkOtgPage = (
    <>
      <Modal
        {...props}
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ background: 'transparent' }}
      >
        <Modal.Body className="mb-losepassword">
          <h2 style={{ marginBottom: '50px' }}>輸入安全驗證碼</h2>
          <p className="text-center">
            請查看您電子信箱中是否有包含驗證碼的信件，我們已將您的驗證碼發送至信件:
            {getPwdEmail}
          </p>
          <label htmlFor="otg">驗證碼:</label>
          <input
            type="text"
            name="otg"
            value={otg}
            onChange={(e) => {
              setOtg(e.target.value)
            }}
            placeholder="請輸入驗證碼"
            id="otg"
          />
          <div>
            <button
              className="my-4 mb-yellow mb-button mr-3"
              onClick={() => {
                ckeckOtg()
              }}
            >
              送出驗證碼
            </button>
            <button
              className="my- mb-yellow mb-button mb-red-orange"
              onClick={() => {
                closeModal()
              }}
            >
              取消
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
  // 第三頁，更改密碼
  const changeNewPwdPage = (
    <>
      <Modal
        {...props}
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ background: 'transparent' }}
      >
        <Modal.Body className="mb-losepassword">
          <h2 style={{ marginBottom: '50px' }}>更改新密碼</h2>
          <p className="text-center">
            請設定長度至少6個字元的新密碼。
            {getPwdEmail}
          </p>
          <label htmlFor="newPwd">新密碼:</label>
          <input
            type={showPwd3 ? 'text' : 'password'}
            name="email"
            value={newPwd}
            onChange={(e) => {
              setNewPwd(e.target.value)
            }}
            placeholder="請輸入新密碼"
            id="newPwd"
          />
          <div className="mb-show-pwd3">
            <img
              src={showPwd3 ? './images/eye.png' : './images/eye2.png'}
              alt="showPwd"
              onClick={() => {
                setShowPwd3(!showPwd3)
              }}
            />
          </div>
          <div>
            <button
              className="my-4 mb-yellow mb-button mr-3"
              onClick={() => {
                changeNewPwd()
              }}
            >
              設定新密碼
            </button>
            <button
              className="my- mb-yellow mb-button mb-red-orange"
              onClick={() => {
                closeModal()
              }}
            >
              取消
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )

  function mailErrorAlert() {
    Swal.fire({
      icon: 'warning',
      title: '挖哩勒...',
      text: '請填寫正確的電子信箱',
      confirmButtonColor: '#ffbb00',
    })
  }
  function otgErrorAlert(msg) {
    Swal.fire({
      icon: 'error',
      title: '挖哩勒...',
      text: msg,
      confirmButtonColor: '#ffbb00',
    })
  }
  function pwdErrorAlert() {
    Swal.fire({
      icon: 'warning',
      title: '挖哩勒...',
      text: '密碼至少要六個字喔',
      confirmButtonColor: '#ffbb00',
    })
  }
  return (
    <>
      {mode.page1 ? sendMailPage : ''}
      {mode.page2 ? checkOtgPage : ''}
      {mode.page3 ? changeNewPwdPage : ''}
    </>
  )
}

export default LosepasswordForm
