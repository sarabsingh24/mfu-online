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
import { primeHolderForm } from "../../reducer/Reducer/account/accountSlice";

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
  useFormPersist('form-name', { watch, setValue });

  useEffect(() => {
    if (Object.keys(primeHolderObj).length) {
      setForm(primeHolderObj);
    } else {
      setForm(commonFormField);
    }
  }, [primeHolderObj]);

  const formSubmitHandeler = (data) => {
    // data.preventDefault();



if (data.panPekrnNo !== data.confirmpanPekrnNo) {
 
  setISMisMatched(true);
}else{
  setISMisMatched(false);
}


    const formErrors = validateForm(form, networthRadio, grossIncomeRadio);
    if (Object.keys(formErrors).length > 0) {
      // alert("error");
      setErrors(formErrors);
    } else {
      // alert("success");
      // if (primeHolderObj.confirmpanPekrnNo) {
      //   delete primeHolderObj.confirmpanPekrnNo;
      // }

      dispatch(
        primeHolderForm({
          ...primeHolderObj,
          holderType: 'PR',
          panExemptFlag: 'Y',
          residencePhoneNo: '',
          relationship: '01',
          relationshipProof: '01',
          ...form,
        })
      );
      dispatch(pageCount(stepsCount + 1));
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(formSubmitHandeler)} autoComplete="off">
        <StakeHolder
          form={form}
          setForm={setForm}
          holderType={'Primary Holder'}
          errorsOld={errorsOld}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          setErrors={setErrors}
          networthRadio={networthRadio}
          setNetworthRadio={setNetworthRadio}
          grossIncomeRadio={grossIncomeRadio}
          setGrossIncomeRadio={setGrossIncomeRadio}
          IsmisMatched={IsmisMatched}
        />
      </Form>
    </React.Fragment>
  );
}

export default PrimaryHolder;
