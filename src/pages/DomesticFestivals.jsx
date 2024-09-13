// src/pages/DomesticFestivals.jsx
import React, { useEffect, useState } from "react";
import FestivalCard from "../components/FestivalCard"; // 공연 정보를 보여줄 카드 컴포넌트
import { Container, Row, Col } from "react-bootstrap"; // React Bootstrap 사용
import { fetchPerformances } from "../api/kopisApi"; // API 호출 함수 임포트
const DomesticFestivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadFestivals = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformances({
          cpage: 1,
          rows: 10,
          shcate: "CCCD",
        });
        console.log("국내 페스티벌 데이터:", data);

        if (data?.dbs?.db) {
          setFestivals(data.dbs.db);
        } else {
          setFestivals([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFestivals();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <Container>
      <Row>
        {festivals.length > 0 ? (
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
