import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthProvider"; // AuthProvider에서 로그인 상태 가져오기
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./Layout.style.css";

const Layout = () => {
  const { user } = useAuth(); // 로그인된 사용자 정보 가져오기
  console.log("user:", user);
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase 로그아웃
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 에러:", error.message);
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/">FestMoa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/domestic-performances">
              국내공연
            </Nav.Link>
            <Nav.Link as={NavLink} to="/domestic-festivals">
              국내 페스티벌
            </Nav.Link>
            <Nav.Link as={NavLink} to="/international-performances">
              내한공연
            </Nav.Link>
            <Nav.Link as={NavLink} to="/community">
              커뮤니티
            </Nav.Link>
          </Nav>
          {/* 로그인 여부에 따른 UI */}
          {user ? (
            <>
              <span className="welcome-text">{user.displayName}님</span>
              <Button
                variant="outline-light"
                className="logout-btn"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/signin">
              로그인
            </Nav.Link>
          )}
          {/* 검색창 */}
          <Form className="d-flex search-form">
            <Form.Control
              type="search"
              placeholder="Search"
              className="search-input"
              aria-label="Search"
            />
            <Button variant="outline-light" className="search-btn">
              <FontAwesomeIcon icon={faSearch} />{" "}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Layout;
