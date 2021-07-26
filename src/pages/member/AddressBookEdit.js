import React, { useEffect, useRef, useState } from 'react'
import EditPage from '../../components/member/EditPage'

function AddressBookEdit(props) {
  const { usersaddress, setUsersaddress } = props

  return (
    <>
      <EditPage usersaddress={usersaddress} setUsersaddress={setUsersaddress} />
    </>
  )
}

export default AddressBookEdit
