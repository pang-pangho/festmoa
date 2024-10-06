import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FestivalCard.css";

const FestivalCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${item.mt20id?._text || ""}`); // 안전하게 mt20id 접근
  };

  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      className="performance-card"
    >
      <Card.Img
        variant="top"
        src={item.poster?._text || "기본 이미지 URL"}
        alt={item.prfnm?._text || "제목 없음"}
      />
      <Card.Body>
        <Card.Title>{item.prfnm?._text || "제목 없음"}</Card.Title>
        <Card.Text>
          {item.prfpdfrom?._text || "시작일 없음"} ~{" "}
          {item.prfpdto?._text || "종료일 없음"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FestivalCard;
