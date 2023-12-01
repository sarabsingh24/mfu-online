import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Style.css';

//component
import Section from '../../common/section/Section';
import InputText from '../../common/form-elements/InputText';
import InputTextHook from '../../common/form-elements/InputTextHook';
import SelectOptionHook from '../../common/form-elements/SelectOptionHook';

import GridCustom from '../../common/grid-custom/GridCustom';
import SelectOption from '../../common/form-elements/SelectOption';
import { accountType, bankProofOptions } from './accountData';

const errorFontStyle = {
  color: 'red',
  fontSize: '12px',
  height: '12px',
  display: 'block',
};

function BankAccountSection({
  count,
  form,
  formObj,
  setForm,
  errorsOld,
  thisAccountHandeler,
  register,
  errors,
  setValue,
  watch,
}) {
  let accountCount = count === 0 ? 'Default' : count === 1 ? 'Second' : 'Third';

  useEffect(() => {
    setValue(`${accountCount}-accountNo`, formObj?.accountNo);
    setValue(`${accountCount}-reAccountNo`, formObj?.reAccountNo);
    setValue(`${accountCount}-accountType`, formObj?.accountType);
    setValue(`${accountCount}-bankId`, formObj?.bankId);
    setValue(`${accountCount}-micrCode`, formObj?.micrCode);
    setValue(`${accountCount}-ifscCode`, formObj?.ifscCode);
    setValue(`${accountCount}-bankProof`, formObj?.bankProof);
  }, []);

  let labelName = `${accountCount}-accountNo`;
  const accountNo = watch(labelName);

  return (
    <Section heading={`${accountCount} Bank Account details`}>
      <GridCustom>
        <Row>
          <Col xs={12} md={4}>
            <InputTextHook
              type="password"
              register={register}
              // name="accountNo"
              name={`${accountCount}-accountNo`}
              label="Bank A/c No"
              reqText="Bank A/c No required"
              disabled={false}
              errorBorder={errors[`${accountCount}-accountNo`]?.message}
              mandatory="*"
              pattern={true}
              condition={{
                value: /(^\d{1,16}$)/g,
                message: 'number required',
              }}
              // value={formObj?.accountNo || ''}
              // changeFun={formHandeler}
            />
            <small style={errorFontStyle}>
              {errors[`${accountCount}-accountNo`]?.message}
            </small>
          </Col>
          <Col xs={12} md={4}>
            <InputTextHook
              register={register}
              // name={reAccountNo}
              name={`${accountCount}-reAccountNo`}
              label="Re-Enter Bank A/c No"
              placeholder="PAN/PEKRN no."
              reqText="please re-enter Re-Enter Bank A/c No"
              disabled={false}
              errorBorder={errors[`${accountCount}-reAccountNo`]?.message}
              mandatory="*"
              // value={form?.confirmpanPekrnNo.toUpperCase() || ''}
              changeFun={thisAccountHandeler}
              compair={accountNo}
            />
            <small style={errorFontStyle}>
              {errors[`${accountCount}-reAccountNo`]?.message}
            </small>
          </Col>
          <Col xs={12} md={4}>
            <SelectOptionHook
              register={register}
              // name="accountType"
              name={`${accountCount}-accountType`}
              label="Account Type"
              reqText="please select Account Type"
              disabled={false}
              mandatory="*"
              errorBorder={
                // !form?.otherDetail?.sourceOfWealth &&
                errors[`${accountCount}-accountType`]?.message
              }
              listOptions={accountType}
              // value={form?.otherDetail?.sourceOfWealth || ''}
              changeFun={thisAccountHandeler}
            />
            <small style={errorFontStyle}>
              {
                // !form?.otherDetail?.sourceOfWealth &&
                errors[`${accountCount}-accountType`]?.message
              }
            </small>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <InputTextHook
              type="text"
              register={register}
              // name="accountNo"
              name={`${accountCount}-bankId`}
              label="Bank"
              reqText="name required"
              disabled={false}
              errorBorder={errors[`${accountCount}-bankId`]?.message}
              mandatory="*"

              // value={form?.name || ''}
              // changeFun={formHandeler}
            />
            <small style={errorFontStyle}>
              {errors[`${accountCount}-bankId`]?.message}
            </small>
          </Col>
          <Col xs={12} md={4}>
            <InputTextHook
              type="text"
              register={register}
              // name="accountNo"
              name={`${accountCount}-micrCode`}
              label="MICR"
              reqText="MICR required"
              disabled={false}
              errorBorder={errors[`${accountCount}-micrCode`]?.message}
              mandatory="*"

              // value={form?.name || ''}
              // changeFun={formHandeler}
            />
            <small style={errorFontStyle}>
              {errors[`${accountCount}-micrCode`]?.message}
            </small>
          </Col>
          <Col xs={12} md={4}>
            <InputTextHook
              type="text"
              register={register}
              // name="accountNo"
              name={`${accountCount}-ifscCode`}
              label="IFSC"
              reqText="IFSC required"
              disabled={false}
              errorBorder={errors[`${accountCount}-ifscCode`]?.message}
              mandatory="*"

              // value={form?.name || ''}
              // changeFun={formHandeler}
            />
            <small style={errorFontStyle}>
              {errors[`${accountCount}-ifscCode`]?.message}
            </small>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <SelectOptionHook
              register={register}
              // name="accountType"
              name={`${accountCount}-bankProof`}
              label="Bank Proof"
              reqText="please select Bank Proof"
              disabled={false}
              mandatory="*"
              errorBorder={
                // !form?.otherDetail?.sourceOfWealth &&
                errors[`${accountCount}-bankProof`]?.message
              }
              listOptions={bankProofOptions}
              // value={form?.otherDetail?.sourceOfWealth || ''}
              changeFun={thisAccountHandeler}
            />
            <small style={errorFontStyle}>
              {
                // !form?.otherDetail?.sourceOfWealth &&
                errors[`${accountCount}-bankProof`]?.message
              }
            </small>
          </Col>
        </Row>
      </GridCustom>
    </Section>
  );
}

export default BankAccountSection;
