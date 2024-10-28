import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FestivalCard from "../components/FestivalCard";
import { fetchPerformances } from "../api/kopisApi";
import LoadingBar from "../components/LoadingBar";

const DomesticFestivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadFestivals = async () => {
      const cachedData = localStorage.getItem("domesticFestivals");
      if (cachedData) {
        setFestivals(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const params = { cpage: 1, rows: 40, shcate: "CCCD" };

        setLoading(true);
        setProgress(0);

        const data = await fetchPerformances(params);
        const festivalsData = Array.isArray(data?.dbs?.db) ? data.dbs.db : [];

        setFestivals(festivalsData);
        localStorage.setItem(
          "domesticFestivals",
          JSON.stringify(festivalsData)
        );
        setProgress(100);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFestivals();
  }, []);

  if (loading) return <LoadingBar progress={Math.floor(progress)} />;
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
