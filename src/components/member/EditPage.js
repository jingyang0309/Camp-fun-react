import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import EditPageForm from './EditPageForm'

function EditPage(props) {
  const { usersaddress, setUsersaddress } = props
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <>
      <button
        onClick={() => setModalShow(true)}
        className="mb-button mb-yellow d-block mt-2"
      >
        編輯
      </button>

      <EditPageForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        usersaddress={usersaddress}
        setModalShow={setModalShow}
        setUsersaddress={setUsersaddress}
      />
    </>
  )
}

export default EditPage
