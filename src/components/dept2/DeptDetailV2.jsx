import { Button, Card, ListGroup, Modal } from "react-bootstrap"
import Footer from "../include/Footer"
import Header from "../include/Header"
import { Link, useParams } from "react-router-dom"
import { MyInput } from "../style/FormStyle"
import { useEffect, useState } from "react"
import "../css/dept.css"
//props가 바뀌어도 다시 그린다
const DeptDetailV2 = ({depts, onDeleteItem, onUpdateItem}) => {
  const { p_deptno } = useParams()
  const [dname, setDname] = useState('')
  const [loc, setLoc] = useState('')
  console.log("p_deptno : "+p_deptno);//0이거나 null 되지 않도록 주의

  useEffect(() =>{
    const deptItem = depts.find(item => item.deptno == p_deptno)
    console.log(deptItem);
    setDept({...deptItem})
  },[p_deptno])//파라미터로 받아오는 부서번호가 변경될 때만 호출함

  const handleDname = (value) => {
    setDname(value)
  }
  const handleLoc = (value) => {
    setLoc(value)
  }
  const [ dept, setDept] = useState({
    deptno: 0,
    dname: '',
    loc: '',
  })
  const deptUpdate = () => {
    const udept = {
      deptno: p_deptno,
      dname: dname,
      loc: loc,
    }
    console.log(udept);
    handleClose()
    onUpdateItem(udept)
  }
  const deptDelete = () => {
    const dept = {
      deptno: p_deptno,
      dname: '',
      loc: '',
    }
    //handleClose호출하지 않아도 됨. 왜냐면 모달을 열지 않았으니까...
    onDeleteItem(dept)
  }
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Header />
      <div className="container">
        <div className="page-header">
          <h2>부서관리 <small>부서상세</small></h2>
          <hr />
        </div>
        <Card style={{ width: '58rem' }}>
          <ListGroup variant="flush">
            <ListGroup.Item>부서번호 : {dept.deptno}</ListGroup.Item>
            <ListGroup.Item>부서명 : {dept.dname}</ListGroup.Item>
            <ListGroup.Item>지역 : {dept.loc}</ListGroup.Item>
          </ListGroup>
          <div className='detail-link'>
            <Button variant="success" onClick={handleShow}>
              수정
            </Button>
            &nbsp;
            <Button variant="danger" onClick={deptDelete}>
              삭제
            </Button>
            &nbsp;
            <Link to="/dept2" className='nav-link'>부서목록</Link>
          </div>
        </Card>   
        <hr />
      {/* ========================== [[ 수정 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>테스트수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={{display: 'flex'}}>
              <MyInput type="text" id="deptno" value={dept.deptno} readOnly placeholder="Enter 부서번호" />
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
          <Button variant="primary" onClick={deptUpdate}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>     
      {/* ========================== [[ 수정 Modal ]] ========================== */}          
      </div>
      <Footer />
    </>
  )
}

export default DeptDetailV2