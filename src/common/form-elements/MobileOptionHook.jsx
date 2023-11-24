import React, { useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { Form } from 'react-bootstrap';

function MobileOptionHook({
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
  changeFun,
  maxLength,
  boxWidth,
  
}) {
  return (
    <Form.Control
      type={type}
      className={`border border-1 rounded-1 ${
        errorBorder ? ' border-danger ' : null
      }`}
      maxLength={maxLength}
      // onChange={changeFun}
      {...register(name, {
        required: reqText,
        pattern: pattern && {
          value: condition.value,
          message: condition.message,
        },
      })}
      disabled={disabled ? true : false}
      style={{ width: boxWidth }}
    />
  );
}

export default MobileOptionHook



// import React, { useState, useEffect } from 'react';
// import { useWatch } from 'react-hook-form';
// import { Form } from 'react-bootstrap';
// //errorBorder
// function InputTextHook({
//   type,
//   name,
//   label,
//   register,
//   mandatory,
//   reqText,
//   disabled,
//   pattern,
//   condition,
//   errorBorder,
// }) {
//   console.log(errorBorder);
//   return (
//     <Form.Group
//       className="mb-1"
//     >
//       <Form.Label>
//         {label}
//         <span className="red">{mandatory}</span>
//       </Form.Label>
//       <Form.Control
//         type={type}
//         className={` ${
//           errorBorder ? 'border border-1 border-danger rounded-1' : null
//         }`}
//         {...register(name, {
//           required: reqText,
//           pattern: pattern && {
//             value: condition.value,
//             message: condition.message,
//           },
//         })}
//         disabled={disabled ? true : false}
       
//       />
//     </Form.Group>
//   );
// }

// export default InputTextHook;
