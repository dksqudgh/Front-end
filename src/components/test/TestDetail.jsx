import React, { useEffect, useState } from 'react'
import Header from '../include/Header'
import Footer from '../include/Footer'
import { BButton, CommentArea, ContainerDiv, FormDiv, HeaderDiv } from '../style/FormStyle'
import { commentInsertDB, commentUpdateDB, testDetailDB } from '../../service/testService'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TestHeader from './TestHeader'
// http://localhost:3000/test/detail/3
const TestDetail = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { pt_no } = useParams();
  console.log(pt_no);//localhost:8000서버에 넘겨야 하는 값이다.
  const queryParams = new URLSearchParams(location.search)
  //댓글쓰기에 필요한 변수 선언
  const [comment,setComment] = useState();
  //댓글 목록을 담을 변수 선언
  const [comments, setComments] = useState([]);
  const [test, setTest] = useState({
    t_no: 0,
    t_title: '',
    t_content: '',
  });

  // 함수 실행시 최초 한번 실행되는 값
  useEffect (() => {
    const testDetail = async() =>{
      //실제 오라클 테이블 컬럼명은 t_no 이지만 화면에서 사용자가
      //선택한 번호를 담는 변수 이라서 접두어p를 붙였다.
      const test = {
        t_no: pt_no
      }
      const res = await testDetailDB(test);
      console.log(res.data[0]);
      console.log(res.data[1].comment);
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      setTest({
        t_no: jsonDoc[0].t_no,
        t_title: jsonDoc[0].t_title,
        t_content: jsonDoc[0].t_content,
        name: jsonDoc[0].name
      });
      //댓글이 있는 경우에만 필요한 코드이다
      setComments(res.data[1].comment);
    }
    testDetail();
    //사용자가 선택한 제목에 대한 글 번호를 새로 가지고 올때 마다 
    //오라클 서버에서 새로 조회한 결과를 담아야 한다.
  },[pt_no]);// [] 빈배열을 넣어두면 딱 한번만 실행됨 만일 books를 두면 무한 반복된다   
  const testDelete = () => {
    console.log("삭제 t_no : "+pt_no);
    navigate('/test');
  }  
/*
  const commentInsert = async() => {
    if(!comment) return alert("답변을 작성해주세요.")
    const cmt = {
      b_no : b_no,
      bc_writer : "로그인이름",
      bc_comment : comment,
    }
    await commentInsertDB(cmt);
    window.location.reload();
    console.log("답변이 등록되었습니다.");
  }


  const commentUpdate = async(bc_no) => {
    console.log(bc_no);
    const cmt = {
      b_no: b_no,
      bc_writer : "로그인이름름",
      bc_comment : comment,
      bc_no : bc_no,
    }
    await commentUpdateDB(cmt);
    window.location.reload();
    console.log("답변이 수정되었습니다.");
  } 
  */ 
  return (
    <>
      <Header />
        <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>테스트</h3>
        </HeaderDiv>
        <FormDiv>
          <TestHeader test={test} t_no={pt_no} />
          <section style={{minHeight: '400px'}}>
            {/* t_content안에 이미지URL들어있다. */}
            {/* quill editor사용함으로 내용에 태그가 포함되어있다. */}
            <div dangerouslySetInnerHTML={{__html:test.t_content}}></div>
          </section>
          <hr style={{height:"2px"}}/>
          <div>
          {comments && comments.map((cmt, index) => (
            <div key={index}>
              <div style={{display:"flex" ,justifyContent:"space-between", marginBottom:'10px'}}>
                <div  style={{display:"flex"}}>
                  <div style={{display:"flex" , flexDirection:"column", fontSize: '14px'}}>
                      <span>작성일 : {cmt.tc_date}</span>
                      <span>작성자 : {cmt.name}</span>
                  </div>
                </div>
                <div>
                  <BButton onClick={()=> console.log("댓글이벤트처리")}>댓글</BButton>&nbsp;
                  <BButton onClick={()=> console.log("댓글수정")}>수정</BButton>
                </div>
              </div>
              <div>
              <CommentArea defaultValue={cmt.tc_comment} onChange={(e)=>{setComment(e.target.value)}} />
              </div>
            </div>
          ))}
          </div>
        </FormDiv>
      </ContainerDiv>      
      <Footer />
    </>
  )
}

export default TestDetail