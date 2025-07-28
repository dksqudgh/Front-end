import { Link } from 'react-router-dom'

const DeptRow = ({dept}) => {
  return (
    <>
      <tr>
        <td>{dept.deptno}</td>
        <td>
          <Link to={"/deptDetail/"+dept.deptno}>{dept.dname}</Link>
        </td>
        <td>{dept.loc}</td>
      </tr>
    </>
  )
}

export default DeptRow