import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

//components
import Tabs from '../../common/tabs/Tabs';
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import StakeHolder from '../../common/stake-holder/StakeHolder';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';
import { deleteSecondHolderAsync } from '../second-holder/SecondSlice';
import { deleteThirdHolderAsync } from '../third-holder/thirdSlice';
import { deleteGuardianHolderAsync } from '../guardian-holder/gurdianSlice';
import { deleteNomineeAsync } from '../nominees/nomineeSlice';
import { Container } from 'react-bootstrap';

import {
  createPrimaryHolderAsync,
  updatePrimaryHolderAsync,
  changeTaxResidency,
} from './primarySlice';

import { useSelector, useDispatch } from 'react-redux';
import { primaryFormFields } from './primaryData';
import { createPrimaryHolderOBJ } from './primarySlice';

const fieldName = Object.keys(primaryFormFields);

function PrimaryHolder({ methods }) {
  const [form, setForm] = useState();
  const [errorsOld, setErrors] = useState({});
  const [IsmisMatched, setISMisMatched] = useState(false);

  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const [networthRadio, setNetworthRadio] = useState(false);
  const [IsPan, setIsPan] = useState(false);

  const { primeHolderObj, isSuccess, taxResidency } = useSelector(
    (state) => state.primary
  );
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);

  const { canCriteriaObj } = useSelector((state) => state.criteria);
  const { secondHolderObj } = useSelector((state) => state.second);
  const { thirdHolderObj } = useSelector((state) => state.third);
  const { guardianHolderObj } = useSelector((state) => state.guardian);
  const { nomineeObj } = useSelector((state) => state.nominee);

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
  // useFormPersist('form-name-primary', { watch, setValue });

  useEffect(() => {
    const newObj = {};

    if (Object.keys(primeHolderObj).length > 0) {
      setIsPan(
        primeHolderObj.panExemptFlag !== ''
          ? primeHolderObj.panExemptFlag !== 'N'
            ? true
            : false
          : true
      );
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
      console.log(newObj);
      setForm(newObj);
    } else {
      setForm(primaryFormFields);
    }
  }, [primeHolderObj]);

  useEffect(() => {
    if (
      (canCriteriaObj?.holdingNature === 'SI' &&
        canCriteriaObj?.investorCategory === 'S') ||
      (canCriteriaObj?.holdingNature === 'SI' &&
        canCriteriaObj?.investorCategory === 'I') ||
      canCriteriaObj?.holdingNature === 'AS'
    ) {
      if (secondHolderObj?.id) {
        dispatch(deleteSecondHolderAsync(secondHolderObj?.id));
      }
      if (thirdHolderObj?.id) {
        dispatch(deleteThirdHolderAsync(thirdHolderObj?.id));
      }

      if (guardianHolderObj?.id) {
        dispatch(deleteGuardianHolderAsync(guardianHolderObj?.id));
      }

      console.log('remove second, third, guardian');
    } else if (
      canCriteriaObj?.holdingNature === 'SI' &&
      canCriteriaObj?.investorCategory === 'M'
    ) {
      if (secondHolderObj?.id) {
        console.log('in');
        dispatch(deleteSecondHolderAsync(secondHolderObj?.id));
      }
      if (thirdHolderObj?.id) {
        console.log('in');
        dispatch(deleteThirdHolderAsync(thirdHolderObj?.id));
      }

      if (nomineeObj?.id) {
        dispatch(deleteNomineeAsync(nomineeObj?.id));
      }

      console.log('remove second, third, nominee');
    } else if (canCriteriaObj?.holdingNature === 'JO') {
      if (thirdHolderObj?.id) {
        dispatch(deleteThirdHolderAsync(thirdHolderObj?.id));
      }

      if (guardianHolderObj?.id) {
        dispatch(deleteGuardianHolderAsync(guardianHolderObj?.id));
      }
      console.log('remove  third, guardian');
    }
  }, []);

  useEffect(() => {
    console.log('ghgg', primeHolderObj.fatcaDetail.taxResidencyFlag);

    if (
      primeHolderObj.fatcaDetail.taxResidencyFlag === 'N' ||
      primeHolderObj.fatcaDetail.taxResidencyFlag === ''
    ) {
       dispatch(changeTaxResidency('N'));
    
    } else {
       dispatch(changeTaxResidency('Y'));
    }
  }, []);

  const formSubmitHandeler = (data) => {
    // Object.keys(data).map((item) => item.split('-')[1]).filter(label => label !== undefined)

    const obj = {};

    for (let k in data) {
      if (k.includes('primary-')) {
        let lab = k.split('-')[1];
        console.log(obj[lab], '=======', data[k]);
        obj[lab] = data[k];
      }
    }
    let panValue = IsPan === true ? 'Y' : 'N';

    const submitObj = {
      // ...primeHolderObj,
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
        taxReferenceNo: obj.taxReferenceNo,
        taxRecords: {
          taxCountry: obj.taxCountry,
          taxReferenceNo: obj.taxReferenceNo,
          identityType: obj.identityType,
        },
      },
    };

    dispatch(createPrimaryHolderOBJ({ ...submitObj }));

    dispatch(pageCount(stepsCount + 1));

    // delete primeHolderObj.confirmpanPekrnNo;
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

export default PrimaryHolder;
