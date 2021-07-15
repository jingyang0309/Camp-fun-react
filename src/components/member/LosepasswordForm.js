import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

function LosepasswordForm(props) {
  const [getPwdEmail, setGetPwdEmail] = useState()
  const [otg, setOtg] = useState()

  // 寄信
  const emailData = { email: getPwdEmail }
  console.log(emailData)
  async function send() {
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
        console.log(data)
      })
  }

  // 確認驗整馬
  const otgData = { email: getPwdEmail, otg: otg }
  console.log(emailData)

  async function ckeckOtg() {
    fetch('http://localhost:4000/member/losepassword/', {
      method: 'POST',
      body: JSON.stringify(otgData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }

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
  return (
    <>
      <Modal
        {...props}
        size=""
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ background: 'transparent' }}
      >
        <Modal.Body className="mb-losepassword">
          <h2 style={{ marginBottom: '50px' }}>
            輸入安全驗證碼
          </h2>
          <p className="text-center">
            請查看您電子信箱中是否有包含驗證碼的信件，您的驗證碼長度為6位數，我們已將信件發送至:
            {getPwdEmail}
          </p>
          <label htmlFor="otg">驗證碼:</label>
          <input
            type="text"
            name="email"
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
}

export default LosepasswordForm
