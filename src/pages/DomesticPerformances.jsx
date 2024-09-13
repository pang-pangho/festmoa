import React, { useEffect, useState } from "react";
import PerformanceCard from "../components/FestivalCard";
import { Container, Row, Col } from "react-bootstrap";
import { fetchPerformances } from "../api/kopisApi";

const DomesticPerformance = () => {
  const [performanceList, setPerformanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPerformances = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformances({
          cpage: 1,
          rows: 10,
          shcate: "AAAA", // 국내 공연 카테고리
        });
        setPerformanceList(data?.dbs?.db || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPerformances();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <Container>
      <Row>
        {performanceList.length > 0 ? (
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
