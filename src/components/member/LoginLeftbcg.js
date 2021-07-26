import React, { useState } from 'react'

function LoginLeftBcg(props) {
  const [bcg, setBcg] = useState('http://localhost:4000/img/bcg/loginBcg1.jpg')

  let newBcg = ''
  autoChangbcg()
  function autoChangbcg() {
    setTimeout(() => {
      switch (bcg) {
        case 'http://localhost:4000/img/bcg/loginBcg1.jpg':
          newBcg = 'http://localhost:4000/img/bcg/loginBcg2.jpg'
          setBcg(newBcg)
          break
        case 'http://localhost:4000/img/bcg/loginBcg2.jpg':
          newBcg = 'http://localhost:4000/img/bcg/loginBcg3.jpg'
          setBcg(newBcg)
          break
        case 'http://localhost:4000/img/bcg/loginBcg3.jpg':
          newBcg = 'http://localhost:4000/img/bcg/loginBcg4.jpg'
          setBcg(newBcg)
          break

        default:
          newBcg = 'http://localhost:4000/img/bcg/loginBcg1.jpg'
          setBcg(newBcg)
          break
      }
    }, 2000)
  }
  autoChangbcg()
  return (
    <>
      <div
        className="mb-login-background-big"
        style={{
          backgroundImage: `url(${bcg})`,
          backgroundSize: 'cover',
        }}
      ></div>
      <div
        className="mb-login-background-small"
        style={{
          backgroundImage: `url(${bcg})`,
          backgroundSize: 'cover',
        }}
      ></div>
    </>
  )
}

export default LoginLeftBcg
