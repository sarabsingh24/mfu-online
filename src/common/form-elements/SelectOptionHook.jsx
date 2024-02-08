import React from 'react';
import { Form } from 'react-bootstrap';
function SelectOptionHook({
  type,
  name,
  label,
  register,
  reqText,
  disabled,
  pattern,
  condition,
  listOptions,
  errorBorder,
  mandatory,
  value,
  changeFun,
  sts
}) {



  return (
    <Form.Group className="mb-0">
      <Form.Label>
        {label}
        <span className="red">{mandatory}</span>
      </Form.Label>
      <Form.Select
        className={` ${
          errorBorder ? 'border border-1 border-danger rounded-1' : null
        }`}
        id="country"
        {...register(name, {
          required: reqText,
          disabled: sts ? true : false,
        })}
        onChange={changeFun}
        value={value}
      >
        {listOptions.map((options, index) => {
          return (
            <option key={index} value={options.value}>
              {options.label}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectOptionHook;

// disabled selected hidden
