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
import { secondHolderForm } from "../../reducer/Reducer/account/accountSlice";


const fieldName = [
  'secondary-name',
  'secondary-dateOfBirth',
  'secondary-panPekrnNo',
  'secondary-confirmpanPekrnNo',
  'secondary-mobileIsdCode',
  'secondary-primaryMobileNo',
  'secondary-primaryEmail',
  'secondary-grossIncome',
  'secondary-netWorth',
  'secondary-netWorthDate',
  'secondary-sourceOfWealth',
  'secondary-sourceOfWealthOthers',
  'secondary-occupation',
  'secondary-occupationOthers',
  'secondary-pep',
  'secondary-kraAddressType',
  'secondary-taxResidencyFlag',
  'secondary-birthCity',
  'secondary-birthCountry',
  'secondary-citizenshipCountry',
  'secondary-nationalityCountry',
  'secondary-taxCountry',
  'secondary-taxReferenceNo',
  'secondary-identityType',
];

function SecondHolder() {
  const [form, setForm] = useState(commonFormField);
  const [errorsOld, setErrors] = useState({});
  const [networthRadio, setNetworthRadio] = useState(false);
  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const { stepsCount, secondHolderObj, dispatch } = useCommonReducer();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  useFormPersist('form-name2', { watch, setValue });

  useEffect(() => {
    if (Object.keys(secondHolderObj).length) {
      setForm(secondHolderObj);
    }
  }, [secondHolderObj]);

  const formSubmitHandeler = (data) => {
    const obj = {};

    for (let k in data) {
      let lab = k.split('-')[1];
      obj[lab] = data[k];
    }
     dispatch(
       secondHolderForm({
         ...secondHolderObj,
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
         // ...data,
       })
     );
     dispatch(pageCount(stepsCount + 1));
    
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(formSubmitHandeler)} autoComplete="off">
        <StakeHolder
          form={form}
          fieldName={fieldName}
          sliceData={secondHolderObj}
          setForm={setForm}
          holderType={'Second Holder'}
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
      </Form>
    </React.Fragment>
  );
}

export default SecondHolder;
