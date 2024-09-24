import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FestivalCard.css";

const FestivalCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${item.mt20id._text}`); // 클릭 시 디테일 페이지로 이동
  };

  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      className="performance-card"
    >
      <Card.Img
        variant="top"
        src={item.poster?._text}
        alt={item.prfnm?._text}
      />
      <Card.Body>
        <Card.Title>{item.prfnm?._text}</Card.Title>
        <Card.Text>
          {item.prfpdfrom?._text} ~ {item.prfpdto?._text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FestivalCard;
