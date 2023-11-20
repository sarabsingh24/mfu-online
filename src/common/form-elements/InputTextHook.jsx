import React, { useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { Form } from 'react-bootstrap';
//errorBorder
function InputTextHook({
  type,
  name,
  register,
  reqText,
  disabled,
  pattern,
  condition,
  errorBorder,
}) {
  console.log(errorBorder);
  return (
    <Form.Group
      className={`mb-1 ${
        errorBorder ? 'border border-1 border-danger rounded-1' : null
      }`}
    >
      <Form.Control
        type={type}
        {...register(name, {
          required: reqText,
          pattern: pattern && {
            value: condition.value,
            message: condition.message,
          },
        })}
        disabled={disabled ? true : false}
        className=""
      />
    </Form.Group>
  );
}

export default InputTextHook;
