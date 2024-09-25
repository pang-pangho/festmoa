// src/pages/InternationalPerformances.jsx
import React, { useEffect, useState } from "react";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";
import PerformanceCard from "../components/FestivalCard";
import LoadingBar from "../components/LoadingBar";
import { Container, Row, Col } from "react-bootstrap";

const InternationalPerformances = () => {
  const [performances, setPerformances] = useState([]);
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
          rows: 100,
          shcate: "CCCD",
        });

        const performancesData = data?.dbs?.db || [];
        const totalPerformances = performancesData.length;

        if (totalPerformances > 0) {
          const detailedPerformances = [];

          for (let i = 0; i < performancesData.length; i++) {
            const details = await fetchPerformanceDetails(
              performancesData[i].mt20id._text
            );

            if (details?.dbs?.db?.visit?._text === "Y") {
              detailedPerformances.push(details.dbs.db);
            }

            setProgress(((i + 1) / totalPerformances) * 100);
          }

          setPerformances(detailedPerformances);
        } else {
          setPerformances([]);
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
