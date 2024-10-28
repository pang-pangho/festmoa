import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceCard from "../components/FestivalCard";
import { fetchPerformances } from "../api/kopisApi";
import LoadingBar from "../components/LoadingBar";

const DomesticPerformances = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadPerformances = async () => {
      const cachedData = localStorage.getItem("domesticPerformances");
      if (cachedData) {
        setPerformances(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const params = { cpage: 1, rows: 10, shcate: "AAAA" };

        setLoading(true);
        setProgress(0);

        const data = await fetchPerformances(params);
        const performancesData = Array.isArray(data?.dbs?.db)
          ? data.dbs.db
          : [];

        setPerformances(performancesData);
        localStorage.setItem(
          "domesticPerformances",
          JSON.stringify(performancesData)
        );
        setProgress(100);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPerformances();
  }, []);

  if (loading) return <LoadingBar progress={Math.floor(progress)} />;
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
          <p>국내 공연 정보를 찾을 수 없습니다.</p>
        )}
      </Row>
    </Container>
  );
};

export default DomesticPerformances;
