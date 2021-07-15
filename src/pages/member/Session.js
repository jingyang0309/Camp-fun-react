import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

// ------------此頁已經改為測試用頁面------------

function Session(props) {
  async function send() {
    fetch('http://localhost:4000/member/losepassword/', {
      method: 'GET',
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <>
      <button
        className="mb-button mb-red-orange mb-address-button-margin d-block"
        confirm
        onClick={() => {
          send()
        }}
      >
        發信
      </button>
    </>
  )
}

export default Session
