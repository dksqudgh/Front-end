import { useEffect, useState } from "react"
import { Button, Card, ListGroup, Modal } from "react-bootstrap"
import { MyInput } from "../style/FormStyle"
import Footer from "../include/Footer"
import Header from "../include/Header"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deptDeleteDB, deptDetailDB, deptUpdateDB } from "../../service/deptService"
///deptDetail/:p_deptno
const DeptDetail = () => {
  const navigate = useNavigate()
  //URL 파라미터에 달려 있는 부서번호 읽어오기
  const {p_deptno} = useParams() //URLSearchParams
  console.log(p_deptno);//delete from dept where deptno=p_deptno
  const [dname, setDname] = useState('')
  const [loc, setLoc] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //update dept set dname = ?, loc=? where deptno=?
  const [ dept, setDept] = useState({
    deptno: 0,//조건절
    dname: '',//변경값
    loc: ''//변경값
  })
  //상세보기 페이지에서 수정과 삭제를 처리한다.
  //상세보기는 오라클 서버를 먼저 경유(select)하고 화면 출력한다.
  //수정하기 버튼을 누르면 update요청한다.
  //삭제하기는 상세보기를 눌렀을 때 path variable로 p_deptno
  //가지고 있으므로 삭제 버튼을 눌렀을 때 훅이 아니라 p_deptno넘김
  useEffect(()=> {
    const asyncDB = async() => {
      const res = await deptDetailDB({deptno: p_deptno})
      console.log(res);
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      setDept({deptno:jsonDoc[0].deptno, dname: jsonDoc[0].dname, loc: jsonDoc[0].loc})
    }
    asyncDB()
  },[p_deptno])//의존성 배열이 빈값이면 최초 한 번만 실행됨

  const deptUpdate = async(event) => {
    console.log('deptUpdate');
    event.preventDefault()
    const dept = {
      deptno: p_deptno,
      dname: dname,
      loc: loc
    }
    handleClose()//열린 모달 닫기
    const res = await deptUpdateDB(dept)
    if(!res.data) console.log('수정 실패');
    else navigate('/dept')

  }
  const deptDelete = async() => {
    const res = await deptDeleteDB({deptno: p_deptno})
    if(!res.data) console.log('삭제 실패');
    else navigate('/dept')
  }
  const handleDname = (value) => {
    setDname(value)
  }
  const handleLoc = (value) => {
    setLoc(value)
  }
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
            <Link to="/dept" className='nav-link'>부서목록</Link>
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
          <Button variant="primary" onClick={(event)=>deptUpdate(event)}>
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

export default DeptDetail