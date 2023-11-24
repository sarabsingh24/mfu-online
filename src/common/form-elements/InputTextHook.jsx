import React, { useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { Form } from 'react-bootstrap';
//errorBorder
function InputTextHook({
  type,
  name,
  label,
  register,
  mandatory,
  reqText,
  disabled,
  pattern,
  condition,
  errorBorder,
  placeholder,
  errors,
  compair,
  clickFun,
  value,
  depend,
  sts,
}) {

 
  return (
    <Form.Group className="mb-1">
      <Form.Label>
        {label}
        <span className="red">{mandatory}</span>
      </Form.Label>

      {compair ? (
        <Form.Control
          type={type}
          className={` ${
            errorBorder ? 'border border-1 border-danger rounded-1' : null
          }`}
          {...register(name, {
            required: reqText,
            validate: (value) => value === compair || 'text does not match',
            pattern: pattern && {
              value: condition.value,
              message: condition.message,
            },
          })}
          disabled={disabled ? true : false}
        />
      ) : depend?.length ? (
        <Form.Control
          type={type}
          
          className={` ${
            errorBorder ? 'border border-1 border-danger rounded-1' : null
          }`}
          onClick={clickFun && clickFun}
          value={value && value}
          {...register(name, {
            required: reqText,
            disabled: sts,
            pattern: pattern && {
              value: condition.value,
              message: condition.message,
            },
          })}
          // disabled={disabled ? true : false}
        />
      ) : (
        <Form.Control
          type={type}
          className={` ${
            errorBorder ? 'border border-1 border-danger rounded-1' : null
          }`}
          onClick={clickFun && clickFun}
          value={value && value}
          {...register(name, {
            required: reqText,

            pattern: pattern && {
              value: condition.value,
              message: condition.message,
            },
          })}
          // disabled={disabled ? true : false}
        />
      )}
    </Form.Group>
  );
}

export default InputTextHook;
