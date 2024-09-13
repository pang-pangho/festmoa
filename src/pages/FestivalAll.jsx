// src/pages/FestivalAll.jsx
import React, { useEffect, useState } from "react";
import FestivalCard from "./FestivalCard";
import { Container, Row, Col } from "react-bootstrap";
const FestivalAll = ({ festivalList }) => {
  const [filteredFestivals, setFilteredFestivals] = useState([]);

  useEffect(() => {
    setFilteredFestivals(festivalList);
  }, [festivalList]);

  return (
    <div>
      <Container>
        <Row>
          {filteredFestivals.length > 0 ? (
            filteredFestivals.map((item, index) => (
              <Col lg={4} key={index}>
                {" "}
                {/* 한 열에 3개의 아이템을 표시 */}
                <FestivalCard item={item} />
              </Col>
            ))
          ) : (
            <p>공연 정보를 찾을 수 없습니다.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default FestivalAll;
