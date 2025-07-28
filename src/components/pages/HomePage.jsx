import React from 'react'
import { ContainerDiv, FormDiv, HeaderDiv } from '../style/FormStyle'
import Header from '../include/Header'
import { Table } from 'react-bootstrap'

const HomePage = () => {
  return (
    <>
      <Header />
      <ContainerDiv>
        <HeaderDiv></HeaderDiv>
        <FormDiv>
          <div>이벤트존</div>
          <hr style={{height: "2px"}}/>
          <div>추천상품존</div>
          <hr style={{height: "2px"}}/>
          <div>카카오맵</div>
          <hr style={{height: "2px"}}/>
          <Table>
            <tbody>
              <tr>
                <td>주소</td>
                <td>서울특별시 금천구 가산동 한라원앤원 3F</td>
              </tr>
              <tr>
                <td>버스</td>
                <td>디지털3단지 월드벤처 정류장<br />
                    21, 571, 652, 금천05버스 이용
                </td>
              </tr>
              <tr>
                <td>지하철</td>
                <td>1/7호선 가산디지털단지역 8번 출구</td>
              </tr>
            </tbody>
          </Table>
        </FormDiv>
      </ContainerDiv>
    </>
  )
}

export default HomePage