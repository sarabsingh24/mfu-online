import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
//components
import Tabs from '../../common/tabs/Tabs';
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import StakeHolder from '../../common/stake-holder/StakeHolder';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';

import { commonFormField } from '../../common/stake-holder/stakeHolderData';
import { validateForm } from '../../common/stake-holder/StakeHolderValidation';
import {
  createSecondHolderAsync,
  updateSecondHolderAsync,
} from './SecondSlice';
import { secondaryFormFields } from './secondaryData';


const fieldName = Object.keys(secondaryFormFields);

function SecondHolder() {
  const [form, setForm] = useState(commonFormField);
  const [errorsOld, setErrors] = useState({});
  const [networthRadio, setNetworthRadio] = useState(false);
  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);

  const { secondHolderObj } = useSelector((state) => state.second);
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);
  // const { userId } = useSelector((state) => state.account);
    const { user, IslogedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  // useFormPersist('form-name-second', { watch, setValue });

  // useEffect(() => {
  //   if (Object.keys(secondHolderObj).length) {
  //     setForm(secondHolderObj);
  //   }
  // }, [secondHolderObj]);
  

  useEffect(() => {
    const newObj = {};

    if (secondHolderObj?.userId) {
      for (let fstLevel in secondHolderObj) {
        if (fstLevel === 'contactDetail') {
          for (let secLev in secondHolderObj[fstLevel]) {
            newObj[`secondary-${secLev}`] = secondHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'otherDetail') {
          for (let secLev in secondHolderObj[fstLevel]) {
            newObj[`secondary-${secLev}`] = secondHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'fatcaDetail') {
          for (let secLev in secondHolderObj[fstLevel]) {
            newObj[`secondary-${secLev}`] = secondHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'taxRecords') {
          for (let secLev in secondHolderObj[fstLevel]) {
            newObj[`secondary-${secLev}`] = secondHolderObj[fstLevel][secLev];
          }
        } else {
          newObj[`secondary-${fstLevel}`] = secondHolderObj[fstLevel];
        }
      }
      console.log(newObj);
      setForm(newObj);
    } else {
      setForm(secondaryFormFields);
    }
  }, [secondHolderObj]);

  const formSubmitHandeler = (data) => {
    console.log('secondary', data);

    const obj = {};

    for (let k in data) {
      if (k.includes('secondary')) {
        let lab = k.split('-')[1];
        obj[lab] = data[k];
        console.log(k, '====', data[k]);
      }
    }

    const submitObj = {
      userId: user.id,
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

    if (secondHolderObj?.userId) {
      console.log('update');

      dispatch(updateSecondHolderAsync({ ...submitObj, userId: user.id }));
    } else {
      console.log('create');
      dispatch(createSecondHolderAsync({ ...submitObj }));
    }
    dispatch(pageCount(stepsCount + 1));
  };

  const backBtnHandeler = () => {
    dispatch(pageCount(stepsCount - 1));
  };

  return (
    <React.Fragment>
      <Tabs />
    
      <Form onSubmit={handleSubmit(formSubmitHandeler)} autoComplete="off">
        <ButtonCustomNew backFun={backBtnHandeler} />
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

        <ButtonCustomNew backFun={backBtnHandeler} />
        <ButtonCustomNew text="next" />
      </Form>
    </React.Fragment>
  );
}

export default SecondHolder;
