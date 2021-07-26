import React, { useState, useEffect } from 'react'
import { withRouter, Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function AComment(props) {
  const { getCommentFromServer } = props
  const { auth, setAuth } = props
  const { aId } = props
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
  })

  const handleChange = (e) => {
    const newInput = {
      ...formData,
      [e.target.name]: e.target.value,
    }
    setFormData(newInput)
  }

  const checkNickname = auth.nickname ? auth.nickname : auth.email
  // 傳送留言資料
  async function sendCommenttoServer(e) {
    e.preventDefault()
    // 若無輸入留言提示與禁止送出
    // if (mId)
    if (!formData.comment) {
      Swal.fire({
        icon: 'question',
        title: '沒有輸入留言？',
        text: '沒有留言內容，請重新輸入',
        confirmButtonColor: '#ffbb00',
      })
    } else {
      // 取得留言會員資料
      const mycomment = {
        mId: sessionStorage.getItem('mId'),
        name: checkNickname,
        comment: formData.comment,
        aId: aId,
      }
      // console.log('mycomment', mycomment)
      // 連接的伺服器資料網址
      const url = 'http://localhost:4000/articles/comment/add'
      // 注意header資料格式要設定，伺服器才知道是json格式
      const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(mycomment),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      // console.log('my comment', JSON.stringify(mycomment))
      const response = await fetch(request)
      const data = await response.json()

      // console.log('comment data', data.comment)
      // console.log('mycomment', mycomment.comment)

      Swal.fire({
        icon: 'success',
        title: '留言成功',
        confirmButtonColor: '#ffbb00',
      })
    }

    // 清空輸入後欄位
    setFormData({ ...formData, name: '', comment: '' })
    // 即時顯示下方留言
    setTimeout(() => {
      getCommentFromServer()
    }, 1000)
  }

  // ------

  return (
    <>
      {/* 留言表單 */}
      <form
        className="row articleComment form-group mx-3"
        onSubmit={sendCommenttoServer}
        method="post"
      >
        {/* 取得會暱稱 */}
        <h5 className="articleCheckNickname mb-2">{checkNickname}</h5>

        {/* 留言輸入 */}
        <textarea
          type="textarea"
          name="comment"
          value={formData.comment}
          className="form-control articleTextarea"
          rows="3"
          placeholder="我的留言..."
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="articleCommentSubmit my-3 ml-auto mr-3"
        >
          送出留言
        </button>
      </form>
    </>
  )
}

export default AComment
