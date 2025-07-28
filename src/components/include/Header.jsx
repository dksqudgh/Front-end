import { useEffect, useState } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(()=> {
    const email = window.localStorage.getItem('email')
    setIsLoggedIn(true)
  },[isLoggedIn])
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">ReactCamp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/emp" className="nav-link">사원관리</Link>
              <Link to="/paging" className="nav-link">페이징처리</Link>
              <Link to="/paging2" className="nav-link">Api페이징</Link>
              <Link to="/signup" className="nav-link">회원가입</Link>
              <Link to="/dept" className="nav-link">부서관리</Link>
              <Link to="/dept2" className="nav-link">부서관리2</Link>
            {!isLoggedIn && (
              <Link to="/login" className="nav-link">로그인</Link>
            )}
            {isLoggedIn && (
              <Link to="/logout" className="nav-link">로그아웃</Link>
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header