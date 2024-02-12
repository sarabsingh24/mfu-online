import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdDelete } from 'react-icons/md';
import Button from 'react-bootstrap/Button';

//component
import SelectSearchHook from '../form-elements/SelectSearchHook';
import InputTextHook from '../form-elements/InputTextHook';

const NonIndianResidence = ({
  register,
  form,
  sts,
  setForm,
  setValue,
  blanket,
  setBlanket,
  options,
  errors,
  fildsObj,
  errorStyle,
  taxResidency,
  selectFieldName,
  rowIndex,
  removeRecordRow,
  setTextRecords,
  textRecords,
  watch,
  getValues,
}) => {
  useEffect(() => {
    setValue(`${rowIndex}-taxCountry`, fildsObj[`${rowIndex}-taxCountry`]);
    setValue(`${rowIndex}-taxReferenceNo`, fildsObj.taxReferenceNo);
    setValue(`${rowIndex}-identityType`, fildsObj[`${rowIndex}-identityType`]);
  }, [textRecords]);

  let labelName = `${rowIndex}-taxReferenceNo`;
  const refNumber = watch(labelName);

  useEffect(() => {
    const records = () => {
      let updateRecords = textRecords.map((items, ind) => {
        if (ind === rowIndex) {
          return {
            ...items,
            taxReferenceNo: getValues(`${rowIndex}-taxReferenceNo`),
          };
        }
        return items;
      });

      setTextRecords(updateRecords);
    };

    const timer = setTimeout(() => {
      records();
    }, 1500);

    return () => clearTimeout(timer);
  }, [refNumber]);

  return (
    <Row>
      <Col xs={12} md={3}>
        <SelectSearchHook
          register={register}
          name={`${rowIndex}-taxCountry`}
          rowIndex={rowIndex}
          // name={taxCountry}
          selectFieldName={selectFieldName}
          label="Countries of Tax Residency"
          reqText="Countries of Tax Residency required"
          mandatory="*"
          errorBorder={
            errors?.[`${rowIndex}-taxCountry`]?.message
            // errors['primary-taxRecords'][rowIndex].taxCountry?.message
          }
          options={options}
          value={fildsObj.taxCountry || ''}
          setBlanket={setBlanket}
          blanket={blanket}
          flag={form?.fatcaDetail?.taxResidencyFlag}
          form={form}
          setForm={setForm}
          setValue={setValue}
          sts={taxResidency === 'Y'}
          depend="taxCountry"
          setTextRecords={setTextRecords}
          textRecords={textRecords}
        />
        <small style={errorStyle}>
          {
            errors?.[`${rowIndex}-taxCountry`]?.message
            // errors['primary-taxRecords'][rowIndex]?.taxCountry?.message
          }
        </small>
      </Col>
      <Col xs={12} md={3}>
        <InputTextHook
          register={register}
          // name="taxReferenceNo"
          name={`${rowIndex}-taxReferenceNo`}
          label="Tax Identification Numbers"
          reqText="please enter Tax Identification Numbers"
          disabled={false}
          errorBorder={errors?.[`${rowIndex}-taxReferenceNo`]?.message}
          mandatory="*"
          sts={taxResidency === 'N'}
          depend={[1, 2, 3]}

          //   value={fildsObj.taxReferenceNo || ''}
          // changeFun={formHandeler}
        />
        <small style={errorStyle}>
          {errors?.[`${rowIndex}-taxReferenceNo`]?.message}
        </small>
      </Col>
      <Col xs={12} md={3}>
        <SelectSearchHook
          register={register}
          // name="identityType"
          name={`${rowIndex}-identityType`}
          rowIndex={rowIndex}
          selectFieldName={selectFieldName}
          label="Tax Identification Types"
          reqText="Tax Identification Types required"
          mandatory="*"
          errorBorder={errors?.[`${rowIndex}-identityType`]?.message}
          options={options}
          value={fildsObj.identityType || ''}
          setBlanket={setBlanket}
          blanket={blanket}
          flag={form?.fatcaDetail?.taxResidencyFlag}
          form={form}
          setForm={setForm}
          // changeFun={formHandeler}
          setValue={setValue}
          sts={taxResidency === 'Y'}
          depend="identityType"
          setTextRecords={setTextRecords}
          textRecords={textRecords}
        />
        <small style={errorStyle}>
          {errors?.[`${rowIndex}-identityType`]?.message}
        </small>
      </Col>

      <Col xs={12} md={3}>
        {textRecords.length > 1 && (
          <div
            style={{ marginTop: '35px' }}
            onClick={() => {
              removeRecordRow(rowIndex);
            }}
          >
            <Button size="sm" variant="outline-danger">
              Remove
            </Button>
          </div>
        )}
      </Col>

      {/* <Col xs={12} md={3}>
                <SelectSearchHook
                  register={register}
                  // name="taxCountry"
                  name={fieldName[21]}
                  selectFieldName={fieldName[21].split('-')[0]}
                  label="Countries of Tax Residency"
                  reqText="Countries of Tax Residency required"
                  mandatory="*"
                  errorBorder={
                    !form?.fatcaDetail?.taxRecords?.taxCountry &&
                    errors[fieldName[21]]?.message
                  }
                  options={countryListOptions}
                  // value={form?.fatcaDetail?.taxRecords[0]?.taxCountry || ''}
                  value={
                    form?.[fieldName[21].split('-')[0] + '-taxCountry'] || ''
                  }
                  setBlanket={setBlanket}
                  blanket={blanket}
                  flag={form?.fatcaDetail?.taxResidencyFlag}
                  form={form}
                  setForm={setForm}
                  // changeFun={formHandeler}
                  setValue={setValue}
                  sts={taxResidency === 'Y'}
                  depend={fieldName[21]}
                />
                <small style={errorFontStyle}>
                  {!form?.fatcaDetail?.taxRecords?.taxCountry &&
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
                  sts={taxResidency === 'N'}
                  depend={[1, 2, 3]}
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
                  selectFieldName={fieldName[23].split('-')[0]}
                  label="Tax Identification Types"
                  reqText="Tax Identification Types required"
                  mandatory="*"
                  errorBorder={
                    !form?.fatcaDetail?.taxRecords[0]?.identityType &&
                    errors[fieldName[23]]?.message
                  }
                  options={countryListOptions}
                  value={
                    form?.[fieldName[21].split('-')[0] + '-identityType'] || ''
                  }
                  setBlanket={setBlanket}
                  blanket={blanket}
                  flag={form?.fatcaDetail?.taxResidencyFlag}
                  form={form}
                  setForm={setForm}
                  // changeFun={formHandeler}
                  setValue={setValue}
                  sts={taxResidency === 'Y'}
                  depend="identityType"
                />
                <small style={errorFontStyle}>
                  {!form?.fatcaDetail?.taxRecords[0]?.identityType &&
                    errors[fieldName[23]]?.message}
                </small>
              </Col> */}
    </Row>
  );
};

export default NonIndianResidence;
