// src/pages/DomesticFestivals.jsx
import React, { useEffect, useState } from "react";
import FestivalCard from "../components/FestivalCard";
import { Container, Row, Col } from "react-bootstrap";
import { fetchPerformances } from "../api/kopisApi";
import SearchBar from "../components/SearchBar";

const DomesticFestivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredFestivals, setFilteredFestivals] = useState([]);

  useEffect(() => {
    const loadFestivals = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformances({
          cpage: 1,
          rows: 10,
          shcate: "CCCD",
        });

        if (data?.dbs?.db) {
          setFestivals(data.dbs.db);
          setFilteredFestivals(data.dbs.db);
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

  const handleSearch = (query) => {
    const filtered = festivals.filter((festival) =>
      festival.prfnm._text.includes(query)
    );
    setFilteredFestivals(filtered);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <Container>
      <SearchBar onSearch={handleSearch} /> {}
      <Row>
        {filteredFestivals.length > 0 ? (
          filteredFestivals.map((item, index) => (
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
