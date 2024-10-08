import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceCard from "../components/FestivalCard";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";
import LoadingBar from "../components/LoadingBar";

const InternationalPerformances = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInternationalPerformances = async () => {
      try {
        const params = {
          cpage: 1,
          rows: 100, // 원하는 개수로 변경 가능
          shcate: "CCCD", // 내한 공연 카테고리
        };

        // 1. 내한 공연 목록 데이터 가져오기
        const data = await fetchPerformances(params);

        // 2. 공연 목록에서 공연 ID만 추출 (ID가 없는 항목은 제외)
        const performancesList = Array.isArray(data?.dbs?.db)
          ? data.dbs.db.filter((item) => item?.mt20id?._text) // 공연 ID가 존재하는 항목만 필터링
          : [];

        console.log("performancesList:", performancesList); // 공연 목록 출력

        // 3. 공연 ID 목록으로 상세 정보 조회 (Promise.allSettled 사용)
        const detailedPerformancesPromises = performancesList.map((item) => {
          const performanceId = item.mt20id._text;
          console.log("Fetching details for performance ID:", performanceId); // 공연 ID 출력
          return fetchPerformanceDetails(performanceId);
        });

        const detailedPerformances = await Promise.allSettled(
          detailedPerformancesPromises
        );

        // 4. 성공한 요청만 필터링
        const successfulDetails = detailedPerformances
          .filter(
            (result) =>
              result.status === "fulfilled" &&
              result.value?.dbs?.db?.visit?._text === "Y"
          )
          .map((result) => result.value.dbs.db);

        console.log("successfulDetails:", successfulDetails); // 성공한 상세 정보 출력

        setPerformances(successfulDetails); // 필터링된 공연 정보를 상태에 저장
      } catch (error) {
        console.error("내한 공연 데이터 로딩 실패:", error);
        setError(error.message);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    loadInternationalPerformances(); // 데이터 로드
  }, []);

  if (loading) return <LoadingBar progress={50} />; // 로딩바는 임의의 프로그레스 바로 설정
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
          <p>내한 공연 정보를 찾을 수 없습니다.</p>
        )}
      </Row>
    </Container>
  );
};

export default InternationalPerformances;
