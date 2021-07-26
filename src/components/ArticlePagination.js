import { Pagination } from 'react-bootstrap/Pagination'
import { withRouter, Link, useParams } from 'react-router-dom'

function ArticlePagination(props) {
  console.log(props)
  const { totalPages, page, setPage } = props

  function pageButtonClick(newPage) {
      if ()
  }

  let active = page
  let items = []

  for (let number = 1; number <= 5; number++) {
    if (number >= 1 && number <= totalPages) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            setPage(number)
            pageButtonClick(number)
          }}
        >
          {number}
        </Pagination.Item>
      )
    }
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
      <br />

      <Pagination size="lg">{items}</Pagination>
      <br />

      <Pagination size="sm">{items}</Pagination>
    </div>
  )

  render(paginationBasic)

  return (
    <>
      <Pagination></Pagination>
    </>
  )
}

export default withRouter(ArticlePagination)
