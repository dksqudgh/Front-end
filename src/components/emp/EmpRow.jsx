import React from 'react'
import { Link } from 'react-router-dom'

const EmpRow = ({emp}) => {
  const {EMPNO, ENAME, JOB, DNAME} = emp
  return (
    <>
      <tr>
        <td>{EMPNO}</td>
        <td>
          <Link to={"/empDetail/"+EMPNO}>{ENAME}</Link>
        </td>
        <td>{JOB}</td>
        <td>{DNAME}</td>
      </tr>
    </>
  )
}
export default EmpRow