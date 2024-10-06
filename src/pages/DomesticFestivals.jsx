import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FestivalCard from "../components/FestivalCard";
import LoadingBar from "../components/LoadingBar";
import useLoadData from "../hooks/useLoadData";

const DomesticFestivals = () => {
  const {
    data: festivals,
    loading,
    error,
    progress,
  } = useLoadData("CCCD", false, "domestic-festivals");

  if (loading) return <LoadingBar progress={progress} />;
  if (error) return <div>에러 발생: {error}</div>;

  console.log("Fetched Domestic Festivals:", festivals);

  return (
    <Container>
      <Row>
        {festivals?.length > 0 ? (
          festivals.map((item, index) => (
            <Col lg={4} key={index}>
              <FestivalCard item={item} />
            </Col>
          ))
        ) : (
          <p>국내 페스티벌 정보를 찾을 수 없습니다.</p>
        )}
      </Row>
    </Container>
  );
};

export default DomesticFestivals;
