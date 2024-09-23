// src/pages/FestivalDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPerformanceDetails } from "../api/kopisApi";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./FestivalDetail.css";

const FestivalDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformanceDetails(id);
        console.log("공연 상세 데이터:", data);
        setDetails(data?.dbs?.db || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!details) return <div>해당 공연 정보를 찾을 수 없습니다.</div>;

  const ticketUrls = details.styurls?.styurl;

  const urls = Array.isArray(ticketUrls) ? ticketUrls : [ticketUrls];

  return (
    <Container className="festival-detail-container">
      <Row className="my-4">
        <Col md={8}>
          <img
            src={details.poster._text}
            alt={details.prfnm._text}
            className="festival-poster"
          />
        </Col>
        <Col md={4} className="detail-info">
          <h1>{details.prfnm._text}</h1>
          <p>
            공연 기간: {details.prfpdfrom._text} ~ {details.prfpdto._text}
          </p>
          <p>장소: {details.fcltynm._text}</p>
          <p>장르: {details.genrenm._text}</p>
          <p>관람 연령: {details.prfage._text}</p>
          <p>티켓 가격: {details.pcseguidance._text}</p>
          <p>러닝 타임: {details.prfruntime._text}</p>
        </Col>
      </Row>
      <Row className="additional-info"></Row>
    </Container>
  );
};

export default FestivalDetail;
