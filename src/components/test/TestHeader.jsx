import React from 'react'
import { BButton } from '../style/FormStyle'
import { useNavigate } from 'react-router-dom'
//TestDetail.jspx에 부속 페이지 이다. - 부모 자손 관계
//여기에 props는 TestDetail.jsx에서 받아오는 값이다. ->뚝뚝 끊어진다.
const TestHeader = ({test, t_no}) => {
  const navigate = useNavigate()
  const testDelete = () => {

  } 
  const testList = () => {
    navigate("/test")
  }
  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', justifyContent:"space-between"}}>
        <div style={{overflow: "auto"}}>
          <span style={{marginBottom:'15px', fontSize: "30px", display:"block"}}>
          {test.t_title}
          </span>
        </div>
        {
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <BButton style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/test/update/${t_no}`)}}>
              수정
          </BButton>
          <BButton style={{margin:'0px 10px 0px 10px'}} onClick={testDelete}>
              삭제
          </BButton>
          <BButton style={{margin:'0px 10px 0px 10px'}} onClick={testList}>
              목록
          </BButton>
          </div>
        }
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span>작성자 : {test.name}</span>
          <span>작성일 : {"2025-07-10"}</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px'}}>
          <div style={{display: 'flex'}}>
          <span style={{marginRight:'5px'}}>조회수 :</span>
          <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{15}</div>
          </div>
        </div>
        </div>
      </div>      
      <hr style={{height: "2px"}}/>
    </>
  )
}

export default TestHeader