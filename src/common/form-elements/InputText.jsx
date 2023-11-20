import React from "react";
import { Form } from "react-bootstrap";

function InputText({
  label,
  placeholder,
  disabled,
  value,
  type,
  changeFun,
  mandatory,
  errors,
  name,
  count,
  clickFun,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label}
        <span className="red">{mandatory}</span>
      </Form.Label>
      <Form.Control
        name={name}
        placeholder={placeholder ? placeholder : ""}
        disabled={disabled ? disabled : false}
        value={value}
        data-count={count && count}
        type={type ? type : "text"}
        onClick={clickFun && clickFun}
        onChange={changeFun && changeFun}
        className={!!errors?.[name] && "redBorder"}
        isInvalid={!!errors?.name}
        style={{ color: "#666", fontWeight: "500" }}
      />
      <div className="red">{errors?.[name]}</div>
    </Form.Group>
  );
}

export default InputText;
