import React from 'react'

function Session(props) {
  async function send() {
    // fetch('http://localhost:4000/member/try-sess', {
    //   // 設定include 才有cookie
    //   credentials: 'include',
    // })
    //   .then((r) => r.json())
    //   .then((data) => {
    //     console.log(data)
    //   })
    const url = 'http://localhost:4000/member/try-sess'
    const request = new Request(url, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
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
