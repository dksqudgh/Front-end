import { useState } from 'react'
import { memberInsertDB } from '../../service/dbLogic'
import '../css/myStyle.css'
import { useNavigate } from 'react-router-dom'

const Enroll = () => {
  //window.location.href="http://localhost:8000/index"
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [passwd, setPasswd] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const handleId = (value) => {//value:사용자가 입력한 아이디저장
    setId(value)
  }
  const handlePasswd = (value) => {//value:사용자가 입력한 비번저장
    setPasswd(value)
  }
  const handleName = (value) => {//value:사용자가 입력한 아이디저장
    setName(value)
  }
  const handleEmail = (value) => {//value:사용자가 입력한 비번저장
    setEmail(value)
  }  
  const mainMove = () => {
    navigate('/index')
  }
  const memberInsert = async() => {
    const member = {
      id:id,
      passwd: passwd,
      name: name,
      email: email,
    }
    const res = await memberInsertDB(member)
    console.log(res);//1:입력성공, 0:입력실패
    navigate('/index')
  }
  return (
    <>
      <h2 align="center">회원 가입 하기</h2>
      <hr />
      <section id="myinfo">
        <table>
          <tbody>
          <tr>
              <td>ID :</td>
              <td><input type="text" name="id" id="userid" onChange={(e)=>handleId(e.target.value)} /></td>
          </tr>
          <tr>
              <td>Password :</td>
              <td><input type="password" name="passwd" onChange={(e)=>handlePasswd(e.target.value)}/></td>
          </tr>
          <tr>
              <td>이름 :</td>
              <td><input type="text" name="name" onChange={(e)=>handleName(e.target.value)}/></td>
          </tr>
          <tr>
              <td>E-Mail :</td>
              <td><input type="email" name="email" onChange={(e)=>handleEmail(e.target.value)}/></td>
          </tr>
          </tbody>
        </table>
        <p align="center">
            <button type="button" onClick={memberInsert}>회원 가입하기</button> &nbsp; &nbsp;
            <button type="reset">작성 양식 초기화</button>
        </p>
      </section>
      <br /><br />
      <p align="center">
        <button type="button" onClick={mainMove}>
          메인으로가기
        </button>
      </p>
    </>
  )
}

export default Enroll