import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import "./Layout.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Layout = () => {
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
          {/* 검색창 추가 */}
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
