import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'

import MbAside from '../../components/member/MbAside'

function AdressBook(props) {
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
          <div className="d-flex justify-content-between">
            <h2>我的收件地址</h2>
            <button
              className="mb-avatar-button mb-blue mt-auto mr-5"
              onClick={() => {
                props.history.push('/member/adressbookadd')
              }}
            >
              + 新增地址
            </button>
          </div>
          <hr />
          <div className="mb-adressBook-icon mx-auto ">
            <img
              src="../svg/adressBook-gray.svg"
              alt="adressBook"
            ></img>
          </div>
          <h2 className="text-center">
            收件地址空空如也...
          </h2>
        </div>
      </div>
    </>
  )
}

export default withRouter(AdressBook)
