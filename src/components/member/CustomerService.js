import React, { useState } from 'react'
import CustomersServiceWindow from './CustomersServiceWindow'

function CustomerService(props) {
  const { auth } = props
  const [csSWindow, setCsSWindow] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)
  return (
    <>
      {csSWindow ? (
        ''
      ) : (
        <div
          className="mb-cs-icon"
          onClick={() => {
            setCsSWindow(!csSWindow)
            setAutoRefresh(true)
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
          setCsSWindow={setCsSWindow}
          auth={auth}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default CustomerService
