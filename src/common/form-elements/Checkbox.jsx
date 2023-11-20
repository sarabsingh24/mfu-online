import React from 'react'
import { Form } from "react-bootstrap";

function checkbox() {
  return (
    <Form.Group className="mb-3">
      <Form.Check type="checkbox" label="Can't check this" />
    </Form.Group>
  );
}

export default checkbox