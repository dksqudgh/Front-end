import { Link } from 'react-router-dom'

const DeptRowV2 = (props) => {
  const {deptno, dname, loc} = props.dept
  return (
    <>
      <tr>
        <td>{deptno}</td>
        <td>
          <Link to={"/deptDetail2/"+deptno}>{dname}</Link>
        </td>
        <td>{loc}</td>
      </tr>
    </>
  )
}

export default DeptRowV2