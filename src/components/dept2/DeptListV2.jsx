import { Button, Modal } from "react-bootstrap"
import { MyInput } from "../style/FormStyle"
import { useState } from "react"
import DeptRowV2 from "./DeptRowV2"

const DeptListV2 = ({depts, onAddItem}) => {
  const [deptno, setDeptno] = useState(0)
  const [dname, setDname] = useState('')
  const [loc, setLoc] = useState('')
  //새로운 부서 등록처리
  //새로 입력받은 값을 어디에서 있지? setDeptno, setDname, setLoc
  const deptInsert = () => {
    const newDept = {
      deptno,
      dname,
      loc,
    }
    //모달창 닫기
    handleClose()
    //저장처리 - Parent
    //insert here
    onAddItem(newDept)

  }
  //이벤트 소스에서 변경사항을 감지하여 e.target.value했기에
  //값이 들어 있다.
  const handleDeptno = (value) => {
    setDeptno(value)
  }
  const handleDname = (value) => {
    setDname(value)
  }
  const handleLoc = (value) => {
    setLoc(value)
  }
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
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
              <DeptRowV2 key={key} dept={depts[key]} />
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
            <MyInput type="text" id="deptno" placeholder="Enter 부서번호" onChange={(e)=>{handleDeptno(e.target.value)}} />
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

export default DeptListV2