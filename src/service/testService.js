import axios from "axios";

  export const uploadImageDB = async(file) => {
    console.log(file);
    try {
      const response = await axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP + 'board/imageUpload',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: file
      });
      return response;  // 성공 시 응답 객체 반환
    } catch (error) {
      throw error
    }
  }

//select는 Rest API GET메서드 사용하고 파라미터는 쿼리스트링을 이용함
//목록을 가져오는 요청 - SELECT * FROM test WHERE t_title LIKE ?||'%'
export const testListDB = async(params) => {
  console.log(params);//{gubun:'t_title or t_content', keyword:'입력값'}
  try {
    const res = await axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP+"board/boardList",
      params: params
    })
    //console.log(res);
    console.log(res.data);
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("테스트목록 조회 실패",error);
  }
}
//SELECT * FROM test WHERE t_no =?
//http://localhost:3000/test/detail/3 -> PathVarable
export const testDetailDB = async(params) => {
  console.log(params);//{t_no:3}
  try {
    const res = await axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP+"board/boardDetail",
      params: params
    })
    //console.log(res);
    //{data:{t_no:3, t_title:제목3, t_content:내용3}}
    console.log(res.data);
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("테스트글상세 조회 실패",error);
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
insert into 테이블명(컬럼명1,컬럼명2,..) values(값1, 값2, ,,,,)  
*/
export const testInsertDB = async(test) => {
  console.log(test);//
  try {
    const res = await axios({
      method: "post", //405
      url: process.env.REACT_APP_SPRING_IP+"board/boardInsert",
      data: test
    })
    //console.log(res);
    console.log(res);//1아니면 0이니까 data는 없다.
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("테스트 등록 실패",error);
  }
}//end of deptInsertDB

export const testUpdateDB = async(test) => {
  console.log(test);//
  try {
    const res = await axios({
      method: "put", //405
      url: process.env.REACT_APP_SPRING_IP+"board/boardUpdate",
      data: test
    })
    //console.log(res);
    console.log(res);//1아니면 0이니까 data는 없다.
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("테스트수정 실패",error);
  }
}//end of deptUpdateDB

//DELETE FROM test WHERE t_no=?
export const testDeleteDB = async(params) => {
  console.log(params);//{t_no:3}
  try {
    const res = await axios({
      method: "delete",
      url: process.env.REACT_APP_SPRING_IP+"board/boardDelete",
      params: params
    })
    //console.log(res);
    console.log(res);
    return  res //필요에 따라 res 혹은 res.data
  } catch (error) {
    console.error("테스트삭제 실패",error);
  }
}//end of deptDeleteDB

// 댓글 등록
export const commentInsertDB = async (comment) => {
  try {
    const response = await axios({
      method: 'post',
      url: process.env.REACT_APP_EXPRESS_IP + 'board/commentInsert',
      data: comment
    });
    return response;
  } catch (error) {
    // 필요시 alert나 toast 추가
    throw error;
  }
};

// 댓글 수정
export const commentUpdateDB = async (comment) => {
  try {
    const response = await axios({
      method: 'put',
      url: process.env.REACT_APP_EXPRESS_IP + 'users/board/coupdate',
      data: comment
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 댓글 삭제
export const commentDeleteDB = async (comment) => {
  try {
    const response = await axios({
      method: 'post',
      url: process.env.REACT_APP_EXPRESS_IP + 'board/commentDelete',
      data: comment
    });
    return response;
  } catch (error) {
    throw error;
  }
};

