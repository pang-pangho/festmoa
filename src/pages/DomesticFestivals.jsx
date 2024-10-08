import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FestivalCard from "../components/FestivalCard";
import { fetchPerformances } from "../api/kopisApi";
import LoadingBar from "../components/LoadingBar";

const DomesticFestivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFestivals = async () => {
      try {
        // 국내 페스티벌 데이터 가져오기
        const data = await fetchPerformances({
          cpage: 1,
          rows: 4, // 원하는 개수로 변경 가능
          shcate: "CCCD", // 페스티벌 카테고리
        });

        // 가져온 데이터를 배열로 설정
        const festivalsData = Array.isArray(data?.dbs?.db) ? data.dbs.db : [];
        setFestivals(festivalsData);
      } catch (error) {
        console.error("페스티벌 데이터 로딩 실패:", error);
        setError(error.message);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    loadFestivals(); // 데이터 로드
  }, []);

  if (loading) return <LoadingBar progress={50} />; // 로딩바는 임의의 프로그레스 바로 설정
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
