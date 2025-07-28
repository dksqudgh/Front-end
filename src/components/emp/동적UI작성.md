### 동적UI작성 하기 - 실습

- renderPagination함수를 사용하여 페이지 이동 버튼을     
동적으로 만들어 보자

1. 처음페이지와 끝 페이지 처리
// 현재 페이지를 기준으로 앞뒤로 2개씩 처리
// 항상 현재 페이지를 중심으로 좌우 2페이지씩보여줌
let startPage = Math.max(1, page - 2)
//최대 전체 페이지를 넘어서는 안된다
let endPage = Math.min(totalPages, page + 2)
예) page=5 startPage= 3, endPage = 7

맨처음 페이지와 ...표시(Ellipsis)
if(startPage > 1){
  items.push(<Pagination.First onClick={()=>setPage(1)} />);
  if(startPage > 2){
    items.push(<Pagination.Ellipsis disabled />);
  }
}
// 맨 처음 페이지로 가는 버튼 만듦(페이지가 2이상일때 동작)
// ...표시 (중간에 비는 경우에만 출력)


2. 실제 페이지 번호  버튼 생성하기
```javascript
//현재 보여줄 페이지 버튼들을 순서대로 만들어준다
//현재 바라보는 페이지는 active줌
//클릭하면 setPage함수 호출(변수 page값이 변함 -> 목록 새로고침 효과)
for(let num=startPage;num<=endPage;num++>){
  items.push(
    <Pagination.Item
      key={num} active={num===page} //현재페이지 강조
      onClick={() => setPage(num)}//클릭하면 해당 페이지 이동
    >
    {num}
    </Pagination.Item>
  )

}
```
3.마지막 페이지 처리
```javascript
  //전체 페이지보다 끝페이지의 숫자가 적다는 건 더 보여줄 페이지가 있다는 뜻
  if(endPage < totalPages>){
    if(endPage < totalPages -1>){
      items.push(<Pagination.Ellipsis disabled />)
    }else{
      //맨 끝이 아니라면 아래 코드가 생성됨
      items.push(<Pagination.Last onClick={()=> setPage(totalPages)} />)
    }
  }
```

4.이전버튼과 다음버튼을 포함한 Pagination 컴포넌트 반환하기
```javascript
return (
  <Pagination>
    <Pagination.Prev onClick={()=> setPage(Math.max(1, page-1))}
      disabled={page <= 1}
    />
    {items}
    <Pagination.Next onClick={()=> setPage(Math.min(totalPages, page+1))}
      disabled={page >= totalPages}
    />    
  </Pagination>
)
```