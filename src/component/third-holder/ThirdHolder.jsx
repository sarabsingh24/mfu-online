import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

//components
import StakeHolder from "../../common/stake-holder/StakeHolder";
import { tabUpdate, pageCount } from "../../reducer/Reducer/tab/tabSlice";
import useCommonReducer from "../../common/customComp/useCommonReducer";
import { commonFormField } from "../../common/stake-holder/stakeHolderData";
import { validateForm } from "../../common/stake-holder/StakeHolderValidation";
import { thirdHolderForm } from "../../reducer/Reducer/account/accountSlice";

function ThirdHolder() {
  const [form, setForm] = useState(commonFormField);
  const [errors, setErrors] = useState({});
  const [networthRadio, setNetworthRadio] = useState(false);
  const [grossIncomeRadio, setGrossIncomeRadio] = useState(false);

  const { stepsCount, thirdHolderObj, dispatch } = useCommonReducer();

  useEffect(() => {
    if (Object.keys(thirdHolderObj).length) {
      setForm(thirdHolderObj);
    }
  }, [thirdHolderObj]);

  const formSubmitHandeler = (e) => {
    e.preventDefault();

    const formErrors = validateForm(form, networthRadio, grossIncomeRadio);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // if (thirdHolderObj.confirmpanPekrnNo) {
      //   delete thirdHolderObj.confirmpanPekrnNo;
      // }
      dispatch(
        thirdHolderForm({
          ...thirdHolderObj,
          holderType: "TH",
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
          holderType={"Third Holder"}
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

export default ThirdHolder;
