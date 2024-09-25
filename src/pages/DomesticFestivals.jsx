import React, { useEffect, useState } from "react";
import FestivalCard from "../components/FestivalCard";
import LoadingBar from "../components/LoadingBar";
import { Container, Row, Col } from "react-bootstrap";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";

const DomesticFestivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadFestivals = async () => {
      try {
        setLoading(true);
        setProgress(0); //

        const data = await fetchPerformances({
          cpage: 1,
          rows: 10,
          shcate: "CCCD",
        });

        const festivalsData = data?.dbs?.db || [];
        const totalFestivals = festivalsData.length;

        if (totalFestivals > 0) {
          const detailedFestivals = [];

          for (let i = 0; i < festivalsData.length; i++) {
            const details = await fetchPerformanceDetails(
              festivalsData[i].mt20id._text
            );
            detailedFestivals.push(details?.dbs?.db || festivalsData[i]);

            setProgress(((i + 1) / totalFestivals) * 100);
          }

          setFestivals(detailedFestivals);
        } else {
          setFestivals([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFestivals();
  }, []);

  if (loading) return <LoadingBar progress={progress} />;
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
