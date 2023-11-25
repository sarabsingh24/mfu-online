import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { useFormContext } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
//components
import StakeHolder from '../../common/stake-holder/StakeHolder';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';
import useCommonReducer from '../../common/customComp/useCommonReducer';
import { commonFormField } from '../../common/stake-holder/stakeHolderData';
import { primeHolderForm } from '../../reducer/Reducer/account/accountSlice';

const fieldName = [
  'primary-name',
  'primary-dateOfBirth',
  'primary-panPekrnNo',
  'primary-confirmpanPekrnNo',
  'primary-mobileIsdCode',
  'primary-primaryMobileNo',
  'primary-primaryEmail',
  'primary-grossIncome',
  'primary-netWorth',
  'primary-netWorthDate',
  'primary-sourceOfWealth',
  'primary-sourceOfWealthOthers',
  'primary-occupation',
  'primary-occupationOthers',
  'primary-pep',
  'primary-kraAddressType',
  'primary-taxResidencyFlag',
  'primary-birthCity',
  'primary-birthCountry',
  'primary-citizenshipCountry',
  'primary-nationalityCountry',
  'primary-taxCountry',
  'primary-taxReferenceNo',
  'primary-identityType',
];

function PrimaryHolder({ methods }) {
  const [form, setForm] = useState();
  const [errorsOld, setErrors] = useState({});
  const [IsmisMatched, setISMisMatched] = useState(false);

  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const [networthRadio, setNetworthRadio] = useState(false);

  const { stepsCount, primeHolderObj, dispatch } = useCommonReducer();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  useFormPersist('form-name-primary', { watch, setValue });

  useEffect(() => {
    if (Object.keys(primeHolderObj).length) {
      setForm(primeHolderObj);
    } else {
      setForm(commonFormField);
    }
  }, [primeHolderObj]);

  const formSubmitHandeler = (data) => {
    // Object.keys(data).map((item) => item.split('-')[1]).filter(label => label !== undefined)
    console.log('priamry', data);
    const obj = {};

    for (let k in data) {
      if (k.includes('primary')) {
        let lab = k.split('-')[1];
        obj[lab] = data[k];
        console.log(k, '====', data[k]);
      }
    }

    dispatch(
      primeHolderForm({
        // ...primeHolderObj,
        holderType: 'PR',
        panExemptFlag: 'Y',
        residencePhoneNo: '',
        relationship: '01',
        relationshipProof: '01',
        panPekrnNo: obj.panPekrnNo,
        confirmpanPekrnNo: obj.confirmpanPekrnNo,
        name: obj.name,
        dateOfBirth: obj.dateOfBirth,
        contactDetail: {
          primaryEmail: obj.primaryEmail,
          mobileIsdCode: obj.mobileIsdCode,
          primaryMobileNo: obj.primaryMobileNo,
        },
        otherDetail: {
          otherInfo: 'string',
          grossIncome: obj.grossIncome ? obj.grossIncome : '',
          netWorth: obj.netWorth ? obj.netWorth : '',
          netWorthDate: obj.netWorthDate ? obj.netWorthDate : '',
          sourceOfWealth: obj.sourceOfWealth,
          sourceOfWealthOthers: obj.sourceOfWealthOthers,
          occupation: obj.occupation,
          occupationOthers: obj.occupationOthers,
          kraAddressType: obj.kraAddressType,
          pep: obj.pep,
        },
        fatcaDetail: {
          taxResidencyFlag: obj.taxResidencyFlag,
          birthCity: obj.birthCity,
          birthCountry: obj.birthCountry,
          citizenshipCountry: obj.citizenshipCountry,
          nationalityCountry: obj.nationalityCountry,
          taxReferenceNo: obj.taxReferenceNo,
          taxRecords: [
            {
              taxCountry: obj.taxCountry,
              taxReferenceNo: obj.taxReferenceNo,
              identityType: obj.identityType,
            },
          ],
        },
      })
    );
    dispatch(pageCount(stepsCount + 1));

    // delete primeHolderObj.confirmpanPekrnNo;
  };

  const backBtnHandeler = () => {
    dispatch(pageCount(stepsCount - 1));
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(formSubmitHandeler)} autoComplete="off">
        <StakeHolder
          form={form}
          fieldName={fieldName}
          sliceData={primeHolderObj}
          setForm={setForm}
          holderType={'Primary Holder'}
          errorsOld={errorsOld}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          setErrors={setErrors}
          networthRadio={networthRadio}
          setNetworthRadio={setNetworthRadio}
          grossIncomeRadio={grossIncomeRadio}
          setGrossIncomeRadio={setGrossIncomeRadio}
        />
        <button type="button" onClick={backBtnHandeler}>
          Back
        </button>
        <button type="submit">Next</button>
      </Form>
    </React.Fragment>
  );
}

export default PrimaryHolder;
