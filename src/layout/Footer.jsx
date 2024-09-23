import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col md={6} className="footer-info">
            <h5>FestMoa</h5>
            <p>
              강원도 특별자치도 춘천시 한림대학길 1, <br />
              대표: 김광호 | 사업자등록번호: 123-45-67890 <br />
              이메일: heypangho@gmail.com <br />© 2024 FestMoa. All rights
              reserved.
            </p>
          </Col>
          <Col md={6} className="footer-social">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
