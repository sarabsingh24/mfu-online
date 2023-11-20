import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';

//components
import StakeHolder from "../../common/stake-holder/StakeHolder";
import { tabUpdate, pageCount } from "../../reducer/Reducer/tab/tabSlice";
import useCommonReducer from "../../common/customComp/useCommonReducer";
import { commonFormField } from "../../common/stake-holder/stakeHolderData";
import { validateForm } from "../../common/stake-holder/StakeHolderValidation";
import { primeHolderForm } from "../../reducer/Reducer/account/accountSlice";

function PrimaryHolder() {
  const [form, setForm] = useState();
  const [ errorsOld, setErrors] = useState({});

  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const [networthRadio, setNetworthRadio] = useState(false);

  const { stepsCount, primeHolderObj, dispatch } = useCommonReducer();

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

  useEffect(() => {
    if (Object.keys(primeHolderObj).length) {
      setForm(primeHolderObj);
    } else {
      setForm(commonFormField);
    }
  }, [primeHolderObj]);

  const formSubmitHandeler = (data) => {
    data.preventDefault();

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

export default PrimaryHolder;
