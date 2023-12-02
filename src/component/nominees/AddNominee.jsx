import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// component
import InputTextHook from '../../common/form-elements/InputTextHook';
import GridCustom from '../../common/grid-custom/GridCustom';
import Section from '../../common/section/Section';
import InputText from '../../common/form-elements/InputText';
import DatePicker from '../../common/form-elements/DatePicker';

const errorFontStyle = {
  color: 'red',
  fontSize: '12px',
  height: '12px',
  display: 'block',
};

export default function AddNominee({
  count,
  formObj,
  setForm,
  errors,
  thisAccountHandeler,
  percentSts,
  register,
  setValue,
}) {
  let order = count === 0 ? 'First' : count === 1 ? 'Second' : 'Third';

  useEffect(() => {
    setValue(`${order}-nomineeName`, formObj?.nomineeName);
    setValue(`${order}-relation`, formObj?.relation);
    setValue(`${order}-percentage`, formObj?.percentage);
    setValue(`${order}-dateOfBirth`, formObj?.dateOfBirth);
  }, []);

  return (
    <Section heading={`${order} Nominee`}>
      <GridCustom>
        <Row>
          <Col xs={12} md={3}>
            <InputTextHook
              type="text"
              register={register}
              name={`${order}-nomineeName`}
              label="Name of Nominee"
              reqText="name required"
              disabled={false}
              errorBorder={errors[[`${order}-nomineeName`]]?.message}
              mandatory="*"
              // value={form?.name || ''}
              // changeFun={thisAccountHandeler}
            />
            <small style={errorFontStyle}>
              {errors[`${order}-nomineeName`]?.message}
            </small>
            
          </Col>
          <Col xs={12} md={3}>
            <InputTextHook
              type="text"
              register={register}
              name={`${order}-relation`}
              label="Relationship"
              reqText="relationship required"
              disabled={false}
              errorBorder={errors[`${order}-relation`]?.message}
              mandatory="*"
              // value={form?.name || ''}
              // changeFun={thisAccountHandeler}
            />
            <small style={errorFontStyle}>
              {errors[`${order}-relation`]?.message}
            </small>
            
          </Col>
          <Col xs={12} md={3}>
            <InputTextHook
              type="text"
              register={register}
              name={`${order}-percentage`}
              label="Percent(%)"
              reqText="Percent(%) required"
              disabled={false}
              errorBorder={errors[`${order}-percentage`]?.message || percentSts}
              mandatory="*"
              // value={form?.name || ''}
              // changeFun={thisAccountHandeler}
            />
            <small style={errorFontStyle}>
              {percentSts ? 'total percentage should be 100' : ''}

              {errors[`${order}-percentage`]?.message}
            </small>
           
          </Col>
          <Col xs={12} md={3}>
            <InputTextHook
              type="date"
              register={register}
              name={`${order}-dateOfBirth`}
              label="Date of Birth"
              reqText="date required"
              disabled={false}
              errorBorder={errors[`${order}-dateOfBirth`]?.message}
              mandatory="*"
              // value={form?.dateOfBirth || ''}
              // changeFun={formHandeler}
            />
            <small style={errorFontStyle}>
              {errors[`${order}-dateOfBirth`]?.message}
            </small>
            
          </Col>
        </Row>
      </GridCustom>
    </Section>
  );
}
