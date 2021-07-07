import React from 'react'
import $ from 'jquery'

function Avatar(props) {
  const avatar = $('#avatar')

  avatar.on('change', (e) => {
    console.log(this)
    console.log(e.target) // 事件觸發的來源(最內層的元素)
    console.log(e.currentTarget) //註冊事件處理器的物件
    /* JQ的on(xxxx,()=>{})
        會導致this變成windows */
    const fd = new FormData(document.form1)
    fetch('http://localhost:4000/member/try-upload', {
      method: 'POST',
      body: fd,
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
  })
  return (
    <>
      <div class="d-flex mb-5">
        <div className="avatar200 ml-5">
          <img src="" alt="" id="myimg" />
        </div>
        <form name="form1">
          <div class="form-group">
            <label className="mb-avatar-button mb-yellow mt-auto d-flex align-items-center justify-content-center">
              <input
                type="file"
                id="avatar"
                name="avatar"
                style={{ display: 'none' }}
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
