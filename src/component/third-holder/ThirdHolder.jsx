import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

//components
import Tabs from '../../common/tabs/Tabs';
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import StakeHolder from '../../common/stake-holder/StakeHolder';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';

import { commonFormField } from '../../common/stake-holder/stakeHolderData';
import { validateForm } from '../../common/stake-holder/StakeHolderValidation';
import { createThirdHolderAsync, updateThirdHolderAsync } from './thirdSlice';
import { thirdFormFields } from './thirdData';

const fieldName = Object.keys(thirdFormFields);

function ThirdHolder() {
  const [form, setForm] = useState();
  const [errorsOld, setErrors] = useState({});

  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const [networthRadio, setNetworthRadio] = useState(false);
  const [IsPan, setIsPan] = useState(false);

  const { thirdHolderObj, isSuccess } = useSelector((state) => state.third);
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

  // useFormPersist('form-name-third', { watch, setValue });

  useEffect(() => {
    const newObj = {};
    console.log('zero');
    if (Object.keys(thirdHolderObj).length > 0) {
      setIsPan(
        thirdHolderObj.panExemptFlag !== ''
          ? thirdHolderObj.panExemptFlag !== 'N'
            ? true
            : false
          : true
      );
      for (let fstLevel in thirdHolderObj) {
        console.log('two');
        if (fstLevel === 'contactDetail') {
          for (let secLev in thirdHolderObj[fstLevel]) {
            newObj[`third-${secLev}`] = thirdHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'otherDetail') {
          for (let secLev in thirdHolderObj[fstLevel]) {
            newObj[`third-${secLev}`] = thirdHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'fatcaDetail') {
          for (let secLev in thirdHolderObj[fstLevel]) {
            newObj[`third-${secLev}`] = thirdHolderObj[fstLevel][secLev];
          }
        } else if (fstLevel === 'taxRecords') {
          for (let secLev in thirdHolderObj[fstLevel]) {
            newObj[`third-${secLev}`] = thirdHolderObj[fstLevel][secLev];
          }
        } else {
          newObj[`third-${fstLevel}`] = thirdHolderObj[fstLevel];
        }
      }
      // console.log(newObj);
      setForm(newObj);
    } else {
      console.log('three');
      setForm(thirdFormFields);
    }
  }, [thirdHolderObj]);

  const formSubmitHandeler = (data) => {
    const obj = {};

    for (let k in data) {
      if (k.includes('third-')) {
        let lab = k.split('-')[1];
        obj[lab] = data[k];
      }
    }

    let panValue = IsPan === true ? 'Y' : 'N';

    const submitObj = {
      // userId: user.id,
      holderType: 'PR',

      residencePhoneNo: '',
      // relationship: '01',
      // relationshipProof: '01',
      panExemptFlag: panValue,
      panPekrnNo: obj.panPekrnNo,
      // confirmpanPekrnNo: obj.confirmpanPekrnNo,
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

    if (thirdHolderObj?.userId) {
      console.log('update');

      dispatch(updateThirdHolderAsync({ ...submitObj, userId: user.id }));
    } else {
      console.log('create');
      dispatch(createThirdHolderAsync({ ...submitObj }));
    }

    dispatch(pageCount(stepsCount + 1));
  };

  const backBtnHandeler = () => {
    dispatch(pageCount(stepsCount - 1));
  };

  console.log('Form', form);
  return (
    <Container>
      <Tabs />

      <Form onSubmit={handleSubmit(formSubmitHandeler)} autoComplete="off">
        <ButtonCustomNew backFun={backBtnHandeler} />
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
          IsPan={IsPan}
          setIsPan={setIsPan}
        />
        <div className="button-container">
          <ButtonCustomNew backFun={backBtnHandeler} />
          <ButtonCustomNew text="next" />
        </div>
      </Form>
    </Container>
  );
}

export default ThirdHolder;
