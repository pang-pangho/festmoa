// src/components/FestivalCard.jsx
import React from "react";
import { Card } from "react-bootstrap";

const FestivalCard = ({ item }) => {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Img variant="top" src={item.poster._text} />
      <Card.Body>
        <Card.Title>{item.prfnm._text}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default FestivalCard;
