import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DividerDiv, DividerHr, GoogleButton, KakaoButton, LoginForm, MyH1, MyInput, MyLabel, MyP, PwEye, SubmitButton } from '../style/FormStyle';
import { loginGoogle } from '../../service/authLogic';

const LoginView = ({authLogic}) => {
  const navigate = useNavigate()
  const [tempUser, setTempUser] = useState({
    mem_email: '',
    mem_pw: ''
  })
  const changeUser = (e) => {

  }
  //passwordType에 따라서 화면에 값을 보일지 또는 안보이게 할지 결정
  const [passwordType, setPasswordType] = useState({
    type:'password',
    visible: false
  })

  const passwordView = (e) => {
    const id = e.currentTarget.id 
    if(id === "password"){
      if(!passwordType.visible){
        setPasswordType({...passwordType, type:'text', visible: true})
      }else{
        setPasswordType({...passwordType, type:'password', visible: false})
      }
    }
  }
  //오라클(MySQL) 로그인 구현하기
  const loginE = () => {

  }
  //구글로그인 구현하기
  const loginG = async() => {
    try {
      const res = await loginGoogle(authLogic.auth, authLogic.googleProvider)
      console.log(res);
      console.log(res.uid+", "+res.email+", "+res.displayName);
      window.localStorage.setItem("uid", res.uid)
      window.localStorage.setItem("email", res.email)
      window.localStorage.setItem("name", res.displayName)

      //localStorage 저장하기
      navigate("/")
    } catch (error) {
      console.error("구글 로그인 실패 " + error);
    }
  }
  //카카오로그인 구현하기
  const loginK = () => {

  }
  return (
      <>
        <LoginForm>
        <MyH1>로그인</MyH1>
        <MyLabel htmlFor="email"> 이메일     
            <MyInput type="email" id="mem_email" name="mem_email" placeholder="이메일를 입력해주세요." 
            onChange={(e)=>changeUser(e)}/>   
        </MyLabel>
        <MyLabel htmlFor="password"> 비밀번호
            <MyInput type={passwordType.type} autoComplete="off" id="mem_pw" name="mem_password" placeholder="비밀번호를 입력해주세요."
            onChange={(e)=>changeUser(e)}/>
            <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType.visible?"gray":"lightgray"}`}}>
            <PwEye className="fa fa-eye fa-lg"></PwEye>
            </div>
        </MyLabel>
        <SubmitButton type="button" onClick={()=>{loginE();}}>
            로그인
        </SubmitButton>
        <DividerDiv>
            <DividerHr />
        </DividerDiv>
        <GoogleButton type="button" onClick={()=>{loginG();}}>
            <i className= "fab fa-google-plus-g" style={{color: "red", fontSize: "18px"}}></i>&nbsp;&nbsp;Google 로그인
        </GoogleButton>
        <KakaoButton type="button" onClick={loginK}>
            <span style={{color: "red", fontSize: "18px"}}></span>&nbsp;&nbsp;Kakao 로그인
        </KakaoButton>
        <MyP style={{marginTop:"30px"}}>신규 사용자이신가요?&nbsp;<Link to="/auth/signup" className="text-decoration-none" style={{color: "blue"}}>계정 만들기</Link></MyP>
        <MyP>이메일를 잊으셨나요?&nbsp;<Link to="/login/findEmail" className="text-decoration-none" style={{color: "blue"}}>이메일 찾기</Link></MyP>
        <MyP>비밀번호를 잊으셨나요?&nbsp;<Link to="/login/resetPwd" className="text-decoration-none" style={{color: "blue"}}>비밀번호 변경</Link></MyP>
        </LoginForm>        
    </>
  )
}

export default LoginView