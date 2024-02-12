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

import {
  
  createGuardianHolderOBJ,
  changeTaxResidency,
} from './gurdianSlice';
import { gurdianFormFields } from './gurdianData';

const fieldName = Object.keys(gurdianFormFields);

const recordsObj = {
  taxCountry: '',
  taxReferenceNo: '',
  identityType: '',
};

function GuardianHolder() {
  const [form, setForm] = useState(commonFormField);
  const [errorsOld, setErrors] = useState({});
  const [textRecords, setTextRecords] = useState([]);
  const [networthRadio, setNetworthRadio] = useState(false);
  const [IsPan, setIsPan] = useState(false);
  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const { canCriteriaObj } = useSelector((state) => state.criteria);
  const { guardianHolderObj, taxResidency } = useSelector(
    (state) => state.guardian
  );
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);

 
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

    if (Object.keys(guardianHolderObj).length > 0) {
      setIsPan(
        guardianHolderObj.panExemptFlag !== ''
          ? guardianHolderObj.panExemptFlag !== 'N'
            ? true
            : false
          : true
      );
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
            // if (secLev === 'taxRecords') {
            //   for (let thirdLev in guardianHolderObj[fstLevel].taxRecords) {
            //     newObj[`gurdian-$${thirdLev}`] =
            //       guardianHolderObj[fstLevel][secLev][thirdLev];
            //   }
              
            // }
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

    if (guardianHolderObj?.fatcaDetail?.taxRecords?.length > 0) {
      setTextRecords(guardianHolderObj?.fatcaDetail?.taxRecords);
    } else {
      setTextRecords([{ ...recordsObj }]);
    }
  }, [guardianHolderObj]);

  useEffect(() => {
    if (
      guardianHolderObj?.fatcaDetail?.taxResidencyFlag === 'N' ||
      guardianHolderObj?.fatcaDetail?.taxResidencyFlag === '' ||
      Object.keys(guardianHolderObj).length === 0
    ) {
      dispatch(changeTaxResidency('N'));
    } else {
      dispatch(changeTaxResidency('Y'));
    }
  }, [guardianHolderObj.fatcaDetail?.taxResidencyFlag]);

  const formSubmitHandeler = (data) => {
     console.log(data);
    const obj = {};

    for (let k in data) {
      if (k.includes('gurdian')) {
        let lab = k.split('-')[1];
        obj[lab] = data[k];
        console.log(k, '====', data[k]);
      }
    }
    let panValue = IsPan === true ? 'Y' : 'N';

    delete obj.taxRecords;

    const submitObj = {
      // ...guardianHolderObj,
      // userId: user.id,
      holderType: 'PR',
      residencePhoneNo: '',
      relationship: '01',
      relationshipProof: '01',
      panExemptFlag: panValue,
      panPekrnNo: obj.panPekrnNo,
      // confirmpanPekrnNo: obj.confirmpanPekrnNo,
      name: obj.name,
      dateOfBirth: obj.dateOfBirth,
      contactDetail: {
        primaryEmail: obj.primaryEmail,
        mobileIsdCode: obj.mobileIsdCode,
        primaryMobileBelongsTo: '',
        primaryMobileNo: obj.primaryMobileNo,
        primaryEmailBelongsTo: '',
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
        taxRecords: textRecords,
      },
    };

   
      dispatch(createGuardianHolderOBJ({ ...submitObj }));
    
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
          sliceData={guardianHolderObj}
          setForm={setForm}
          holderType={'Guardian'}
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
          investorCategory={canCriteriaObj?.investorCategory}
          textRecords={textRecords}
          setTextRecords={setTextRecords}
          recordsObj={recordsObj}
        />
        <div className="button-container">
          <ButtonCustomNew backFun={backBtnHandeler} />
          <ButtonCustomNew text="next" />
        </div>
      </Form>
    </Container>
  );
}

export default GuardianHolder;
