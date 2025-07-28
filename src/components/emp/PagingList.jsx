import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap'

const PagingList = () => {
  //[1] 상태 변수 선언
  //[{},{},{},,,,]
  const [list, setList] = useState([]) //스프링
  const [page, setPage] = useState(1)
  const [size] = useState(10)
  const [totalPages, setTotalPages] = useState(1) //스프링
  const [searchType, setSearchType] = useState("") //사용자가 입력한 구분
  const [keyword, setKeyword] = useState("") //검색어
  const [total, setTotal] = useState(0) //총 레코드(로우) 수

  //[2] 게시글 목록 데이터 불러오기
  const pagingSearch = async(pageNum = 1) => {
    //오라클 서버를 경유하는 코드
    //파라미터로 값이 넘어갈 때 유효성 체크
    try {
      const params = {
        page: pageNum,
        size,
        gubun: searchType ? searchType : null,
        keyword: keyword ? keyword : null
      }
      console.log(params);//4가지 출력값 확인
      const res = 
      await axios.get(process.env.REACT_APP_SPRING_IP+"emp/pagingList",{ params });
      console.log(res.data);
      //프로젝트에서 댓글처리 - 
      //{list:[{},{},{},,] page:{} total:115 totalPages:12}
      setList(res.data.list)
      setPage(res.data.page)
      setTotal(res.data.total)
      setTotalPages(res.data.totalPages)
    } catch (error) {
      //alert("데이터를 불러오지 못했습니다.")
      console.log("데이터를 불러오지 못했습니다.")
    }
  }

  //[3] 페이지 번호가 바뀔 때마다 pagingSearch실행한다.
  useEffect(()=> {
    pagingSearch(page)
  },[page])

  //[4] 검색버튼 또는 엔터 키를 눌렀을 때 실행
  const handleSearch = () => {
    setPage(1) //검색시 1페이지로 이동
    pagingSearch(1) //검색조건으로 목록 다시 불러오기
  }

  //[5] 페이징 처리로 그려질 화면이 존재한다.
  //함수의 리턴값으로 화면을 전달할 수 있다.
  //페이징 처리에 사용되는 태그가 여러가지(배열) 이다.
  const renderPagination = () => {
    //페이징 처리에 필요한 태그를 배열에 담자
    let items = []
    let startPage = Math.max(1,page -2)
    let endPage = Math.min(totalPages, page + 2)

    //맨 처음 ~ 끝페이지
    if(startPage > 1){
      items.push(<Pagination.First onClick={()=>setPage(1)} />);
      if(startPage > 2){
        items.push(<Pagination.Ellipsis disabled />);
      }
    }

    //연속된 숫자 버튼들...
    for(let num=startPage;num<=endPage;num++){
      items.push(<Pagination.Item key={num}
        active={num === page}
        onClick={()=> setPage(num)}
      >
        {num}
      </Pagination.Item>)
    }

    //전체 페이지보다 끝페이지의 숫자가 적다는 건 더 보여줄 페이지가 있다는 뜻
    if(endPage < totalPages){
      if(endPage < totalPages - 1){
        items.push(<Pagination.Ellipsis disabled />)
      }else{
        //맨 끝이 아니라면 아래 코드가 생성됨
        items.push(<Pagination.Last onClick={()=> setPage(totalPages)} />)
      }
    }


    return (
      <Pagination>
        <Pagination.Prev 
          onClick={()=> setPage(Math.max(1,page-1))}
          disabled={page <= 1}
        />
        {items}
        <Pagination.Next 
          onClick={()=> setPage(Math.min(totalPages,page+1))}
          disabled={page >= totalPages}        
        />
      </Pagination>      
    )
  }

  return (
    <>
      <div style={{ maxWidth: "800px", margin: "30px auto" }}>
        <h2>게시판 리스트</h2>
        <Form as={Row} className="mb-3">
          <Col xs="auto">
            <Form.Select id="gubun"
              onChange={e => setSearchType(e.target.value)}
            >
              <option value="">분류선택</option>
              <option value="title">제목</option>
              <option value="seq">순번</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Control
              type="text"
              id="keyword"
              onChange={e => setKeyword(e.target.value)}
              placeholder="검색어 입력"
            />
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="button" onClick={handleSearch}>
              검색
            </Button>
          </Col>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>순번</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
          {
            list.map(item => (
              <tr>
                <td>{item.SEQ}</td>
                <td>{item.TITLE}</td>
              </tr>
            )
          )}  
          </tbody>
        </Table>

        <div style={{ margin: "15px 0" }}>
          전체: {total}건&nbsp;|&nbsp;페이지: {page}/{totalPages}
        </div>
        <div className="d-flex justify-content-center">{renderPagination()}</div>
      </div>    
    </>
  )
}

export default PagingList