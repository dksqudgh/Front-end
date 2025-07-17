import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../../css/myStyle.css"

const Header = ({onLogout}) => {
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
              <Link to="/signup" className="nav-link">회원가입</Link>
              <Link to="/login" className="nav-link">로그인</Link>
              <Link to="/dept" className="nav-link">부서관리</Link>
              <Link to="/dept2" className="nav-link">부서관리2</Link>
            </Nav>
            {onLogout && <Button className="btn btn-danger" onClick={onLogout}>로그아웃</Button>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header