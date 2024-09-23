import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FestivalCard.css";

const FestivalCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${item.mt20id._text}`);
  };

  return (
    <Card className="festival-card" onClick={handleClick}>
      <Card.Img
        variant="top"
        src={item.poster._text}
        alt={item.prfnm._text}
        className="card-img-top"
      />
      <Card.Body>
        <Card.Title className="card-title">{item.prfnm._text}</Card.Title>
        <Card.Text>
          {item.fcltynm._text} <br />
          {item.prfpdfrom._text} ~ {item.prfpdto._text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FestivalCard;
