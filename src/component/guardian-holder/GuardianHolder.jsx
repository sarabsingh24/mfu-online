import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

//components
import StakeHolder from "../../common/stake-holder/StakeHolder";
import { tabUpdate, pageCount } from "../../reducer/Reducer/tab/tabSlice";
import useCommonReducer from "../../common/customComp/useCommonReducer";
import { commonFormField } from "../../common/stake-holder/stakeHolderData";
import { validateForm } from "../../common/stake-holder/StakeHolderValidation";
import { guardianHolderForm } from "../../reducer/Reducer/account/accountSlice";

function GuardianHolder() {
  const [form, setForm] = useState(commonFormField);
  const [errors, setErrors] = useState({});
  const [networthRadio, setNetworthRadio] = useState(false);
  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);
  const { stepsCount, guardianHolderObj, dispatch } = useCommonReducer();

  useEffect(() => {
    if (Object.keys(guardianHolderObj).length) {
      setForm(guardianHolderObj);
    }
  }, [guardianHolderObj]);

  const formSubmitHandeler = (e) => {
    e.preventDefault();

    const formErrors = validateForm(form, networthRadio, grossIncomeRadio);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      //  if (guardianHolderObj.confirmpanPekrnNo) {
      //    delete guardianHolderObj.confirmpanPekrnNo;
      //  }
      dispatch(
        guardianHolderForm({
          ...guardianHolderObj,
          holderType: "GU",
          panExemptFlag: "Y",
          residencePhoneNo: "",
          relationship: "01",
          relationshipProof: "01",
          ...form,
        })
      );
      dispatch(pageCount(stepsCount + 1));
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={formSubmitHandeler}>
        <StakeHolder
          form={form}
          setForm={setForm}
          holderType={"Guardian"}
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

export default GuardianHolder;
