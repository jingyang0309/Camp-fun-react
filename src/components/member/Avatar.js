import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Swal from 'sweetalert2'

function Avatar(props) {
  const { auth, setAuth, fields, setFields } = props
  // const [avatarFilename, setAvatarFilename] = useState(
  //   auth.avatar
  // )
  const [loginAuth, setLoginAuth] = useState(auth)

  const avatar = $('#avatar')

  // 大頭貼預設路徑(前段)
  const avatarPath = 'http://localhost:4000/img/'

  const avatarUpload = (e) => {
    // console.log('this:' + this)
    // console.log('e.target' + e.target) // 事件觸發的來源(最內層的元素)
    // console.log('e.currentTarget' + e.currentTarget) //註冊事件處理器的物件
    /* JQ的on(xxxx,()=>{})
        會導致this變成windows */
    const fd = new FormData(document.form1)
    const token = localStorage.getItem('token')
    fetch('http://localhost:4000/member/avatarUpload', {
      method: 'PUT',
      body: fd,
      token,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj)
        if (obj.avatar) {
          let pic = obj.avatar
          $('#myimg').attr('src', 'http://localhost:4000/img/' + pic)
          let copyAuth = auth
          setLoginAuth({
            login: true,
            avatar: pic,
            email: copyAuth.email,
            nickname: copyAuth.nickname,
          })
          okAlert()
        }
      })
  }
  // useEffect(() => {
  //   let object = {avatar: avatarFilename}
  //   let copyAuth = Object.assign(auth,object)
  //   setAuth(copyAuth)
  // }, [avatarFilename])
  useEffect(() => {
    setAuth(loginAuth)
  }, [loginAuth])

  function okAlert() {
    Swal.fire({
      icon: 'success',
      title: '更換成功',
      text: '秀出你的大頭貼 !',
      confirmButtonColor: '#ffbb00',
    })
  }
  return (
    <>
      {/* <button
        onClick={() => {
          console.log(auth)
        }}
      >
        console.log(auth)
      </button> */}
      <div class="d-flex mb-5">
        <div className="avatar200 ml-5">
          {/* <img
            src="./../images/avatar.png"
            alt=""
            id="myimg"
          /> */}

          <img
            src={
              auth.avatar ? avatarPath + auth.avatar : './../images/avatar.png'
            }
            alt="avatar"
            id="myimg"
          />
        </div>
        <form name="form1">
          <div className="form-group">
            <label className="mb-avatar-button mb-yellow mt-auto d-flex align-items-center justify-content-center">
              <input
                type="file"
                id="avatar"
                name="avatar"
                style={{ display: 'none' }}
                onChange={avatarUpload}
              />
              上傳圖片
            </label>
          </div>
        </form>
        <br />
      </div>
    </>
  )
}

export default Avatar
