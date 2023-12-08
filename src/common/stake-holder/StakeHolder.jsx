import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector, useDispatch } from 'react-redux';
//components
import InputTextHook from '../form-elements/InputTextHook';
import SelectOptionHook from '../form-elements/SelectOptionHook';
import MobileOptionHook from '../form-elements/MobileOptionHook';
import SelectSearchHook from '../form-elements/SelectSearchHook';
import SelectSearchOption from '../form-elements/SelectSearchOption';
import Section from '../section/Section';
import InputText from '../form-elements/InputText';
import GridCustom from '../grid-custom/GridCustom';

import FooterSection from '../footerSection/FooterSection';
import { btnHandeler } from '../helper/Helper';
import { pageCount } from '../../reducer/Reducer/tab/tabSlice';

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
  getValues,
  errorsOld,
  setErrors,
  networthRadio,
  setNetworthRadio,
  grossIncomeRadio,
  setGrossIncomeRadio,
  fieldName,
  sliceData,
}) {
  const [btnFun, setBtnFun] = useState({});
  const [isOtherSourceOfWealth, setIsOtherSourceOfWealth] = useState(true);
  const [isOtherOccupation, setIsOtherOccupation] = useState(true);
  const [notIndian, setNotIndian] = useState(true);
  const { stepsCount } = useSelector((state) => state.tab);
  // const { userId } = useSelector((state) => state.account);
    const { user, IslogedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  const formHandeler = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    // setForm({ ...form, [name]: val });
    // console.log('ssss', watch(fieldName[16]) === '', name, fieldName[16], val);

    if (name === fieldName[10]) {
      if (val !== '') {
        setIsOtherSourceOfWealth(false);
      } else {
        setIsOtherSourceOfWealth(true);
        setValue(fieldName[11], '');
      }
    }

    if (name === fieldName[12]) {
      if (val !== '') {
        setIsOtherOccupation(false);
      } else {
        setIsOtherOccupation(true);
        setValue(fieldName[13], '');
      }
    }

    if (name === fieldName[16]) {
      if (val === 'Y') {
        setNotIndian(false);
      } else {
        setNotIndian(true);
      }
    }

    // console.log('kkkk');
    //  console.log(getValues(fieldName[16]));
    // errors[name].message = '';
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

  const panPekrnNo = watch(fieldName[2]);

  useEffect(() => {
    if (user.id) {
      if (sliceData?.fatcaDetail?.taxResidencyFlag === 'Y') {
        setNotIndian(false);
      } else {
        setNotIndian(true);
      }

      if (Object.keys(sliceData)?.length > 0) {
        setIsOtherSourceOfWealth(false);
      } else {
        setIsOtherSourceOfWealth(true);
        setValue(fieldName[11], '');
      }

      if (Object.keys(sliceData).length > 0) {
        setIsOtherOccupation(false);
      } else {
        setIsOtherOccupation(true);
        setValue(fieldName[13], '');
      }
    }
  }, [user]);

  useEffect(() => {
   
    setValue('name', form?.name)
    for (let k in form) {
      setValue(k, form[k]);
    }
  }, [form]);

  

  return (
    <React.Fragment>
      <div>
        {blanket && (
          <div onClick={closeBlanketHandeler} className="blanket-cover"></div>
        )}
      </div>

      <Section heading={`${holderType} Basic Details`}>
        <GridCustom>
          <Row>
            <Col xs={12} md={4}>
              <InputTextHook
                type="text"
                register={register}
                name={fieldName[0]}
                label="Name"
                reqText="name required"
                disabled={false}
                errorBorder={errors[fieldName[0]]?.message}
                mandatory="*"
                // value={form?.name || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[0]]?.message}
              </small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                type="date"
                register={register}
                name={fieldName[1]}
                label="Date of Birth"
                reqText="date required"
                disabled={false}
                errorBorder={errors[fieldName[1]]?.message}
                mandatory="*"
                // value={form?.dateOfBirth || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[1]]?.message}
              </small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                type="password"
                register={register}
                // name="panPekrnNo"
                name={fieldName[2]}
                label="PAN / PEKRN"
                placeholder="PAN/PEKRN no."
                reqText="PAN/PEKRN required"
                disabled={false}
                errorBorder={errors[fieldName[2]]?.message}
                mandatory="*"
                // value={form?.panPekrnNo.toUpperCase() || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[2]]?.message}
              </small>
            </Col>
            <Col xs={12} md={{ span: 4, offset: 8 }}>
              <InputTextHook
                register={register}
                // name="confirmpanPekrnNo"
                name={fieldName[3]}
                label="Re-Enter PAN / PEKRN"
                placeholder="PAN/PEKRN no."
                reqText="please re-enter PAN/PEKRN"
                disabled={false}
                errorBorder={errors[fieldName[3]]?.message}
                mandatory="*"
                // value={form?.confirmpanPekrnNo.toUpperCase() || ''}
                changeFun={formHandeler}
                compair={panPekrnNo}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[3]]?.message}
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
                    // name="mobileIsdCode"
                    name={fieldName[4]}
                    maxLength={2}
                    errorBorder={errors[fieldName[4]]?.message}
                    // value={form?.mobileIsdCode || ''}
                    // changeFun={formHandeler}
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
                    // name="primaryMobileNo"
                    name={fieldName[5]}
                    maxLength={10}
                    errorBorder={errors[fieldName[5]]?.message}
                    // value={form?.primaryMobileNo || ''}
                    // changeFun={formHandeler}
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
                // name="primaryEmail"
                name={fieldName[6]}
                label="Email"
                reqText="email required"
                disabled={false}
                errorBorder={errors[fieldName[6]]?.message}
                mandatory="*"
                pattern={true}
                condition={{
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: 'email is invalid',
                }}
                // value={form?.contactDetail.primaryEmail || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[6]]?.message}
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
                // name="grossIncome"
                name={fieldName[7]}
                label="Gross Annual Income "
                reqText="please select Gross Annual Income"
                disabled={false}
                sts={!grossIncomeRadio}
                mandatory="*"
                errorBorder={
                  !form?.otherDetail?.grossIncome &&
                  errors[fieldName[7]]?.message
                }
                listOptions={grossAnnualIncomeOptions}
                value={form?.otherDetail?.grossIncome || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {!form?.otherDetail?.grossIncome &&
                  errors[fieldName[7]]?.message}
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
                // name="netWorth"
                name={fieldName[8]}
                label="Networth (in Rs.)"
                reqText="please enter Networth (in Rs.)"
                disabled={false}
                sts={!networthRadio}
                depend="netWorth"
                errorBorder={errors[fieldName[8]]?.message}
                mandatory="*"
                // value={form?.otherDetail?.netWorth || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[8]]?.message}
              </small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                type="date"
                register={register}
                // name="netWorthDate"
                name={fieldName[9]}
                label="As on date"
                reqText="pleas select date"
                disabled={false}
                sts={!networthRadio}
                depend="netWorthDate"
                errorBorder={errors[fieldName[9]]?.message}
                mandatory="*"
                // value={form?.otherDetail?.netWorthDate || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[9]]?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                // name="sourceOfWealth"
                name={fieldName[10]}
                label="Source of Wealth"
                reqText="please select source of wealth"
                disabled={false}
                mandatory="*"
                errorBorder={
                  // !form?.otherDetail?.sourceOfWealth &&
                  errors[fieldName[10]]?.message
                }
                listOptions={sourceOfWealthOptions}
                // value={form?.otherDetail?.sourceOfWealth || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {
                  // !form?.otherDetail?.sourceOfWealth &&
                  errors[fieldName[10]]?.message
                }
              </small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                register={register}
                // name="sourceOfWealthOthers"
                name={fieldName[11]}
                label="Other"
                reqText="please enter other source of welth"
                disabled={false}
                depend={fieldName[11]}
                sts={isOtherSourceOfWealth}
                errorBorder={errors[fieldName[11]]?.message}
                mandatory="*"
                // value={form?.otherDetail?.sourceOfWealthOthers || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[11]]?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                // name="occupation"
                name={fieldName[12]}
                label="Occupation"
                reqText="please select occupation"
                disabled={false}
                mandatory="*"
                errorBorder={
                  // !form?.otherDetail?.occupation &&
                  errors[fieldName[12]]?.message
                }
                listOptions={occupationOptions}
                // value={form?.otherDetail?.occupation || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {
                  // !form?.otherDetail?.occupation &&
                  errors[fieldName[12]]?.message
                }
              </small>
            </Col>
            <Col xs={12} md={4}>
              <InputTextHook
                register={register}
                // name="occupationOthers"
                name={fieldName[13]}
                label="Other"
                reqText="please enter other ocupation"
                disabled={false}
                sts={isOtherOccupation}
                depend={fieldName[12]}
                errorBorder={errors[fieldName[13]]?.message}
                mandatory="*"
                // value={form?.otherDetail?.occupationOthers || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[13]]?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                // name="pep"
                name={fieldName[14]}
                label="Political Exposure"
                reqText="please select Political Exposure"
                disabled={false}
                mandatory="*"
                errorBorder={
                  !form?.otherDetail?.pep && errors[fieldName[14]]?.message
                }
                listOptions={politicalExposureOptions}
                // value={form?.otherDetail?.pep || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {!form?.otherDetail?.pep && errors[fieldName[14]]?.message}
              </small>
            </Col>
            <Col xs={12} md={4}>
              <SelectOptionHook
                register={register}
                // name="kraAddressType"
                name={fieldName[15]}
                label="KRA Address Type"
                reqText="please select KRA Address Type"
                disabled={false}
                mandatory="*"
                errorBorder={
                  !form?.otherDetail?.kraAddressType &&
                  errors[fieldName[15]]?.message
                }
                listOptions={addressTypeOptions}
                // value={form?.otherDetail?.kraAddressType || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {!form?.otherDetail?.kraAddressType &&
                  errors[fieldName[15]]?.message}
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
                // name="taxResidencyFlag"
                name={fieldName[16]}
                label="Tax Residency in a country other than India? "
                reqText="Tax Residency in a country required"
                disabled={false}
                mandatory="*"
                errorBorder={errors[fieldName[16]]?.message}
                listOptions={taxResidencyOptions}
                // value={form?.fatcaDetail?.taxResidencyFlag || ''}
                changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[16]]?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3}>
              <InputTextHook
                register={register}
                // name="birthCity"
                name={fieldName[17]}
                label="Place of Birth"
                reqText="please enter Place of Birth"
                disabled={false}
                errorBorder={errors[fieldName[17]]?.message}
                mandatory="*"
                // value={form?.fatcaDetail?.birthCity || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[17]]?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                // name="birthCountry"
                name={fieldName[18]}
                label="Country of Birth"
                reqText="country of Birth required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.birthCountry &&
                  errors[fieldName[18]]?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.birthCountry || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                // changeFun={formHandeler}
                setValue={setValue}
                sts={notIndian}
                depend={fieldName[18]}
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.birthCountry &&
                  errors[fieldName[18]]?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                // name="citizenshipCountry"
                name={fieldName[19]}
                label="Country of Citizenship"
                reqText="country of citizenship required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.citizenshipCountry &&
                  errors[fieldName[19]]?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.citizenshipCountry || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                // changeFun={formHandeler}
                setValue={setValue}
                sts={notIndian}
                depend={fieldName[19]}
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.citizenshipCountry &&
                  errors[fieldName[19]]?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                // name="nationalityCountry"
                name={fieldName[20]}
                label="Country of Nationality"
                reqText="country of nationality required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.nationalityCountry &&
                  errors[fieldName[20]]?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.nationalityCountry || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                // changeFun={formHandeler}
                setValue={setValue}
                sts={notIndian}
                depend={fieldName[20]}
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.nationalityCountry &&
                  errors[fieldName[20]]?.message}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                // name="taxCountry"
                name={fieldName[21]}
                label="Countries of Tax Residency"
                reqText="Countries of Tax Residency required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.taxRecords[0]?.taxCountry &&
                  errors[fieldName[21]]?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.taxRecords[0]?.taxCountry || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                // changeFun={formHandeler}
                setValue={setValue}
                sts={notIndian}
                depend={fieldName[21]}
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.taxRecords[0]?.taxCountry &&
                  errors[fieldName[21]]?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <InputTextHook
                register={register}
                // name="taxReferenceNo"
                name={fieldName[22]}
                label="Tax Identification Numbers"
                reqText="please enter Tax Identification Numbers"
                disabled={false}
                errorBorder={errors[fieldName[22]]?.message}
                mandatory="*"
                // value={form?.fatcaDetail?.taxRecords[0]?.taxReferenceNo || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>
                {errors[fieldName[22]]?.message}
              </small>
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchHook
                register={register}
                // name="identityType"
                name={fieldName[23]}
                label="Tax Identification Types"
                reqText="Tax Identification Types required"
                mandatory="*"
                errorBorder={
                  !form?.fatcaDetail?.taxRecords[0]?.identityType &&
                  errors[fieldName[23]]?.message
                }
                options={countryListOptions}
                value={form?.fatcaDetail?.taxRecords[0]?.identityType || ''}
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                // changeFun={formHandeler}
                setValue={setValue}
                sts={notIndian}
                depend="identityType"
              />
              <small style={errorFontStyle}>
                {!form?.fatcaDetail?.taxRecords[0]?.identityType &&
                  errors[fieldName[23]]?.message}
              </small>
            </Col>
          </Row>
        </GridCustom>
      </Section>
      <br></br>
      {/* <FooterSection
        backBtn={true}
        nextBtn={true}
        btnFun={btnFun}
        cls="btn-right-align"
      /> */}
    </React.Fragment>
  );
}

export default StakeHolder;
