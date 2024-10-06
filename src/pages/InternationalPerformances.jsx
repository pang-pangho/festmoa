import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceCard from "../components/FestivalCard";
import LoadingBar from "../components/LoadingBar";
import useLoadData from "../hooks/useLoadData";

const InternationalPerformances = () => {
  const {
    data: performances,
    loading,
    error,
    progress,
  } = useLoadData("CCCD", true, "international-performances");

  if (loading) return <LoadingBar progress={progress} />;
  if (error) return <div>에러 발생: {error}</div>;

  console.log("Fetched International Performances:", performances);

  return (
    <Container>
      <Row>
        {performances?.length > 0 ? (
          performances.map((item, index) => (
            <Col lg={4} key={index}>
              <PerformanceCard item={item} />
            </Col>
          ))
        ) : (
          <p>내한 공연 정보를 찾을 수 없습니다.</p>
        )}
      </Row>
    </Container>
  );
};

export default InternationalPerformances;
