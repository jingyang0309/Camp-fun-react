import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

function Session(props) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // deleteUserAddress(usersaddress[i].addressId)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

  

  return (
    <>
      <button
        className="mb-button mb-red-orange mb-address-button-margin d-block"
        confirm
        onClick={() => {
          // console.log(usersaddress[i].addressId)
          Swal.fire()
        }}
      >
        刪除
      </button>
    </>
  )
}

export default Session
