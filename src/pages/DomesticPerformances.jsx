import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceCard from "../components/FestivalCard";
import { fetchPerformances } from "../api/kopisApi";
import LoadingBar from "../components/LoadingBar";

const DomesticPerformance = () => {
  const [performanceList, setPerformanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDomesticPerformances = async () => {
      try {
        const params = {
          cpage: 1,
          rows: 10, // 원하는 개수로 변경 가능
          shcate: "AAAA", // 국내 공연 카테고리
        };

        // 쿼리 파라미터가 제대로 전달되는지 확인
        console.log("쿼리 파라미터 확인:", params);

        // 국내 공연 데이터 가져오기
        const data = await fetchPerformances(params);

        // 가져온 데이터를 배열로 설정
        const performancesData = Array.isArray(data?.dbs?.db)
          ? data.dbs.db
          : [];
        setPerformanceList(performancesData);
      } catch (error) {
        console.error("국내 공연 데이터 로딩 실패:", error);
        setError(error.message);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    loadDomesticPerformances(); // 데이터 로드
  }, []);

  if (loading) return <LoadingBar progress={50} />; // 로딩바는 임의의 프로그레스 바로 설정
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
