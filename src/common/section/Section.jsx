import React from 'react'
import Card from "react-bootstrap/Card";

const cardStyle = {
  margin:'24px 0',
  boxShadow:'0 5px 9.5px 0.5px rgb(0 0 0 / 10%)',
  borderRadius:'10px',
}

function Section({ children, heading }) {
  return (
    <Card style={cardStyle}>
      <Card.Header>{heading}</Card.Header>
      <Card.Body>{children} </Card.Body>
    </Card>
  );
}

export default Section