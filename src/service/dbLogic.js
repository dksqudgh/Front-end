//회원가입한 이메일과 비밀번호로 로그인 구현
//이종간에 연계할 때 주의사항
//html에서는 form태그를 사용하므로 request.getParameter()사용하여
//사용자가 입력한 값을 받아올 수 있다.
//리액트에서는 form전송으로 처리하지 않으므로 json형식으로 사용자가
//입력한 값은 넘기게 된다.

import axios from "axios";
//여기서 출처가 바뀐다. - CORS이슈 - interceptor
//주의 :  더 이상 request.getParameter()사용자가 입력한 값을 못받아온다.
export const oracleLogin = async (member) => {
  //화면에서 입력받은 아이디와 비번 member가 가지고 있다.
  //{id:"kiwi", passwd:"123"}
  console.log(member);
  try {
    //서블릿 서버에 요청을 보내기
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_TOMCAT_IP}model2/login.lo`,
      data: member,
    })
    //응답 데이터 받아오기
    const { data } = res 
    console.log(data);
    //응답 데이터가 존재하면 localStorage저장
    if(data && data.name){
      localStorage.setItem("name", data.name)
    }
    return data
    //세션은 사용이 불가 -> Redis 사용 가능
    //oauth 토큰(실시간 체크) - Redis의 역할이 필요없다.
  } catch (error) {
    console.error("로그인 에러", error);
  }


}//end of oracleLogin

//회원가입 처리
//insert into 회원 values('kiwi', '123','키위', 'kiwi@hot.com')
//1row inserted - number - 1:입력성공, 0:입력실패
export const memberInsertDB = async (member) => {
  console.log(member);
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_TOMCAT_IP}model2/minsert.lo`,
      data: member
    })
    const { data } = res
    return data
  } catch (error) {
    console.error("error",error);
  }

}//end of memberInsertDB