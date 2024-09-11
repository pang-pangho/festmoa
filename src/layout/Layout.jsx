import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Layout;
