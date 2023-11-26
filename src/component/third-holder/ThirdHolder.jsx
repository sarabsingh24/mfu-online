import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';

//components
import StakeHolder from "../../common/stake-holder/StakeHolder";
import { tabUpdate, pageCount } from "../../reducer/Reducer/tab/tabSlice";
import useCommonReducer from "../../common/customComp/useCommonReducer";
import { commonFormField } from "../../common/stake-holder/stakeHolderData";
import { validateForm } from "../../common/stake-holder/StakeHolderValidation";
import { thirdHolderCreateAsync } from './thirdSlice';



const fieldName = [
  'third-name',
  'third-dateOfBirth',
  'third-panPekrnNo',
  'third-confirmpanPekrnNo',
  'third-mobileIsdCode',
  'third-primaryMobileNo',
  'third-primaryEmail',
  'third-grossIncome',
  'third-netWorth',
  'third-netWorthDate',
  'third-sourceOfWealth',
  'third-sourceOfWealthOthers',
  'third-occupation',
  'third-occupationOthers',
  'third-pep',
  'third-kraAddressType',
  'third-taxResidencyFlag',
  'third-birthCity',
  'third-birthCountry',
  'third-citizenshipCountry',
  'third-nationalityCountry',
  'third-taxCountry',
  'third-taxReferenceNo',
  'third-identityType',
];



function ThirdHolder() {
  const [form, setForm] = useState(commonFormField);
  const [errorsOld, setErrors] = useState({});
  const [networthRadio, setNetworthRadio] = useState(false);
  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);

  const { stepsCount, thirdHolderObj, dispatch } = useCommonReducer();
const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useFormPersist('form-name-third', { watch, setValue });

  // useEffect(() => {
  //   if (Object.keys(thirdHolderObj).length) {
  //     setForm(thirdHolderObj);
  //   }
  // }, [thirdHolderObj]);

  const formSubmitHandeler = (data) => {
   console.log('third', data);
    const obj = {};

    for (let k in data) {
      if (k.includes('third')) {
        let lab = k.split('-')[1];
        obj[lab] = data[k];
        console.log(k, '====', data[k]);
      }
    }

   
      dispatch(
        thirdHolderCreateAsync({
          // ...thirdHolderObj,
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
          sliceData={thirdHolderObj}
          setForm={setForm}
          holderType={'Third Holder'}
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

export default ThirdHolder;
