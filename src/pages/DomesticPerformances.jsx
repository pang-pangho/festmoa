// src/pages/DomesticPerformance.jsx
import React, { useEffect, useState } from "react";
import PerformanceCard from "../components/FestivalCard";
import LoadingBar from "../components/LoadingBar";
import { Container, Row, Col } from "react-bootstrap";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";

const DomesticPerformance = () => {
  const [performanceList, setPerformanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadPerformances = async () => {
      try {
        setLoading(true);
        setProgress(0);

        const data = await fetchPerformances({
          cpage: 1,
          rows: 10,
          shcate: "AAAA", // 국내 공연 카테고리
        });

        const performancesData = data?.dbs?.db || [];
        const totalPerformances = performancesData.length;

        if (totalPerformances > 0) {
          const detailedPerformances = [];

          for (let i = 0; i < performancesData.length; i++) {
            const details = await fetchPerformanceDetails(
              performancesData[i].mt20id._text
            );
            detailedPerformances.push(details?.dbs?.db || performancesData[i]);

            setProgress(((i + 1) / totalPerformances) * 100);
          }

          setPerformanceList(detailedPerformances);
        } else {
          setPerformanceList([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPerformances();
  }, []);

  if (loading) return <LoadingBar progress={progress} />;
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
