import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import EditPage from '../../components/member/EditPage'

function AddressBookEdit(props) {
  const { usersaddress,setUsersaddress } = props

  return (
    <>
      <EditPage usersaddress={usersaddress} setUsersaddress={setUsersaddress}/>
    </>
  )
}

export default AddressBookEdit
