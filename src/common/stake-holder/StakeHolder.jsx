import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//components
import InputTextHook from '../form-elements/InputTextHook';
import SelectOptionHook from '../form-elements/SelectOptionHook';
import MobileOptionHook from '../form-elements/MobileOptionHook';
import SelectSearchHook from '../form-elements/SelectSearchHook';
import Section from '../section/Section';
import InputText from '../form-elements/InputText';
import GridCustom from '../grid-custom/GridCustom';

import FooterSection from '../footerSection/FooterSection';
import { btnHandeler } from '../helper/Helper';
import { pageCount } from '../../reducer/Reducer/tab/tabSlice';
import useCommonReducer from '../customComp/useCommonReducer';
import {
  sourceOfWealthOptions,
  occupationOptions,
  politicalExposureOptions,
  addressTypeOptions,
  taxResidencyOptions,
  countryListOptions,
  grossAnnualIncomeOptions,
} from './stakeHolderData';

const errorFontStyle = {
  color: 'red',
  fontSize: '12px',
  height: '12px',
  display: 'block',
};

function StakeHolder({
  form,
  setForm,
  holderType,
  errors,
  register,
  watch,
  setValue,
  errorsOld,
  setErrors,
  networthRadio,
  setNetworthRadio,
  grossIncomeRadio,
  setGrossIncomeRadio,
  IsmisMatched,
  setISMisMatched,
}) {
  const [btnFun, setBtnFun] = useState({});
  const [isOtherSourceOfWealth, setIsOtherSourceOfWealth] = useState(true);
  const [isOtherOccupation, setIsOtherOccupation] = useState(true);
  const { stepsCount, dispatch } = useCommonReducer();
  const [blanket, setBlanket] = useState(false);

  const closeBlanketHandeler = () => {
    setBlanket(false);
  };

  useEffect(() => {
    if (blanket) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [blanket]);

  // on change handeler
  const formHandeler = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    //  errors[name].message = "";

    if (name === 'sourceOfWealth' && val === '') {
      console.log(['sourceOfWealthOthers'].value);
      setValue('sourceOfWealthOthers', '');
    }

    if (name === 'occupation' && val === '') {
      setValue('occupationOthers', '');
    }

    if (name === 'panPekrnNo' || name === 'confirmpanPekrnNo') {
      let valueCase = val.toUpperCase();
      setForm({
        ...form,
        [name]: valueCase,
      });
      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (
      // name === "residenceIsd" ||
      // name === "residenceStd" ||
      // name === "residencePhoneNo" ||
      name === 'primaryEmail'
    ) {
      setForm({
        ...form,
        contactDetail: {
          ...form.contactDetail,
          [name]: val,
        },
      });

      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (name === 'mobileIsdCode') {
      if (!isNaN(val)) {
        setForm({
          ...form,
          contactDetail: {
            ...form.contactDetail,
            mobileIsdCode: val,
          },
        });
        if (!!errorsOld[name]) {
          setErrors({ ...errorsOld, [name]: null });
        }
      }
    } else if (name === 'primaryMobileNo') {
      if (!isNaN(val)) {
        setForm({
          ...form,
          contactDetail: {
            ...form.contactDetail,
            primaryMobileNo: val,
          },
        });
        if (!!errorsOld[name]) {
          setErrors({ ...errorsOld, [name]: null });
        }
      }
    } else if (name === 'grossIncome') {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: 'string',
          [name]: val,
          netWorth: '',
          netWorthDate: '',
        },
      });
      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (name === 'netWorth' || name === 'netWorthDate') {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: 'string',
          [name]: val,
          grossIncome: '',
        },
      });
      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (
      name === 'sourceOfWealth' ||
      name === 'sourceOfWealthOthers' ||
      name === 'occupation' ||
      name === 'occupationOthers' ||
      name === 'kraAddressType' ||
      name === 'pep'
    ) {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: 'string',
          [name]: val,
        },
      });

      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (
      name === 'taxResidencyFlag' ||
      name === 'birthCity'
      // name === "birthCountry" ||
      // name === "citizenshipCountry" ||
      // name === "nationalityCountry"
    ) {
      setForm({
        ...form,
        fatcaDetail: {
          ...form.fatcaDetail,
          [name]: val,
        },
      });
      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (
      // name === "countriesTaxResidency" ||
      name === 'taxReferenceNo'
      // name === "taxIdentificationTypes"
    ) {
      setForm({
        ...form,
        fatcaDetail: {
          ...form.fatcaDetail,
          taxRecords: [{ ...form.fatcaDetail.taxRecords[0], [name]: val }],
        },
      });
      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else {
      setForm({ ...form, [name]: val });
      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    }

    if (name === 'sourceOfWealth' && val === '08') {
      setIsOtherSourceOfWealth(false);
    } else if (name === 'sourceOfWealth' && val !== '08') {
      setIsOtherSourceOfWealth(true);
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          [name]: val,
        },
      });
    }
  };

  // radio btn show hide
  const incomeStatus = (e) => {
    let status = e.target.dataset.name;
    if (status === 'GAI') {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: 'string',
          netWorth: '',
          netWorthDate: '',
        },
      });
      setGrossIncomeRadio(true);
      setNetworthRadio(false);
    } else {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: 'string',
          grossIncome: '',
        },
      });
      setGrossIncomeRadio(false);
      setNetworthRadio(true);
    }
  };

  useEffect(() => {
    setBtnFun(btnHandeler(dispatch, pageCount, stepsCount));
  }, [dispatch, stepsCount]);

  const panPekrnNo = watch('panPekrnNo');

  return (
    <React.Fragment>
      <FooterSection
        backBtn={true}
        nextBtn={false}
        btnFun={btnFun}
        cls="btn-left-align"
      />
      {blanket && (
        <div onClick={closeBlanketHandeler} className="blanket-cover"></div>
      )}
      <Section heading={`${holderType} Basic Details`}>
        <GridCustom>
          <Row>
            <Col xs={12} md={4}>
              <InputTextHook
                type="text"
                register={register}
                name="name"
                label="Name"
                reqText="name required"
                disabled={false}
                errorBorder={errors?.name?.message}
                mandatory="*"
                // value={form?.name || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>{errors?.name?.message}</small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                type="date"
                register={register}
                name="dateOfBirth"
                label="Date of Birth"
                reqText="date required"
                disabled={false}
                errorBorder={errors?.dateOfBirth?.message}
                mandatory="*"
                // value={form?.dateOfBirth || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors?.dateOfBirth?.message}
              </small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                type="password"
                register={register}
                name="panPekrnNo"
                label="PAN / PEKRN"
                placeholder="PAN/PEKRN no."
                reqText="PAN/PEKRN required"
                disabled={false}
                errorBorder={errors?.panPekrnNo?.message}
                mandatory="*"
                // value={form?.panPekrnNo.toUpperCase() || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors?.panPekrnNo?.message}
              </small>
            </Col>
            <Col xs={12} md={{ span: 4, offset: 8 }}>
              <InputTextHook
                register={register}
                name="confirmpanPekrnNo"
                label="Re-Enter PAN / PEKRN"
                placeholder="PAN/PEKRN no."
                reqText="please re-enter PAN/PEKRN"
                disabled={false}
                errorBorder={errors?.confirmpanPekrnNo?.message}
                mandatory="*"
                // value={form?.confirmpanPekrnNo.toUpperCase() || ''}
                changeFun={formHandeler}
                compair={panPekrnNo}
              />
              <small style={errorFontStyle}>
                {errors?.confirmpanPekrnNo?.message}
              </small>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={4} style={{ display: 'flex' }}>
              <Form.Group className="mb-4">
                <Form.Label>
                  Mobile (ISD-Mobile)<span className="red">*</span>
                </Form.Label>
                <InputGroup>
                  <MobileOptionHook
                    register={register}
                    name="mobileIsdCode"
                    maxLength={2}
                    errorBorder={errors?.mobileIsdCode?.message}
                    value={form?.contactDetail?.primaryMobileNo || ''}
                    changeFun={formHandeler}
                    reqText="ISD code required"
                    pattern={true}
                    condition={{
                      value: /^\d{2}?$/gm,
                      message: '2 digit number required',
                    }}
                    boxWidth={'20%'}
                  />
                  <MobileOptionHook
                    register={register}
                    name="primaryMobileNo"
                    maxLength={10}
                    errorBorder={errors?.primaryMobileNo?.message}
                    value={form?.contactDetail?.primaryMobileNo || ''}
                    changeFun={formHandeler}
                    reqText="mobile no. required"
                    pattern={true}
                    condition={{
                      value: /[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}/g,
                      message: '10 digit number required',
                    }}
                    boxWidth={'80%'}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                register={register}
                name="primaryEmail"
                label="Email"
                reqText="email required"
                disabled={false}
                errorBorder={errors?.primaryEmail?.message}
                mandatory="*"
                pattern={true}
                condition={{
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: 'email is invalid',
                }}
                // value={form?.contactDetail.primaryEmail || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors?.primaryEmail?.message}
              </small>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}></Col>
          </Row>
        </GridCustom>
      </Section>
      {/* ===========================Primary Holder Additional KYC Details=========================== */}
      <Section heading={`${holderType} Additional KYC Details`}>
        <GridCustom>
          <Row className="justify-content-md-center">
            <Col xs={12} md={2} className="m-4">
              <Form.Check
                type="radio"
                label="Gross Annual Income"
                name="income"
                data-name="GAI"
                onChange={incomeStatus}
                mandatory="*"
                checked={
                  (form?.otherDetail?.grossIncome || grossIncomeRadio) &&
                  'checked'
                }
              />
            </Col>
            <Col xs={12} md={2} className="m-4">
              <Form.Check
                type="radio"
                label="Networth"
                name="income"
                data-name="NW"
                onChange={incomeStatus}
                mandatory="*"
                checked={
                  (form?.otherDetail?.netWorth || networthRadio) && 'checked'
                }
              />
            </Col>
          </Row>
          <Row
            style={{
              display:
                form?.otherDetail?.grossIncome || grossIncomeRadio
                  ? 'flex'
                  : 'none',
            }}
          >
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                name="grossIncome"
                label="Gross Annual Income "
                reqText="please select Gross Annual Income"
                disabled={false}
                sts={!grossIncomeRadio}
                mandatory="*"
                errorBorder={
                  !form?.otherDetail?.grossIncome &&
                  errors?.grossIncome?.message
                }
                listOptions={grossAnnualIncomeOptions}
                value={form?.otherDetail?.grossIncome || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {!form?.otherDetail?.grossIncome &&
                  errors?.grossIncome?.message}
              </small>
            </Col>
          </Row>
          <Row
            style={{
              display:
                form?.otherDetail?.netWorth || networthRadio ? 'flex' : 'none',
            }}
          >
            <Col xs={12} md={4}>
              <InputTextHook
                register={register}
                name="netWorth"
                label="Networth (in Rs.)"
                reqText="please enter Networth (in Rs.)"
                disabled={false}
                sts={!networthRadio}
                depend="netWorth"
                errorBorder={errors?.netWorth?.message}
                mandatory="*"
                // value={form?.otherDetail?.netWorth || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>{errors?.netWorth?.message}</small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                type="date"
                register={register}
                name="netWorthDate"
                label="As on date"
                reqText="pleas select date"
                disabled={false}
                sts={!networthRadio}
                depend="netWorthDate"
                errorBorder={errors?.netWorthDate?.message}
                mandatory="*"
                // value={form?.otherDetail?.netWorthDate || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors?.netWorthDate?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                name="sourceOfWealth"
                label="Source of Wealth"
                reqText="please select source of wealth"
                disabled={false}
                mandatory="*"
                errorBorder={
                  !form?.otherDetail?.sourceOfWealth &&
                  errors?.sourceOfWealth?.message
                }
                listOptions={sourceOfWealthOptions}
                // value={form?.otherDetail?.sourceOfWealth || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {!form?.otherDetail?.sourceOfWealth &&
                  errors?.sourceOfWealth?.message}
              </small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                register={register}
                name="sourceOfWealthOthers"
                label="Other"
                reqText="please enter other source of welth"
                disabled={false}
                depend="sourceOfWealth"
                sts={!form?.otherDetail?.sourceOfWealth.length > 0}
                errorBorder={errors?.sourceOfWealthOthers?.message}
                mandatory="*"
                // value={form?.otherDetail?.sourceOfWealthOthers || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors?.sourceOfWealthOthers?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                name="occupation"
                label="Occupation"
                reqText="please select occupation"
                disabled={false}
                mandatory="*"
                errorBorder={
                  !form?.otherDetail?.occupation && errors?.occupation?.message
                }
                listOptions={occupationOptions}
                // value={form?.otherDetail?.occupation || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {!form?.otherDetail?.occupation && errors?.occupation?.message}
              </small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                register={register}
                name="occupationOthers"
                label="Other"
                reqText="please enter other ocupation"
                disabled={false}
                sts={!form?.otherDetail?.occupation.length > 0}
                depend="occupation"
                errorBorder={errors?.occupationOthers?.message}
                mandatory="*"
                // value={form?.otherDetail?.occupationOthers || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors?.occupationOthers?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                name="pep"
                label="Political Exposure"
                reqText="please select Political Exposure"
                disabled={false}
                mandatory="*"
                errorBorder={!form?.otherDetail?.pep && errors?.pep?.message}
                listOptions={politicalExposureOptions}
                // value={form?.otherDetail?.pep || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {!form?.otherDetail?.pep && errors?.pep?.message}
              </small>
            </Col>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                name="kraAddressType"
                label="KRA Address Type"
                reqText="please select KRA Address Type"
                disabled={false}
                mandatory="*"
                errorBorder={
                  !form?.otherDetail?.kraAddressType &&
                  errors?.kraAddressType?.message
                }
                listOptions={addressTypeOptions}
                // value={form?.otherDetail?.kraAddressType || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {!form?.otherDetail?.kraAddressType &&
                  errors?.kraAddressType?.message}
              </small>
            </Col>
          </Row>
        </GridCustom>
      </Section>
      {/* ===========================Primary Holder FATCA Details=========================== */}
      <Section heading={`${holderType} FATCA Details`}>
        <GridCustom>
          <Row>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                name="taxResidencyFlag"
                label="Tax Residency in a country other than India? "
                reqText="Tax Residency in a country required"
                disabled={false}
                mandatory="*"
                errorBorder={errors?.taxResidencyFlag?.message}
                listOptions={taxResidencyOptions}
                value={form?.fatcaDetail?.taxResidencyFlag || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors?.taxResidencyFlag?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3}>
              <InputTextHook
                register={register}
                name="birthCity"
                label="Place of Birth"
                reqText="please enter Place of Birth"
                disabled={false}
                errorBorder={errors?.birthCity?.message}
                mandatory="*"
                // value={form?.fatcaDetail?.birthCity || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>{errors?.birthCity?.message}</small>
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                name="birthCountry"
                label="Country of Birth"
                reqText="country of Birth required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.birthCountry &&
                  errors?.birthCountry?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.birthCountry || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                changeFun={formHandeler}
                setValue={setValue}
                sts={form?.fatcaDetail?.taxResidencyFlag === 'N'}
                depend="birthCountry"
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.birthCountry &&
                  errors?.birthCountry?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                name="citizenshipCountry"
                label="Country of Citizenship"
                reqText="country of citizenship required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.citizenshipCountry &&
                  errors?.citizenshipCountry?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.citizenshipCountry || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                changeFun={formHandeler}
                setValue={setValue}
                sts={form?.fatcaDetail?.taxResidencyFlag === 'N'}
                depend="citizenshipCountry"
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.citizenshipCountry &&
                  errors?.citizenshipCountry?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                name="nationalityCountry"
                label="Country of Nationality"
                reqText="country of nationality required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.nationalityCountry &&
                  errors?.nationalityCountry?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.nationalityCountry || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                changeFun={formHandeler}
                setValue={setValue}
                sts={form?.fatcaDetail?.taxResidencyFlag === 'N'}
                depend="citizenshipCountry"
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.nationalityCountry &&
                  errors?.nationalityCountry?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                name="taxCountry"
                label="Countries of Tax Residency"
                reqText="Countries of Tax Residency required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.taxRecords[0]?.taxCountry &&
                  errors?.taxCountry?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.taxRecords[0]?.taxCountry || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                changeFun={formHandeler}
                setValue={setValue}
                sts={form?.fatcaDetail?.taxResidencyFlag === 'N'}
                depend="taxCountry"
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.taxRecords[0]?.taxCountry &&
                  errors?.taxCountry?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <InputTextHook
                register={register}
                name="taxReferenceNo"
                label="Tax Identification Numbers"
                reqText="please enter Tax Identification Numbers"
                disabled={false}
                errorBorder={errors?.taxReferenceNo?.message}
                mandatory="*"
                // value={form?.fatcaDetail?.taxRecords[0]?.taxReferenceNo || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors?.taxReferenceNo?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                name="identityType"
                label="Tax Identification Types"
                reqText="Tax Identification Types required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.taxRecords[0]?.identityType &&
                  errors?.identityType?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.taxRecords[0]?.identityType || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                changeFun={formHandeler}
                setValue={setValue}
                sts={form?.fatcaDetail?.taxResidencyFlag === 'N'}
                depend="identityType"
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.taxRecords[0]?.identityType &&
                  errors?.identityType?.message}
              </small>
            </Col>
          </Row>
        </GridCustom>
      </Section>
      <br></br>
      <FooterSection
        backBtn={true}
        nextBtn={true}
        btnFun={btnFun}
        cls="btn-right-align"
      />
    </React.Fragment>
  );
}

export default StakeHolder;
