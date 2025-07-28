import React, { useEffect, useState } from 'react'
import Header from '../include/Header'
import Footer from '../include/Footer'
import { Button, Card, ListGroup, Modal } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { empDeleteDB, empDetailDB, empUpdateDB } from '../../service/empService'


import axios from 'axios'
import { MyInput, MyLabel } from '../style/FormStyle'
import styled from 'styled-components'

const DivUploadImg = styled.div`
  display: flex;
  width: 200px;
  height: 230px;
  overflow: hidden;
  margin: 10px auto;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; //cover
  background: #eee;     // 여백이 생길 때 배경색(선택)
`;
const Dspan =styled.span`
  padding: 2px 5px 2px 5px;
  font-size: 16px;
  cursor: pointer;
`
//EmpDetail페이지는 오라클 서버를 먼저 경유한다.
//
const EmpDetail = () => {
  const navigate = useNavigate()
  //-> http://localhost:3000/empDetail/:p_empno
  //-> http://localhost:3000/empDetail/7566
  //p_empno는 오라클 DB에서 가져오는 값이 아니다.
  //사용자가 선택한 사원번호이다. 
  const { p_empno } = useParams() //7566사원번호가 달라진다.
  console.log(p_empno);//7566

  const [empno, setEmpno] = useState(p_empno) //
  const [ename, setEname] = useState('')
  const [job, setJob] = useState('')
  const [mgr, setMgr] = useState(0)
  const [hiredate, setHiredate] = useState('')
  const [sal, setSal] = useState(0)
  const [comm, setComm] = useState(0)
  const [deptno, setDeptno] = useState(0)

  const handleEname = (value) => {
    setEname(value)
  }
  const handleJob = (value) => {
    setJob(value)
  }
  const handleMgr = (value) => {
    setMgr(value)
  }
  const handleHiredate = (value) => {
    setHiredate(value)
  }
  const handleSal = (value) => {
    setSal(value)
  }
  const handleComm = (value) => {
    setComm(value)
  }
  const handleDeptno = (value) => {
    setDeptno(value)
  }

  const [emp, setEmp] = useState({
    empno: 0,
    ename: '',
    job: '',
    mgr: 0,
    hiredate: '',
    sal: 0,
    comm: 0,
    deptno: 0,
    ephoto:''
  })
  //사원목록에서 사원명을 클릭하면 Link태그를 호출함 - PathVariable 사원번호를 붙임
  //useParams - 이름앞에 use가 붙어있는 것들은 모두 HOOK이다.
  //DB연동을 사원번호가 변경되었을 때만 오라클 경유한다.
  useEffect(() => {
    console.log('useEffect');
    const asyncDB = async() => {
      const res = await empDetailDB({empno: p_empno})
      console.log(res.data);
      //console.log(""+res.data);//[object Object]
      const result = JSON.stringify(res.data) //'{}'
      const jsonDoc = JSON.parse(result)//배열
      setEmp({empno:jsonDoc.EMPNO, ename:jsonDoc.ENAME, job:jsonDoc.JOB
        ,mgr:jsonDoc.MGR, hiredate:jsonDoc.HIREDATE, sal:jsonDoc.SAL 
        ,comm:jsonDoc.COMM, deptno:jsonDoc.DEPTNO, ephoto:jsonDoc.EPHOTO
      })

    }
    asyncDB()
  },[p_empno]) //useMemo, useCallback
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //리액트에서 삭제 이벤트 처리 함수
  //3000번 포트 와 8000번 포트 연동 - XXXDB
  //서로 다른(프론트서버와 백엔드 서버) 서버 사이에 통신 발생 - CORS
  //waiting - 지연, pending
  const empDelete = async() => {
    const res = await empDeleteDB({empno: p_empno})
    if(!res.data) console.log('삭제 실패');
    else navigate('/emp')
  }
  const empUpdate = async() => {
    const emp = {
      empno:empno,
      ename:ename,
      job,
      mgr,
      hiredate,
      sal,
      comm,
      deptno   
    }
    //모달창은 닫아줘
    handleClose()
    const res = await empUpdateDB(emp)
    console.log(res.data);//1이면 성공, 0이면 수정 실패
    if(!res.data) console.log('수정 실패');
    else navigate('/emp')
  }

const imgChange = async event => {
    console.log(event.target.files[0]);
    //imageUploader.upload(event.target.files[0]).then(console.log);
    //await를 붙였으므로 업로드를 기다렸다가 처리함
    //const uploaded = await imageUploader.upload(event.target.files[0]);
    //const uploaded = await uploadImageDB(event.target.files[0])
    //console.log(uploaded.data);
  
    //setFile(uploaded.data);

    const upload = document.getElementById("dimg"); //input의 이미지 객체 얻어오기
    const holder = document.getElementById("uploadImg"); //이미지를 집어넣을 곳의 부모태그
    const file = upload.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        console.log(img.width + ", " + img.height); // 이미지를 다 읽은 후 출력
        if (img.width > 200) {
          img.width = 200;
        }
        holder.innerHTML = "";
        holder.appendChild(img);
      };
      img.src = event.target.result; // img.onload 이후에만 width/height 접근!
    };
    reader.readAsDataURL(file);
    return false;
  }   

  return (
    <>
      <Header />
      <div className="container">
        <div className="page-header">
          <h2>사원관리 <small>사원상세</small></h2>
          <hr />
        </div>
        <Card style={{ width: '58rem' }}>
          <ListGroup variant="flush">
            <ListGroup.Item>사원번호 : {emp.empno}</ListGroup.Item>
            <ListGroup.Item>사원명 : {emp.ename}</ListGroup.Item>
            <ListGroup.Item>JOB : {emp.job}</ListGroup.Item>
            <ListGroup.Item>MGR : {emp.mgr}</ListGroup.Item>
            <ListGroup.Item>입사일자 : {emp.hiredate}</ListGroup.Item>
            <ListGroup.Item>급여 : {emp.sal}</ListGroup.Item>
            <ListGroup.Item>인센티브 : {emp.comm}</ListGroup.Item>
            <ListGroup.Item>부서번호 : {emp.deptno}</ListGroup.Item>
            <ListGroup.Item>사진 : {emp.ephoto}</ListGroup.Item>
            <ListGroup.Item>
              <div>
                <Dspan onClick={()=>{
                  axios({
                    method:'get',
                    url: process.env.REACT_APP_SPRING_IP+`emp/imageDownload?imageName=${emp.ephoto}`,
                    responseType: 'blob'
                  }).then(res => {
                    console.log(res.data);
                    const url = window.URL.createObjectURL(new Blob([res.data],
                      { type: res.headers['Content-Type']}
                    ))
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${emp.ephoto}`)
                    document.body.appendChild(link)
                    link.click()
                  })
                }}>{emp.ephoto}</Dspan>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className='detail-link'>
            <Button variant="success" onClick={handleShow}>
              수정
            </Button>
            &nbsp;
            <Button variant="danger" onClick={empDelete}>
              삭제
            </Button>
            &nbsp;
            <Link to="/emp" className='nav-link'>사원목록</Link>
          </div>
        </Card>   
        <hr />

        {/* ========================== [[ 테스트등록 Modal ]] ========================== */}
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>사원정보수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              <div style={{display: 'flex'}}>
                <MyInput type="text" id="empno" value={emp.empno} placeholder="Enter 사원번호" readOnly />
              </div>
              <div style={{display: 'flex'}}>
                <MyInput type="text" id="ename" placeholder={`사원명 ${emp.ename}`} onChange={(e)=>{handleEname(e.target.value)}}/>
              </div>
              <div style={{display: 'flex'}}>
                <MyInput type="text" id="job" placeholder={`JOB ${emp.job}`} onChange={(e)=>{handleJob(e.target.value)}}/>
              </div>
              <div style={{display: 'flex'}}>
                <MyInput type="text" id="mgr" placeholder={`그룹코드 ${emp.mgr}`} onChange={(e)=>{handleMgr(e.target.value)}}/>
              </div>
              <div style={{display: 'flex'}}>
                <MyInput type="text" id="hiredate" placeholder={`입사일자 ${emp.hiredate}`} onChange={(e)=>{handleHiredate(e.target.value)}}/>
              </div>
              <div style={{display: 'flex'}}>
                <MyInput type="text" id="sal" placeholder={`급여 ${emp.sal}`} onChange={(e)=>{handleSal(e.target.value)}}/>
              </div>
              <div style={{display: 'flex'}}>
                <MyInput type="text" id="comm" placeholder={`인센티브 ${emp.comm}`} onChange={(e)=>{handleComm(e.target.value)}}/>
              </div>
              <div style={{display: 'flex'}}>
                <MyInput type="text" id="deptno" placeholder={`부서번호 ${emp.deptno}`} onChange={(e)=>{handleDeptno(e.target.value)}}/>
              </div>

              <div style={{display: 'flex'}}>
                <MyLabel>이미지
                  <MyInput className="form-control" type="file" accept='image/*' id="dimg" name="dimg" onChange={imgChange}/>
                  <DivUploadImg id="uploadImg">
                    <Img className='thumbNail' src="https://dummyimage.com/200x230/000/fff" alt="미리보기" />
                  </DivUploadImg>
                </MyLabel>
              </div>

            </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
              <Button variant="primary" onClick={empUpdate}>
                저장
              </Button>
            </Modal.Footer>
          </Modal>     
        {/* ========================== [[ 테스트등록 Modal ]] ========================== */}  

      </div>      
      <Footer />
    </>
  )
}

export default EmpDetail