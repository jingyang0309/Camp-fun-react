import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'

function EditPage(props) {
  const { usersaddress } = props
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        className="mb-button mb-yellow d-block mt-2"
      >
        編輯
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        usersaddress={usersaddress}
      />
    </>
  )
}

export default EditPage
