import React, { useState } from 'react'
import CustomersServiceWindow from './CustomersServiceWindow'

function CustomerService(props) {
  const { auth } = props
  const [csSWindow, serCsSWindow] = useState(false)
  return (
    <>
      {csSWindow ? (
        ''
      ) : (
        <div
          className="mb-cs-icon"
          onClick={() => {
            serCsSWindow(!csSWindow)
          }}
        >
          <img
            src="http://localhost:4000/img/CustomersServiceIcon.png"
            alt="CustomersServiceIcon"
          />
        </div>
      )}
      {csSWindow ? (
        <CustomersServiceWindow
          csSWindow={csSWindow}
          serCsSWindow={serCsSWindow}
          auth={auth}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default CustomerService
