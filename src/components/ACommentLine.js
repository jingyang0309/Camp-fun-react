import React, { useState, useEffect } from 'react'
// import { withRouter, Link, useParams } from 'react-router-dom'
import Profile from '../images/profile.png'

function ACommentLine(props) {
  const { comment, setComment, getCommentFromServer } = props
  const { auth, setAuth } = props
  const avatarPath = 'http://localhost:4000/img/'
  const [reply, setReply] = useState('')
  const [cId, setCId] = useState('')
  const [select, setSelect] = useState('')
  console.log('auth', auth)
  const mId = sessionStorage.getItem('mId')
  console.log(mId)

  // 送出回覆
  async function sendReplyToServer(e) {
    e.preventDefault()
    const newReply = {
      reply: reply,
    }
    const url = `http://localhost:4000/articles/comment/${cId}`
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(newReply),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    // 收合編輯
    setSelect(null)
    // 清空回覆
    setReply('')
    // 即時顯示下方留言
    setTimeout(() => {
      getCommentFromServer()
    }, 500)
  }

  useEffect(() => {
    getCommentFromServer()
  }, [])

  // ------
  return (
    <>
      <div>
        <div>
          {comment.length &&
            comment.map((value, index) => {
              return (
                <div key={value.id} className="media articleCommentGroup mt-5">
                  {/* 會員留言頭像 */}
                  <div className="articleCommentImg">
                    <img
                      className="d-flex rounded-circle avatar z-depth-1-half mr-3"
                      alt="Avatar"
                      src={value.avatar ? avatarPath + value.avatar : Profile}
                    />
                  </div>
                  {/* 會員留言顯示 */}
                  <div className="media-body ml-3">
                    <h5 className="mt-0 font-weight-bold articleUser">
                      {value.name}
                    </h5>
                    {value.content}

                    <div className="articleReplySet media-body mt-3 d-flex flex-column ">
                      {/* 商家回覆 */}
                      {mId && mId == 999 && (
                        <>
                          {/* 判斷是否為管理員顯示編輯畫面 */}
                          <button
                            className="btn btn-outline-secondary articleReplyOn"
                            onClick={() => {
                              select === value.cId
                                ? setSelect(null)
                                : setSelect(value.cId)
                            }}
                          >
                            點選編輯
                          </button>

                          {/* 選擇流水號個別回覆留言 */}
                          {value.cId === select && (
                          <form
                              className="articleReplyForm"
                              onSubmit={sendReplyToServer}
                            >
                              <input
                                className="articleReplyInput input-group ml-auto my-1"
                                type="text"
                                value={reply}
                                onChange={(e) => {
                                  setReply(e.target.value)
                                  setCId(value.cId)
                                }}
                              />
                              <button
                                className="articleReplyInputBtn btn btn-outline-secondary ml-auto my-1"
                                type="submit"
                                onClick={() => {
                                  // sendReplyToServer()
                                }}
                              >
                                送出回覆
                              </button>
                            </form>
                          )}
                        </>
                      )}
                      {/* {console.log(reply)} */}
                      {/* 顯示回覆文字 */}
                      {value.reply ? (
                        <div className="articleReplyGroup d-flex mt-5">
                          <div className="articleCommentImg">
                            <img
                              className="rounded-circle avatar mr-3"
                              alt="Avatar"
                              src={Profile}
                            />
                          </div>
                          <div className="articleReply ml-3">
                            <div>{value.reply}</div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default ACommentLine
