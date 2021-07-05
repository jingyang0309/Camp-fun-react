import React from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/MbAside'

function MenberProfile(props) {
  return (
    <>
      <div className="d-flex mb-content mx-auto ">
        {/* 之後補做 */}
        <div>麵包屑</div>
        <MbAside />

        <div
          className="
        mb-right-content"
        >
          <h2>會員基本資料</h2>
          <hr />
          <div className="d-flex mb-5">
            <div className="avatar200 ml-5">
              <img
                src="https://i.kfs.io/playlist/global/62588733v1/fit/500x500.jpg"
                alt="123"
              />
            </div>
            <button
              className="mb-avatar-button mb-yellow mt-auto"
              onClick={() => {}}
            >
              更換大頭貼
            </button>
          </div>
          <form
            action=""
            method="POST"
            name="mb-profile-form"
            className="row"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <div className="mb-input-box">
              <label>姓：</label>
              <input type="text" />
            </div>

            <div className="mb-input-box">
              <label>名：</label>
              <input type="text" />
            </div>
            <div className="mb-input-box">
              <label>生日：</label>
              <input type="date"></input>
            </div>
            <div className="mb-radio-box row">
              <label className="ml-3">性別：</label>
              <hr />
              <input type="radio" />
              男生
              <input type="radio" />
              女生
            </div>

            <div className="mb-input-box">
              <label>手機號碼：</label>
              <br />
              <input type="text" />
            </div>
          </form>
          <button onClick={() => {}}>確認修改</button>
        </div>
      </div>
    </>
  )
}

export default withRouter(MenberProfile)
