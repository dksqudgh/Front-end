import React from "react";
import { Pagination } from "react-bootstrap";
// 다른 목록 페이지에서도 우리가 적용해 보았던 페이징 처리를 재사용하고 싶다면?
//1. a태그 사용하는 것과 Link태그 사용하는 것 사이에 차이점이 뭔가요?
//a태그 사용은 SPA(Single Page Application)에 맞지 않다???
//Link는 URL만 바뀐다. 그런데 a태그를 하면 기존에 요청이 끊어지고 새로운 
//요청이 일어난다.
//변하지 않는 부분까지도 다 새로 읽어드린다.
//이 문제를 나는 풀지 못했다 - 1)props에 대해서 조금 부족하다
//변수 또 다른 하나는 함수(후자)이다.
/**
 * 공통 페이지네이션 컴포넌트
 * @param {number} page 현재 페이지
 * @param {number} totalPages 전체 페이지 수 - total record/한 페이지에 몇개씩
 * @param {function} onPageChange 페이지 변경 함수 (pageNumber를 인자로 받음)
 */
const PaginationComponent = ({ page, totalPages, onPageChange }) => {
  let items = [];
  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, page + 2);

  // 맨 처음~끝 페이징에서 ... 처리
  if (startPage >= 1) {
    items.push(
      <Pagination.First key="first" onClick={() => onPageChange(1)} disabled={page <= 1}/>
    );
    // Prev 버튼
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      />
    );
    if (startPage > 2)
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (endPage <= totalPages) {
    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }
    // Next 버튼
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      />
    );
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      />
    );
  }

  return <Pagination>{items}</Pagination>;
};

export default PaginationComponent;