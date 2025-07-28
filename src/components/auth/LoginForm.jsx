import { useNavigate } from 'react-router-dom'
import '../css/myStyle.css'
import { useState } from 'react'
import { oracleLogin } from '../../service/dbLogic'

const LoginForm = () => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [passwd, setPasswd] = useState('')
  //아래 함수는 사용자가 입력한 값이 변경될 때 마다 호출됨
  //변경될 때 마다 실시간으로 입력된 값이 넘어온다.
  //이 함수에서는 아이디와 비번이 유지됨 - useState - 상태관리
  //LoginForm렌더링 될 때마다 새로 초기화 - 빈문자열로 초기화 하였다
  //더 이상 form전송으로 처리되지 않았다.-> request.getParameter()받지 못함
  //{id:'kiwi', passwd:'123'}
  const handleId = (value) => {//value:사용자가 입력한 아이디저장
    setId(value)
  }
  const handlePasswd = (value) => {//value:사용자가 입력한 비번저장
    setPasswd(value)
  }
  const signup = () => {
    navigate('/signup')
  }
  const login = async () => {
    const member = {
      id,
      passwd,
    }
    const res = await oracleLogin(member)
    console.log(res);
    navigate("/")
  }
  return (
    <>
    {/* jsx주석이다. */}
      <div className="box">
        <p>&nbsp; &nbsp;아이디 :
            <input type="text" name="id" id="userid" onChange={(event)=>{handleId(event.target.value)}} /></p>
        <p>비밀번호 : <input type="password" name="passwd" id ="userpwd" onChange={(event)=>{handlePasswd(event.target.value)}}/></p>
        <button type="button" id="btnLogin" onClick={login}>로그인하기</button>
        &nbsp;&nbsp;
        <button type="button" id="btnEnroll" onClick={signup}>회원가입</button>
      </div>
    </>
  )
}
export default LoginForm
