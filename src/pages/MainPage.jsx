import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceCard from "../components/FestivalCard";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";
import "./MainPage.css";

const MainPage = () => {
  const [domesticPerformances, setDomesticPerformances] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [internationalPerformances, setInternationalPerformances] = useState(
    []
  );

  useEffect(() => {
    // 국내공연 데이터 가져오기
    const loadDomesticPerformances = async () => {
      try {
        const data = await fetchPerformances({
          cpage: 1,
          rows: 4,
          shcate: "AAAA", // 국내 공연 카테고리
        });
        setDomesticPerformances(data?.dbs?.db || []);
      } catch (error) {
        console.error("국내공연 데이터 로딩 실패:", error);
      }
    };

    // 페스티벌 데이터 가져오기
    const loadFestivals = async () => {
      try {
        const data = await fetchPerformances({
          cpage: 1,
          rows: 4,
          shcate: "CCCD", // 페스티벌 카테고리
        });
        setFestivals(data?.dbs?.db || []);
      } catch (error) {
        console.error("페스티벌 데이터 로딩 실패:", error);
      }
    };

    // 내한공연 데이터 가져오기
    const loadInternationalPerformances = async () => {
      try {
        const data = await fetchPerformances({
          cpage: 1,
          rows: 30, // 여러 공연을 불러오도록 설정
          shcate: "CCCD", // 내한공연 카테고리 설정
        });

        // 공연 목록에서 ID 추출하여 병렬로 상세 정보 요청
        const performanceIds = data?.dbs?.db.map(
          (performance) => performance.mt20id._text
        );

        // 병렬로 공연 상세 정보 요청
        const performanceDetailsPromises = performanceIds.map((id) =>
          fetchPerformanceDetails(id)
        );
        const detailedPerformances = await Promise.all(
          performanceDetailsPromises
        );

        // 'visit' 필드를 기준으로 내한공연만 필터링
        const filteredPerformances = detailedPerformances
          .filter((detail) => detail?.dbs?.db?.visit?._text === "Y")
          .map((detail) => detail.dbs.db);

        setInternationalPerformances(filteredPerformances);
      } catch (error) {
        console.error("내한공연 데이터 로딩 실패:", error);
      }
    };

    // 데이터를 로드
    loadDomesticPerformances();
    loadFestivals();
    loadInternationalPerformances();
  }, []);

  return (
    <Container className="main-page">
      {/* 국내공연 섹션 */}
      <section className="performance-section">
        <h2 className="section-title">국내공연</h2>
        <Row>
          {domesticPerformances.map((performance, index) => (
            <Col lg={3} md={6} sm={12} key={index}>
              <PerformanceCard item={performance} />
            </Col>
          ))}
        </Row>
      </section>

      {/* 페스티벌 섹션 */}
      <section className="festival-section">
        <h2 className="section-title">페스티벌</h2>
        <Row>
          {festivals.map((festival, index) => (
            <Col lg={3} md={6} sm={12} key={index}>
              <PerformanceCard item={festival} />
            </Col>
          ))}
        </Row>
      </section>

      {/* 내한공연 섹션 */}
      <section className="international-section">
        <h2 className="section-title">내한공연</h2>
        <Row>
          {internationalPerformances.length > 0 ? (
            internationalPerformances.map((performance, index) => (
              <Col lg={3} md={6} sm={12} key={index}>
                <PerformanceCard item={performance} />
              </Col>
            ))
          ) : (
            <p>내한공연 정보를 찾을 수 없습니다.</p>
          )}
        </Row>
      </section>
    </Container>
  );
};

export default MainPage;
