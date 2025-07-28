import { useEffect, useState } from "react"
import { deptInsertDB, deptListDB } from "../../service/deptService"
import { Button, Modal } from "react-bootstrap"
import { MyInput } from "../style/FormStyle"
import { useNavigate } from "react-router-dom"
import DeptRow from "./DeptRow"
//props, useState - 비동기처리 - 부분갱신처리 - 실시간 동기화
//독인 경우 : 효율성 - 다시 그린다

const DeptList = () => {
  //새글 등록시 현재 페이지 새로고침 처리위해서 선언
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()
  const [deptno, setDeptno] = useState(0)
  const [dname, setDname] = useState('')
  const [loc, setLoc] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)  //글쓰기버튼 -> 모달창 보여줘
  const [ depts, setDepts] = useState([])
  const deptInsert = async() => {
    const dept = {
      deptno: deptno,//앞에는 호출하는 이름:값이 저장된 훅이름
      dname: dname,
      loc: loc
    }
    handleClose()
    const res = await deptInsertDB(dept) //1:입력성공 or 0:입력실패
    console.log(res);
    console.log(res.data);
    if(!res.data) console.log('등록 실패')
    else setRefresh((prev) => prev+1)
  }
  const handleDeptno = (value) => {
    setDeptno(value)
  }
  const handleDname = (value) => {
    setDname(value)
  }
  const handleLoc = (value) => {
    setLoc(value)
  }
  const deptList = async () => {
    const dept = {
      deptno: 0,
      dname: '',
      loc: ''
    }
    const res = await deptListDB(dept)
    setDepts(res.data)
    //setDepts(res)
  }
  //목록을 새로 가지고 오기 위해서 state훅을 하나 선언함
  //초기값은 0으로 하였고 변경점이 발생하면 0에 1을 더해서
  //상태값을 강제로 변경함
  useEffect(()=>{
    //의존성 배열에 있는 refresh값이 변경될 때마다 
    //아래 함수가 매번 다시 호출된다.
    deptList()
  },[refresh])
  return (

    <>

      <div className='container'>
        <div className='page-header'>
          <h2>부서관리<small>부서목록</small></h2>
          <hr />
        </div>
        <div className='test-list'>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>부서번호</th>
                <th>부서명</th>
                <th>지역</th>
              </tr>
            </thead>
            {/* 데이터셋 연동하기 */}
            {/* props로 넘어온 상태값이 빈 깡통이면 실행하지 않기 */}
            <tbody>
            {Object.keys(depts).map(key => (
              <DeptRow key={key} dept={depts[key]} />
            ))}
            </tbody>
            {/* 데이터셋 연동하기 */}
          </table>
          <hr />
          <div className='list-footer'>
          <button className="btn btn-warning" onClick={()=> console.log('전체조회')}>전체조회</button>
          &nbsp;
          <button  className="btn btn-success" onClick={handleShow}>글쓰기</button>
          </div>  
        </div>      
      </div>

    {/* ========================== [[ 테스트등록 Modal ]] ========================== */}
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>부서등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="deptno" placeholder="Enter 부서번호" onChange={(event)=>{handleDeptno(event.target.value)}} />
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="dname" placeholder="Enter 부서명" onChange={(e)=>{handleDname(e.target.value)}}/>
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="loc" placeholder="Enter 지역" onChange={(e)=>{handleLoc(e.target.value)}}/>
          </div>
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={deptInsert}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>     
    {/* ========================== [[ 테스트등록 Modal ]] ========================== */}   

    </>

  )
}

export default DeptList