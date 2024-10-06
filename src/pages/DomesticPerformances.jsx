import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceCard from "../components/FestivalCard";
import LoadingBar from "../components/LoadingBar";
import useLoadData from "../hooks/useLoadData";

const DomesticPerformance = () => {
  const {
    data: performanceList,
    loading,
    error,
    progress,
  } = useLoadData("AAAA", false, "domestic-performance");

  if (loading) return <LoadingBar progress={progress} />;
  if (error) return <div>에러 발생: {error}</div>;

  console.log("Fetched Domestic Performances:", performanceList);

  return (
    <Container>
      <Row>
        {performanceList?.length > 0 ? (
          performanceList.map((item, index) => (
            <Col lg={4} key={index}>
              <PerformanceCard item={item} />
            </Col>
          ))
        ) : (
          <p>국내 공연 정보를 찾을 수 없습니다.</p>
        )}
      </Row>
    </Container>
  );
};

export default DomesticPerformance;
