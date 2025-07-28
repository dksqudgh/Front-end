import React, { useEffect, useState } from 'react'
import EmpRow from './EmpRow'
import { Button, Modal } from 'react-bootstrap'
import { MyInput, MyLabel } from '../style/FormStyle'
import { empInsertDB, empListDB, uploadImageDB } from '../../service/empService'
import styled from 'styled-components';

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

/*
리액트는 SPA 기본값이다
리액트 사용하는 장점 - 상태값,props이 바뀌면 화면을 다시 그린다
부분갱신 처리가 가능하다.
*/
const EmpListV2 = () => {
  const [refresh, setRefresh] = useState(0)
  const [file, setFile] = useState('')
  //클라우드 서비스를 이용할 때는 아래 코드를 참조하세요.
  const [file2, setFile2] = useState({fileName:null, fileURL: null})
  const [emps, setEmps] = useState([])
  const [empno, setEmpno] = useState(0)
  const [ename, setEname] = useState('')
  const [job, setJob] = useState('')
  const [mgr, setMgr] = useState(0)
  const [hiredate, setHiredate] = useState('')
  const [sal, setSal] = useState(0)
  const [comm, setComm] = useState(0)
  const [deptno, setDeptno] = useState(0)
  //아래 세 줄은 입력모달과 관련된 코드 입니다.
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true) 
  //아래 8개의 함수는 사용자가 입력한 값이 변하면
  //그 때마다 상태값 갱신한다.
  //콤포넌트가 렌더링 될 때마다.아래 함수가 매번 8개씩 새로 복제된다.
  //문제제기 - 최적화 대상이다. - 함수에 대한 최적화 이슈 -> useCallback()
  const handleEmpno = (value) => {
    setEmpno(value)
  }
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
  const empInsert = async() => {
    const emp = {
      empno,
      ename,
      job,
      mgr,
      hiredate,
      sal,
      comm,
      deptno,
      ephoto:file
    }
    handleClose()
    const res = await empInsertDB(emp)//1이면 성공 0이면 실패
    if(!res.data) console.log('등록 실패');
    //else console.log('등록 성공');
    else setRefresh(prev => prev+1);
  }
  //useEffect는 여러개 올 수 있다.
  //페이징 처리와 관련된 useEffect 별도로 작성함. 
  //의존성 배열을 생략하면 EmpList렌더링이 될 때마다 호출됨
  //의존성배열이 비어 있으면 최초 한 번만 호출됨 
  //의존성배열에 변수(useState)가 오면 그 값이 변경될 때 마다 호출됨
  //EmpList가 렌더링이 될 때 -> useEffect()
  useEffect(() =>{
    const asyncDB = async() => {
      const emp = { gubun: null, keyword: null }
      const res = await empListDB(emp)
      console.log(res.data);//[{},{},{}]
      setEmps(res.data)
    }
    asyncDB()
  },[])

  useEffect(()=>{
    empList()
  },[refresh])

  const empSearch = async() => {
    console.log("empSearch");
    const gubunEL = document.querySelector("#gubun")
    const keywordEL = document.querySelector("#keyword")
    const gubun = gubunEL.value 
    const keyword = keywordEL.value
    console.log(`${gubun}, ${keyword}`);
    const emp = {gubun:gubun, keyword:keyword}
    const res = await empListDB(emp)
    console.log(res.data);
    setEmps(res.data)
    //검색 후 입력 구분과 키워드는 초기화를 한다
    gubunEL.value = ''
    keywordEL.value = ''
  }

  const empList = async() => {
    const emp = {gubun:null, keyword:null}
    const res = await empListDB(emp)
    setEmps(res.data)
  }

const imgChange = async event => {
    console.log(event.target.files[0]);
    //imageUploader.upload(event.target.files[0]).then(console.log);
    //await를 붙였으므로 업로드를 기다렸다가 처리함
    //const uploaded = await imageUploader.upload(event.target.files[0]);
    const uploaded = await uploadImageDB(event.target.files[0])
    console.log(uploaded.data);
  
    setFile(uploaded.data);

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
      <div className='container'>
        <div className='page-header'>
          <h2>사원관리<small>사원목록</small></h2>
          <hr />
        </div>
        <div className='row'>
          <div className='col-sm-3'>
            <select id="gubun">
              <option value="">분류선택</option>
              <option value="empno">사원번호</option>
              <option value="ename">사원명</option>
              <option value="job">JOB</option>
            </select>
          </div>
          <div className='col-sm-6'>
            <input type="text" id="keyword" className='form-control' placeholder='검색어를 입력하세요' />
          </div>
          <div className='col-sm-3'>
            <button type="button" className='btn btn-danger' onClick={empSearch}>검색</button>
          </div>
        </div>
        <div className='test-list'>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>사원번호</th>
                <th>사원명</th>
                <th>JOB</th>
                <th>부서명</th>
              </tr>
            </thead>
            {/* 데이터셋 연동하기 */}
            {/* props로 넘어온 상태값이 빈 깡통이면 실행하지 않기 */}
            <tbody>
            {Object.keys(emps).map(key => (
              <EmpRow key={key} emp={emps[key]} />
            ))}
            </tbody>
            {/* 데이터셋 연동하기 */}
          </table>

          {/* 페이지 네비게이션 추가 */}
          
          {/* 페이지 네비게이션 추가 */}

          <hr />
          <div className='list-footer'>
          <button className="btn btn-warning" onClick={empList}>전체조회</button>
          &nbsp;
          <button  className="btn btn-success" onClick={handleShow}>글쓰기</button>
          </div>  
        </div>      
      </div>

    {/* ========================== [[ 테스트등록 Modal ]] ========================== */}
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>사원등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="empno" placeholder="Enter 사원번호" onChange={(event)=>{handleEmpno(event.target.value)}} />
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="ename" placeholder="Enter 사원명" onChange={(e)=>{handleEname(e.target.value)}}/>
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="job" placeholder="Enter JOB" onChange={(e)=>{handleJob(e.target.value)}}/>
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="mgr" placeholder="Enter 그룹코드" onChange={(e)=>{handleMgr(e.target.value)}}/>
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="hiredate" placeholder="Enter 입사일자" onChange={(e)=>{handleHiredate(e.target.value)}}/>
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="sal" placeholder="Enter 급여" onChange={(e)=>{handleSal(e.target.value)}}/>
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="comm" placeholder="Enter 인센티브" onChange={(e)=>{handleComm(e.target.value)}}/>
          </div>
          <div style={{display: 'flex'}}>
            <MyInput type="text" id="deptno" placeholder="Enter 부서번호" onChange={(e)=>{handleDeptno(e.target.value)}}/>
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
          <Button variant="primary" onClick={empInsert}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>     
    {/* ========================== [[ 테스트등록 Modal ]] ========================== */}   

    </>
  )
}

export default EmpListV2