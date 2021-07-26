const CartHover123 = (props) => {
  const { getSession } = props
  // const loadingRef = useRef(true))
  // const [getSession, setGetSession] = useState('')
  //node的接收商品
  // const sessionServer = async () => {
  //   // const newData = new Request()
  //   const url = `http://localhost:4000/cart`
  //   const request = new Request(url, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       // 'Content-Type': 'application/json',
  //     }),
  //   })
  //   const response = await fetch(request)
  //   const data = await response.json()
  //   // const myData = await data.credentials
  //   console.log('data', data)
  //   loadingRef.current = false
  //   setGetSession(data)
  // }
  // setTimeout(() => {
  //   sessionServer()
  // }, 10000)
  // console.log('hove', getSession)
  // useEffect(() => {
  //   sessionServer()
  // }, [])
  // if (!getSession === 0) sessionServer()
  return (
    <>
      {getSession?.length > 0 && (
        <div className="cartHover hovertest ">
          {getSession?.map((v, i) => {
            return (
              <div className="d-flex row mt-2  " key={i}>
                <div className="col  col-12">{v.product_name}</div>
                <div className="col  col-12 d-flex mt-1">
                  <div className="col col4 ">
                    <img className=" w-50" src={v.product_oimg} alt="" />
                  </div>
                  <div className="col col4  price">${v.product_price}</div>
                  <div className="col col4   price">數量：{v.quantity}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default CartHover123
