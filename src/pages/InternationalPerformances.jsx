// src/pages/InternationalPerformances.jsx
import React, { useEffect, useState } from "react";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";
import PerformanceCard from "../components/FestivalCard"; // 기존 FestivalCard 컴포넌트를 사용합니다.
import { Container, Row, Col } from "react-bootstrap";

const InternationalPerformances = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPerformances = async () => {
      try {
        setLoading(true);

        // 1. 공연 목록을 가져옴
        const data = await fetchPerformances({
          cpage: 1,
          rows: 100, // 한 번에 불러올 공연 수 설정
          shcate: "CCCD", // 내한공연 카테고리 설정
        });

        // 2. 공연 목록에서 ID를 추출하여 병렬로 상세 정보 요청
        const performanceIds = data?.dbs?.db.map(
          (performance) => performance.mt20id._text
        );

        // 3. 병렬로 공연 상세 정보 요청
        const performanceDetailsPromises = performanceIds.map((id) =>
          fetchPerformanceDetails(id)
        );
        const detailedPerformances = await Promise.all(
          performanceDetailsPromises
        );

        // 4. 상세 정보에서 'visit' 필드를 기준으로 내한공연만 필터링
        const filteredPerformances = detailedPerformances
          .filter((detail) => detail?.dbs?.db?.visit?._text === "Y") // visit 필터링
          .map((detail) => detail.dbs.db);

        // 5. 필터링된 내한공연 데이터를 상태에 저장
        setPerformances(filteredPerformances);

        console.log("필터링된 내한공연:", filteredPerformances);
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
