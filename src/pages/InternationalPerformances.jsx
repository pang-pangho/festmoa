import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PerformanceCard from "../components/FestivalCard";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";
import LoadingBar from "../components/LoadingBar";

const InternationalPerformances = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadPerformances = async () => {
      const cachedData = localStorage.getItem("internationalPerformances");
      if (cachedData) {
        setPerformances(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const params = { cpage: 1, rows: 100, shcate: "CCCD" };

        setLoading(true);
        setProgress(0);

        const data = await fetchPerformances(params);
        const performancesList = Array.isArray(data?.dbs?.db)
          ? data.dbs.db
          : [];

        const detailedPerformancesPromises = performancesList.map(
          (item, index) => {
            setProgress(
              Math.floor(((index + 1) / performancesList.length) * 100)
            );
            return fetchPerformanceDetails(item.mt20id._text);
          }
        );

        const detailedPerformances = await Promise.all(
          detailedPerformancesPromises
        );
        const successfulDetails = detailedPerformances
          .filter((result) => result?.dbs?.db?.visit?._text === "Y")
          .map((result) => result.dbs.db);

        setPerformances(successfulDetails);
        localStorage.setItem(
          "internationalPerformances",
          JSON.stringify(successfulDetails)
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
          <p>내한 공연 정보를 찾을 수 없습니다.</p>
        )}
      </Row>
    </Container>
  );
};

export default InternationalPerformances;
