import React from 'react'
import { Link } from 'react-router-dom'
//-> http://localhost:3000/test -> TestPage -> TestList -> TestRow
//-> 자손이 바뀌면 부모도 다시 그려야 한다.
const TestRow = ({test}) => {
  return (
    <>
      <tr>
        <td>{test.t_no}</td>
        <td>
          <Link to={"/test/detail/"+test.t_no}>{test.t_title}</Link>
        </td>
        <td>{test.name}</td>
      </tr>
    </>
  )
}

export default TestRow