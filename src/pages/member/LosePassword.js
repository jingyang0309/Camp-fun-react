import React from 'react'
import LosepasswordForm from '../../components/member/LosepasswordForm'

function LosePassword(props) {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <>
      <div className="mb-losepwd">
        <p onClick={() => setModalShow(true)}>忘記密碼?</p>
      </div>
      <LosepasswordForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
      />
    </>
  )
}

export default LosePassword
