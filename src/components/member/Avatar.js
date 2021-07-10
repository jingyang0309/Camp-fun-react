import React, { useEffect } from 'react'
import $ from 'jquery'

function Avatar(props) {
  const avatar = $('#avatar')

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
      body: fd,token,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj)
        if (obj.filename) {
          let pic = obj.filename
          $('#myimg').attr(
            'src',
            'http://localhost:4000/img/' + pic
          )
        }
      })
  }
  return (
    <>
      <div class="d-flex mb-5">
        <div className="avatar200 ml-5">
          <img src="./../images/avatar.png" alt="" id="myimg" />
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
