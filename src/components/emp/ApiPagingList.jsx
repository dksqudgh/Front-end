import React, { useEffect, useState } from 'react'
import PaginationComponent from '../include/PaginationComponent'
import axios from 'axios'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'

const ApiPagingList = () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages]=useState(1)
  const [searchType, setSearchType] = useState("") //사용자가 입력한 구분
  const [size] = useState(10)
  const [keyword, setKeyword] = useState("") //검색어
  const [list, setList] = useState([]) //스프링
  const [total, setTotal] = useState(0) //총 레코드(로우) 수
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

  const handleSearch = () => {
    setPage(1)
    pagingSearch(1)
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
            <Button variant="primary" type="button" onClick= {handleSearch}>
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
        <div className="d-flex justify-content-center">
          <PaginationComponent 
            page={page} totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>    
    </>
  )
}

export default ApiPagingList