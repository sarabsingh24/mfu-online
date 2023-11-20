import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


//components
import InputTextHook from '../form-elements/InputTextHook'
import SelectOptionHook from '../form-elements/SelectOptionHook';
import Section from "../section/Section";
import InputText from "../form-elements/InputText";
import GridCustom from "../grid-custom/GridCustom";
import DatePicker from "../form-elements/DatePicker";
import SelectSearchOption from "../form-elements/SelectSearchOption";
import SelectOption from "../form-elements/SelectOption";
import FooterSection from "../footerSection/FooterSection";
import { btnHandeler } from "../helper/Helper";
import { pageCount } from "../../reducer/Reducer/tab/tabSlice";
import useCommonReducer from "../customComp/useCommonReducer";
import {
  sourceOfWealthOptions,
  occupationOptions,
  politicalExposureOptions,
  addressTypeOptions,
  taxResidencyOptions,
  countryListOptions,
  grossAnnualIncomeOptions,
} from "./stakeHolderData";

const errorFontStyle = {
  color:'red',
  fontSize:'12px',
  height:'12px',
  display:'block'
}


function StakeHolder({
  form,
  setForm,
  holderType,
  errors,
  register,
  errorsOld,
  setErrors,
  networthRadio,
  setNetworthRadio,
  grossIncomeRadio,
  setGrossIncomeRadio,
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
    if(blanket){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = "auto";
    }
  }, [blanket]);

  // on change handeler
  const formHandeler = (e) => {
    let name = e.target.name;
    let val = e.target.value;
   
    if (name === "panPekrnNo" || name === "confirmpanPekrnNo") {
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
      name === "primaryEmail"
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
    } else if (name === "mobileIsdCode") {
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
    } else if (name === "primaryMobileNo") {
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
    } else if (name === "grossIncome") {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: "string",
          [name]: val,
          netWorth: "",
          netWorthDate: "",
        },
      });
      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (name === "netWorth" || name === "netWorthDate") {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: "string",
          [name]: val,
          grossIncome: "",
        },
      });
      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (
      name === "sourceOfWealth" ||
      name === "sourceOfWealthOthers" ||
      name === "occupation" ||
      name === "occupationOthers" ||
      name === "kraAddressType" ||
      name === "pep"
    ) {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: "string",
          [name]: val,
        },
      });

      if (!!errorsOld[name]) {
        setErrors({ ...errorsOld, [name]: null });
      }
    } else if (
      name === "taxResidencyFlag" ||
      name === "birthCity"
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
      name === "taxReferenceNo"
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

    if (name === "sourceOfWealth" && val === "08") {
      setIsOtherSourceOfWealth(false);
    } else if (name === "sourceOfWealth" && val !== "08") {
      setIsOtherSourceOfWealth(true);
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          [name]: val,
        },
      });
    }

    if (name === "occupation" && val === "99") {
      setIsOtherOccupation(false);
    } else if (name === "occupation" && val !== "99") {
      setIsOtherOccupation(true);
      setForm({
        ...form,
        otherDetail: { ...form.otherDetail, [name]: val, occupationOthers: "" },
      });
    }
  };

  // radio btn show hide
  const incomeStatus = (e) => {
    let status = e.target.dataset.name;
    if (status === "GAI") {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: "string",
          netWorth: "",
          netWorthDate: "",
        },
      });
      setGrossIncomeRadio(true);
      setNetworthRadio(false);
    } else {
      setForm({
        ...form,
        otherDetail: {
          ...form.otherDetail,
          otherInfo: "string",
          grossIncome: "",
        },
      });
      setGrossIncomeRadio(false);
      setNetworthRadio(true);
    }
  };

  useEffect(() => {
    setBtnFun(btnHandeler(dispatch, pageCount, stepsCount));
  }, [dispatch, stepsCount]);

  useEffect(() => {
    if (form?.fatcaDetail?.birthCountry) {
      if (!!errorsOld["birthCountry"]) {
        setErrors({ ...errorsOld, birthCountry: null });
      }
    }
    if (form?.fatcaDetail?.citizenshipCountry) {
      if (!!errorsOld["citizenshipCountry"]) {
        setErrors({ ...errorsOld, citizenshipCountry: null });
      }
    }
    if (form?.fatcaDetail?.nationalityCountry) {
      if (!!errorsOld["nationalityCountry"]) {
        setErrors({ ...errorsOld, nationalityCountry: null });
      }
    }
      if (form?.fatcaDetail?.taxRecords[0]?.taxCountry) {
        if (!!errorsOld["taxCountry"]) {
          setErrors({ ...errorsOld, taxCountry: null });
        }
      }
     
      if (form?.fatcaDetail?.taxRecords[0]?.identityType) {
        if (!!errorsOld["identityType"]) {
          setErrors({ ...errorsOld, identityType: null });
        }
      }
  }, [
    errorsOld,
    form?.fatcaDetail?.birthCountry,
    form?.fatcaDetail?.citizenshipCountry,
    form?.fatcaDetail?.nationalityCountry,
    form?.fatcaDetail?.taxRecords[0]?.identityType,
    form?.fatcaDetail?.taxRecords[0]?.taxCountry,
    setErrors,
  ]);


  useEffect(() => {
    if (form?.fatcaDetail?.taxResidencyFlag === "N") {
      setForm({
        ...form,
        fatcaDetail: {
          ...form?.fatcaDetail,
          birthCountry: "India",
          citizenshipCountry: "India",
          nationalityCountry: "India",
        },
      });
    } else {
      setForm({
        ...form,
        fatcaDetail: {
          ...form?.fatcaDetail,
          birthCountry: "",
          citizenshipCountry: "",
          nationalityCountry: "",
        },
      });
    }
  }, [form?.fatcaDetail?.taxResidencyFlag]);

  console.log('test', errors?.first_name?.message);

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
                name="first_name"
                reqText="first name required"
                disabled={false}
                errorBorder={errors?.first_name?.message}
              />
              <small style={errorFontStyle}>
                {errors?.first_name?.message}
              </small>
              <SelectOptionHook
                register={register}
                name="sourceOfWealth"
                reqText="country required"
                disabled={false}
                errorBorder={errors?.sourceOfWealth?.message}
                listOptions={sourceOfWealthOptions}
              />
              <small style={errorFontStyle}>
                {errors?.sourceOfWealth?.message}
              </small>
              {/* name="sourceOfWealth" label="Source of Wealth" value=
              {form?.otherDetail?.sourceOfWealth || ''}
              options={sourceOfWealthOptions}
              changeFun={formHandeler} */}
              <InputText
                name="name"
                label="Name"
                mandatory="*"
                value={form?.name || ''}
                changeFun={formHandeler}
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={4}>
              <DatePicker
                name="dateOfBirth"
                label="Date of Birth"
                value={form?.dateOfBirth}
                mandatory="*"
                changeFun={formHandeler}
                errors={errorsOld}
                dob={true}
              />
            </Col>
            <Col xs={12} md={4}>
              <InputText
                name="panPekrnNo"
                label="PAN / PEKRN"
                type="password"
                value={form?.panPekrnNo.toUpperCase() || ''}
                mandatory="*"
                changeFun={formHandeler}
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={{ span: 4, offset: 8 }}>
              <InputText
                name="confirmpanPekrnNo"
                label="Re-Enter PAN / PEKRN"
                value={form?.confirmpanPekrnNo.toUpperCase() || ''}
                mandatory="*"
                changeFun={formHandeler}
                errors={errorsOld}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={4}>
              <Form.Group className="mb-4">
                <Form.Label>
                  Mobile (ISD-Mobile)<span className="red">*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    name="mobileIsdCode"
                    maxLength={2}
                    value={form?.contactDetail?.mobileIsdCode || ''}
                    onChange={formHandeler}
                    errors={errorsOld}
                    className={!!errorsOld?.mobileIsdCode && 'redBorder'}
                    isInvalid={!!errorsOld?.name}
                  />
                  <Form.Control
                    name="primaryMobileNo"
                    maxLength={10}
                    style={{ flex: '8', marginLeft: '1px' }}
                    value={form?.contactDetail?.primaryMobileNo || ''}
                    onChange={formHandeler}
                    errors={errorsOld}
                    className={!!errorsOld?.primaryMobileNo && 'redBorder'}
                    isInvalid={!!errorsOld?.name}
                  />
                </InputGroup>
                <div className="red">
                  {errorsOld?.mobileIsdCode && errorsOld?.primaryMobileNo
                    ? 'mobile info required'
                    : errorsOld?.mobileIsdCode
                    ? errorsOld?.mobileIsdCode
                    : errorsOld?.primaryMobileNo}
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <InputText
                name="primaryEmail"
                label="Email"
                value={form?.contactDetail?.primaryEmail || ''}
                mandatory="*"
                changeFun={formHandeler}
                errors={errorsOld}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}></Col>
          </Row>
        </GridCustom>
      </Section>

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
              <SelectOption
                name="grossIncome"
                label="Gross Annual Income"
                value={form?.otherDetail?.grossIncome || ''}
                options={grossAnnualIncomeOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
          </Row>
          <Row
            style={{
              display:
                form?.otherDetail?.netWorth || networthRadio ? 'flex' : 'none',
            }}
          >
            <Col xs={12} md={4}>
              <InputText
                name="netWorth"
                label="Networth (in Rs.)"
                value={form?.otherDetail?.netWorth || ''}
                mandatory="*"
                changeFun={formHandeler}
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={4}>
              <DatePicker
                name="netWorthDate"
                label="As on date"
                value={form?.otherDetail?.netWorthDate || ''}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOption
                name="sourceOfWealth"
                label="Source of Wealth"
                value={form?.otherDetail?.sourceOfWealth || ''}
                options={sourceOfWealthOptions}
                changeFun={formHandeler}
              />
            </Col>
            <Col xs={12} md={4}>
              <InputText
                name="sourceOfWealthOthers"
                label="Other"
                value={form?.otherDetail?.sourceOfWealthOthers || ''}
                disabled={isOtherSourceOfWealth}
                changeFun={formHandeler}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOption
                name="occupation"
                label="Occupation"
                value={form?.otherDetail?.occupation || ''}
                options={occupationOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={4}>
              <InputText
                name="occupationOthers"
                label="Other"
                value={form?.otherDetail?.occupationOthers || ''}
                disabled={isOtherOccupation}
                changeFun={formHandeler}
                errors={errorsOld}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <SelectOption
                name="pep"
                label="Political Exposure"
                value={form?.otherDetail?.pep || ''}
                options={politicalExposureOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={4}>
              <SelectOption
                name="kraAddressType"
                label="KRA Address Type"
                value={form?.otherDetail?.kraAddressType || ''}
                options={addressTypeOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
          </Row>
        </GridCustom>
      </Section>

      <Section heading={`${holderType} FATCA Details`}>
        <GridCustom>
          <Row>
            <Col xs={12} md={4}>
              <SelectOption
                name="taxResidencyFlag"
                label="Tax Residency in a country other than India? "
                value={form?.fatcaDetail?.taxResidencyFlag || ''}
                options={taxResidencyOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3}>
              <InputText
                name="birthCity"
                label="Place of Birth"
                value={form?.fatcaDetail?.birthCity || ''}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchOption
                name="birthCountry"
                label="Country of Birth "
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                value={form?.fatcaDetail?.birthCountry || ''}
                options={countryListOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchOption
                name="citizenshipCountry"
                label="Country of Citizenship "
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                value={form?.fatcaDetail?.citizenshipCountry || ''}
                options={countryListOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchOption
                name="nationalityCountry"
                label="Country of Nationality"
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                value={form?.fatcaDetail?.nationalityCountry || ''}
                options={countryListOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3}>
              <SelectSearchOption
                name="taxCountry"
                label="Countries of Tax Residency"
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                value={form?.fatcaDetail?.taxRecords[0]?.taxCountry || ''}
                options={countryListOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputText
                name="taxReferenceNo"
                label="Tax Identification Numbers"
                value={form?.fatcaDetail?.taxRecords[0]?.taxReferenceNo || ''}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
            </Col>
            <Col xs={12} md={3}>
              <SelectSearchOption
                name="identityType"
                label="Tax Identification Types"
                setBlanket={setBlanket}
                blanket={blanket}
                flag={form?.fatcaDetail?.taxResidencyFlag}
                form={form}
                setForm={setForm}
                value={form?.fatcaDetail?.taxRecords[0]?.identityType || ''}
                options={countryListOptions}
                changeFun={formHandeler}
                mandatory="*"
                errors={errorsOld}
              />
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
