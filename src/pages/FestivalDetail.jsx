import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPerformanceDetails } from "../api/kopisApi";
import { Container, Row, Col } from "react-bootstrap";
import "./FestivalDetail.css";

const FestivalDetail = () => {
  const { id } = useParams(); // 라우팅에서 넘어온 공연 ID 확인
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      console.log("Fetching details for performance ID:", id); // 콘솔에 ID 값 출력
      try {
        setLoading(true);
        const data = await fetchPerformanceDetails(id); // 공연 상세 정보 요청
        console.log("공연 상세 데이터:", data); // API 응답 데이터 확인
        setDetails(data?.dbs?.db || null); // 응답 데이터 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);
  console.log("!!!details?.styurls?.styurl");
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!details) return <div>해당 공연 정보를 찾을 수 없습니다.</div>;

  // 콘솔에 포스터 및 기타 정보가 제대로 있는지 확인
  console.log("Poster URL:", details?.poster?._text);
  console.log("Performance Name:", details?.prfnm?._text);
  console.log("!!!", details?.styurls?.styurl._text);
  return (
    <Container className="festival-detail-container">
      <Row className="my-4">
        <Col md={8}>
          <img
            src={
              details?.poster?._text || "https://via.placeholder.com/300x400"
            }
            alt={details?.prfnm?._text || "포스터 이미지가 없습니다."}
            className="festival-poster"
          />
        </Col>
        <Col md={4} className="detail-info">
          <h1>{details?.prfnm?._text || "제목 없음"}</h1>
          <p>
            공연 기간: {details?.prfpdfrom?._text || "정보 없음"} ~{" "}
            {details?.prfpdto?._text || "정보 없음"}
          </p>
          <p>장소: {details?.fcltynm?._text || "정보 없음"}</p>
          <p>장르: {details?.genrenm?._text || "정보 없음"}</p>
          <p>관람 연령: {details?.prfage?._text || "정보 없음"}</p>
          <p>티켓 가격: {details?.pcseguidance?._text || "정보 없음"}</p>
          <p>러닝 타임: {details?.prfruntime?._text || "정보 없음"}</p>
        </Col>
      </Row>
      <Row>
        <img
          src={
            details?.styurls?.styurl._text ||
            "https://via.placeholder.com/300x400"
          }
          alt={details?.prfnm?._text || "포스터 이미지가 없습니다."}
        />
      </Row>
    </Container>
  );
};

export default FestivalDetail;
