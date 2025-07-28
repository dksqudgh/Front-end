import axios from "axios";
//select는 Rest API GET메서드 사용하고 파라미터는 쿼리스트링을 이용함
export const deptListDB = async(params) => {
  console.log(params);
  try {
    const res = await axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP+"dept/deptList",
      params: params
    })
    //console.log(res);
    console.log(res.data);
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("부서목록 조회 실패",error);
  }
}

export const deptDetailDB = async(params) => {
  console.log(params);//{deptno:50}
  try {
    const res = await axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP+"dept/deptDetail",
      params: params
    })
    //console.log(res);
    console.log(res.data);
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("부서상세 조회 실패",error);
  }
}//end of deptDetailDB
/*
Postman -> Body -> form전송방법 or 객체리터럴방법(onChange)
//아래 파라미터는 객체 리터럴 방법인 경우에 해당함
{
  "deptno": 50,
  "dname": "개발부",
  "loc": "제주"
}
*/
export const deptInsertDB = async(dept) => {
  console.log(dept);//
  try {
    const res = await axios({
      method: "post", //405
      url: process.env.REACT_APP_SPRING_IP+"dept/deptInsert",
      data: dept
    })
    //console.log(res);
    console.log(res);//1아니면 0이니까 data는 없다.
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("부서등록 실패",error);
  }
}//end of deptInsertDB

export const deptUpdateDB = async(dept) => {
  console.log(dept);//
  try {
    const res = await axios({
      method: "put", //405
      url: process.env.REACT_APP_SPRING_IP+"dept/deptUpdate",
      data: dept
    })
    //console.log(res);
    console.log(res);//1아니면 0이니까 data는 없다.
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("부서수정 실패",error);
  }
}//end of deptUpdateDB

//DELETE FROM dept WHERE deptno=?
export const deptDeleteDB = async(params) => {
  console.log(params);//{deptno:50}
  try {
    const res = await axios({
      method: "delete",
      url: process.env.REACT_APP_SPRING_IP+"dept/deptDelete",
      params: params
    })
    //console.log(res);
    console.log(res);
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("부서삭제 실패",error);
  }
}//end of deptDeleteDB