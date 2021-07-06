import React from 'react'

function Session(props) {
  function send() {
    fetch('http://localhost:4001/try-sess', {
      // 設定include 才有cookie
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <>
      <h1>Session</h1>
      <button
        onClick={() => {
          send()
        }}
      >
        send
      </button>
    </>
  )
}

export default Session
