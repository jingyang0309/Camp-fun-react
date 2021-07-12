import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import EditPage from '../../components/member/EditPage'

function AddressBookEdit(props) {
  const { usersaddress } = props

  return (
    <>
      <EditPage usersaddress={usersaddress}/>
    </>
  )
}

export default AddressBookEdit
