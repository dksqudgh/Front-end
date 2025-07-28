import React, { useEffect, useRef, useState } from 'react'
import Header from '../include/Header'
import Footer from '../include/Footer'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../style/FormStyle'
import QuillEditor from './QuillEditor'
import { testInsertDB } from '../../service/testService'
import { useNavigate } from 'react-router-dom'
//useRef, form활용, 유효성
const TestWrite = () => {
  //
  const navigate = useNavigate()
  const quillRef = useRef()
  const [t_title, setTitle] = useState('')
  const [t_content, setContent] = useState('')//t_content
  const handleContent = (value) => {
    //내용이 바뀐다. 그런데 내 안에서 바뀌지 않고 밖에서 바뀐값을 동기화 해야한다??
    setContent(value)
  }
  //파라미터가 변경되었을 때만 새로 함수를 만든다. -> 의존성 배열 -> useCallback
  const handleTitle = (value) => {
    //onChange이벤트 발동-함수호출-함수파라미터로 값을 받음
    //파라미터를 통해서 받은 값이 state를 변경한다.- 렌더링
    setTitle(value)
  }
  const testInsert = async () => {
    if(t_title.trim() === ''||t_content.trim()===''){
      alert('게시글이 작성되지 않았습니다.')
      return
    }
    const test = {
      t_title: t_title,
      t_content: t_content,
      //t_img1: 
    }
    //글등록 성공이면 res.data가 1이고 실패이면 0이다.
    const res = await testInsertDB(test)
    if(!res.data) console.log('글등록에 실패하였습니다.');
    else navigate("/test")
  }
  //
  return (
    <>
      <Header />
        <ContainerDiv>
        <HeaderDiv>
            <h3>게시글 작성</h3>
        </HeaderDiv>
        <FormDiv>
            <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <h2>제목</h2> 
            <div style={{display: 'flex'}}>
                <BButton style={{marginLeft:'10px'}} onClick={testInsert}>글쓰기</BButton>
            </div>
            </div>
            <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
            style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <h3>상세내용</h3>
            <QuillEditor value={t_content} handleContent={handleContent} quillRef={quillRef} />
            </div>            
        </FormDiv>
        </ContainerDiv>

      <Footer />
    </>
  )
}

export default TestWrite
/*
렌더링 -> 재조정, 리렌더링 -> useMemo(필드), useCallback(함수)
TestWrite.jsx <- QuillEditor.jsx
<QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} />
1.value - useState or useRef or 함수
2.handleContent - 함수
3.quillRef - useRef, Ref
*/