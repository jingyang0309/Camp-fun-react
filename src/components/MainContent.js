import React from 'react'

// 會員中心的肚子
function MainContent(props) {
  return (
    <>
      <main role="main" className="flex-shrink-0">
        <div className="container">{props.children}</div>
      </main>
    </>
  )
}

export default MainContent
