// src/pages/InternationalPerformances.jsx
import React, { useEffect, useState } from "react";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";
import PerformanceCard from "../components/FestivalCard"; // 공연 정보를 보여줄 카드 컴포넌트
import { Container, Row, Col } from "react-bootstrap";
const InternationalPerformances = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [performancesId, setPerformancesId] = useState([]);

  useEffect(() => {
    const loadPerformances = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformances({
          cpage: 1,
          rows: 100,
          shcate: "CCCD",
        });
        console.log("공연 목록 데이터:", data);

        const ids = data?.dbs?.db.map(
          (performance) => performance.mt20id._text
        );
        console.log("공연 ID 목록:", ids);
        setPerformancesId(ids);

        // 상세 정보 호출 (ID로 내한공연 필터링)
        const filteredPerformances = [];
        for (const id of ids) {
          const details = await fetchPerformanceDetails(id);

          // visit 필드가 존재하는지 확인한 후 필터링
          if (details?.dbs?.db?.visit?._text === "Y") {
            console.log(details.dbs.db);
            filteredPerformances.push(details.dbs.db);
          }
          setPerformances(filteredPerformances);
        }

        console.log(performances);
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
        {performances.length > 0 ? (
          performances.map((item, index) => (
            <Col lg={4} key={index}>
              <PerformanceCard item={item} />
            </Col>
          ))
        ) : (
          <p>내한공연 정보를 찾을 수 없습니다.</p>
        )}
      </Row>
    </Container>
  );
};

export default InternationalPerformances;
