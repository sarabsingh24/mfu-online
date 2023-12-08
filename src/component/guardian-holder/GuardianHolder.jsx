import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

//components
import Tabs from '../../common/tabs/Tabs';
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import StakeHolder from '../../common/stake-holder/StakeHolder';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';
import useCommonReducer from '../../common/customComp/useCommonReducer';
import { commonFormField } from '../../common/stake-holder/stakeHolderData';
import { validateForm } from '../../common/stake-holder/StakeHolderValidation';
import { guardianHolderForm } from '../../reducer/Reducer/account/accountSlice';
import {
  createGuardianHolderAsync,
  updateGuardianHolderAsync,
} from '../guardian-holder/gurdianSlice';
import { gurdianFormFields } from './gurdianData';


const fieldName = Object.keys(gurdianFormFields);

function GuardianHolder() {
  const [form, setForm] = useState(commonFormField);
  const [errorsOLD, setErrors] = useState({});
  const [networthRadio, setNetworthRadio] = useState(false);
  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);

  const { guardianHolderObj } = useSelector((state) => state.guardian);
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

  

  useEffect(() => {
    const newObj = {};

    if (guardianHolderObj?.userId) {
      for (let fstLevel in guardianHolderObj) {
        if (fstLevel === 'contactDetail') {
          for (let secLev in guardianHolderObj[fstLevel]) {
            newObj[`gurdian-${secLev}`] = guardianHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'otherDetail') {
          for (let secLev in guardianHolderObj[fstLevel]) {
            newObj[`gurdian-${secLev}`] = guardianHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'fatcaDetail') {
          for (let secLev in guardianHolderObj[fstLevel]) {
            newObj[`gurdian-${secLev}`] = guardianHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'taxRecords') {
          for (let secLev in guardianHolderObj[fstLevel]) {
            newObj[`gurdian-${secLev}`] = guardianHolderObj[fstLevel][secLev];
          }
        } else {
          newObj[`gurdian-${fstLevel}`] = guardianHolderObj[fstLevel];
        }
      }
      // console.log(newObj);
      setForm(newObj);
    } else {
      setForm(gurdianFormFields);
    }
  }, [guardianHolderObj]);

  // useEffect(() => {
  //   if (Object.keys(guardianHolderObj).length) {
  //     setForm(guardianHolderObj);
  //   }
  // }, [guardianHolderObj]);

  const formSubmitHandeler = (data) => {
    const obj = {};

    for (let k in data) {
      if (k.includes('gurdian')) {
        let lab = k.split('-')[1];
        obj[lab] = data[k];
        console.log(k, '====', data[k]);
      }
    }

    const submitObj = {
      // ...guardianHolderObj,
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

    if (guardianHolderObj?.userId) {
      console.log('update');
      dispatch(updateGuardianHolderAsync({ ...submitObj, userId: user.id }));
    } else {
      console.log('create');
      dispatch(createGuardianHolderAsync({ ...submitObj }));
    }
    dispatch(pageCount(stepsCount + 1));
  };

   const backBtnHandeler = () => {
     console.log('kk');
     dispatch(pageCount(stepsCount - 1));
   };

   console.log(guardianHolderObj);

  return (
    <React.Fragment>
      <Tabs />
    
      <Form onSubmit={handleSubmit(formSubmitHandeler)} autoComplete="off">
        <ButtonCustomNew backFun={backBtnHandeler} />
        <StakeHolder
          form={form}
          fieldName={fieldName}
          sliceData={guardianHolderObj}
          setForm={setForm}
          holderType={'Guardian'}
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

export default GuardianHolder;
