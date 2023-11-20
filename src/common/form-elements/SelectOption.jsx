import React from "react";
import { Form } from "react-bootstrap";

function SelectOption({
  name,
  label,
  options,
  changeFun,
  mandatory,
  errors,
  value,
  count,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label}
        <span className="red">{mandatory}</span>
      </Form.Label>

      <Form.Select
        data-count={count && count}
        onChange={changeFun}
        name={name}
        className={!!errors?.[name] && "redBorder"}
        value={value}
        style={{ color: "#666", fontWeight: "500" }}
        // required
      >
        {options.map((item) => {
          return (
            <option key={item.value} label={item.label} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </Form.Select>
      <div className="red">{errors?.[name]}</div>
    </Form.Group>
  );
}

export default SelectOption;
