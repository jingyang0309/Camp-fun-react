import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

// ------------此頁已經改為測試用頁面------------

function Session(props) {
  async function swalert() {
    Swal.fire({
      icon: 'warning',
      title: '你把我灌醉',
      text: '你讓我流淚',
    })
  }

  return (
    <>
      <button
        className="mb-button mb-red-orange mb-address-button-margin d-block"
        confirm
        onClick={() => {
          swalert()
        }}
      >
        發信
      </button>
    </>
  )
}

export default Session
