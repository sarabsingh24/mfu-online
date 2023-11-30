import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { useFormContext } from 'react-hook-form';
//components
import StakeHolder from '../../common/stake-holder/StakeHolder';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';

import {
  createPrimaryHolderAsync,
  updatePrimaryHolderAsync,
} from './primarySlice';

import { useSelector, useDispatch } from 'react-redux';
import { primaryFormFields } from './primaryData';

const fieldName = Object.keys(primaryFormFields);

function PrimaryHolder({ methods }) {
  const [form, setForm] = useState();
  const [errorsOld, setErrors] = useState({});
  const [IsmisMatched, setISMisMatched] = useState(false);

  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const [networthRadio, setNetworthRadio] = useState(false);

  const { primeHolderObj, isSuccess } = useSelector((state) => state.primary);
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);
  const { userId } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  // useFormPersist('form-name-primary', { watch, setValue });

  useEffect(() => {
    const newObj = {};

    if (primeHolderObj?.userId) {
      for (let fstLevel in primeHolderObj) {
        if (fstLevel === 'contactDetail') {
          for (let secLev in primeHolderObj[fstLevel]) {
            newObj[`primary-${secLev}`] = primeHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'otherDetail') {
          for (let secLev in primeHolderObj[fstLevel]) {
            newObj[`primary-${secLev}`] = primeHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'fatcaDetail') {
          for (let secLev in primeHolderObj[fstLevel]) {
            newObj[`primary-${secLev}`] = primeHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'taxRecords') {
          for (let secLev in primeHolderObj[fstLevel]) {
            newObj[`primary-${secLev}`] = primeHolderObj[fstLevel][secLev];
          }
        } else {
          newObj[`primary-${fstLevel}`] = primeHolderObj[fstLevel];
        }
      }
      // console.log(newObj);
      setForm(newObj);
    } else {
      setForm(primaryFormFields);
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

    const submitObj = {
      // ...primeHolderObj,
      userId: userId,
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
    };

    if (primeHolderObj?.userId) {
      console.log('update');

      dispatch(updatePrimaryHolderAsync({ ...submitObj, userId: userId }));
    } else {
      console.log('create');
      dispatch(createPrimaryHolderAsync({ ...submitObj }));
    }

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
