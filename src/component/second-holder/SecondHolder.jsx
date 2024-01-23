import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
//components
import Tabs from '../../common/tabs/Tabs';
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import StakeHolder from '../../common/stake-holder/StakeHolder';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';

import { commonFormField } from '../../common/stake-holder/stakeHolderData';
import { validateForm } from '../../common/stake-holder/StakeHolderValidation';
import { createSecondHolderOBJ, changeTaxResidency } from './SecondSlice';
import { secondaryFormFields } from './secondaryData';

const fieldName = Object.keys(secondaryFormFields);

function SecondHolder() {
  const [form, setForm] = useState(commonFormField);
  const [errorsOld, setErrors] = useState({});
  const [networthRadio, setNetworthRadio] = useState(false);
  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const [IsPan, setIsPan] = useState(false);

  const { secondHolderObj, taxResidency } = useSelector(
    (state) => state.second
  );
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

    if (Object.keys(secondHolderObj).length > 0) {
      setIsPan(
        secondHolderObj.panExemptFlag !== ''
          ? secondHolderObj.panExemptFlag !== 'N'
            ? true
            : false
          : true
      );
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
            if (secLev === 'taxRecords') {
              for (let thirdLev in secondHolderObj[fstLevel].taxRecords) {
                newObj[`secondary-${thirdLev}`] =
                  secondHolderObj[fstLevel][secLev][thirdLev];
              }
            }
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

  useEffect(() => {
    if (
      secondHolderObj.fatcaDetail.taxResidencyFlag === 'N' ||
      secondHolderObj.fatcaDetail.taxResidencyFlag === ''
    ) {
      dispatch(changeTaxResidency('N'));
    } else {
      dispatch(changeTaxResidency('Y'));
    }
  }, []);

  const formSubmitHandeler = (data) => {
    // console.log('secondary', data);

    const obj = {};

    for (let k in data) {
      if (k.includes('secondary-')) {
        let lab = k.split('-')[1];
        obj[lab] = data[k];
        // console.log(k, '====', data[k]);
      }
    }

    let panValue = IsPan === true ? 'Y' : 'N';

    delete obj.taxRecords;

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
        birthCountry: obj.taxResidencyFlag === 'Y' ? obj.birthCountry : 'India',
        citizenshipCountry:
          obj.taxResidencyFlag === 'Y' ? obj.citizenshipCountry : 'India',
        nationalityCountry:
          obj.taxResidencyFlag === 'Y' ? obj.nationalityCountry : 'India',
        taxRecords: {
          taxCountry: obj.taxResidencyFlag === 'Y' ? obj.taxCountry : '',
          taxReferenceNo:
            obj.taxResidencyFlag === 'Y' ? obj.taxReferenceNo : '',
          identityType: obj.taxResidencyFlag === 'Y' ? obj.identityType : '',
        },
      },
    };

    dispatch(createSecondHolderOBJ({ ...submitObj }));
    dispatch(pageCount(stepsCount + 1));
  };

  const backBtnHandeler = () => {
    dispatch(pageCount(stepsCount - 1));
  };

  return (
    <Container>
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
          IsPan={IsPan}
          setIsPan={setIsPan}
          taxResidency={taxResidency}
          changeTaxResidency={changeTaxResidency}
        />
        <div className="button-container">
          <ButtonCustomNew backFun={backBtnHandeler} />
          <ButtonCustomNew text="next" />
        </div>
      </Form>
    </Container>
  );
}

export default SecondHolder;
