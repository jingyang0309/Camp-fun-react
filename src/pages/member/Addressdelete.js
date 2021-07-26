import React from 'react'
import swal from 'sweetalert2'

function Addressdelete(props) {
  const { usersaddress, usersaddressall, setusersaddressall, setDisplayMode } =
    props

  // 彈出視窗
  function ask(usersaddress) {
    swal
      .fire({
        title: '確定刪除嗎?',
        text: '建議您再看看是否有誤哦~',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F35100',
        cancelButtonColor: '#ffbb00',
        cancelButtonText: '我選錯了..',
        confirmButtonText: '刪除它',
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUserAddress(usersaddress)
          swal.fire({
            title: '刪除成功',
            text: '該筆地址已經消失於地球上',
            confirmButtonColor: '#ffbb00',
          })
        }
      })
  }

  // 發送要求給伺服器刪除地址
  async function deleteUserAddress(usersaddress) {
    const url = 'http://localhost:4000/member/address/' + usersaddress
    console.log(url)
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    // console.log(data)
    if (!data.id) {
      const newUsers = usersaddressall.filter((value, index) => {
        return value.addressId !== usersaddress
      })
      console.log('新物件', newUsers)
      setusersaddressall(newUsers)
      if (newUsers.length < 1) setDisplayMode(false)
    }
  }
  return (
    <>
      <button
        className="mb-button mb-red-orange mb-address-button-margin d-block"
        confirm
        onClick={() => {
          // console.log(usersaddress)
          // console.log(usersaddressall)
          ask(usersaddress)
          // deleteUserAddress(usersaddress)
        }}
      >
        刪除
      </button>
    </>
  )
}

export default Addressdelete
