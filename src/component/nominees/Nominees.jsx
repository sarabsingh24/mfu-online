import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

// component
import GridCustom from "../../common/grid-custom/GridCustom";
import Section from "../../common/section/Section";
import SelectOption from "../../common/form-elements/SelectOption";
import FooterSection from "../../common/footerSection/FooterSection";
import { btnHandeler } from "../../common/helper/Helper";
import { tabUpdate, pageCount } from "../../reducer/Reducer/tab/tabSlice";
import useCommonReducer from "../../common/customComp/useCommonReducer";
import AddNominee from "./AddNominee";
import { validateForm } from "./NomineeValidation";
import { nomineesForm } from "../../reducer/Reducer/account/accountSlice";

const nomineeOption = [
  { value: "N", label: "No - I/We declare to Opt out" },
  { value: "Y", label: "Yes - I/We wish to nominate" },
];

const nomineeCompObj = {
  sequenceNo: "1",
  nomineeName: "",
  relation: "",
  percentage: "",
  dateOfBirth: "",
  // nomineeGuardianName: "",
  // nomineeGuardianRelation: "",
  // nomineeGuardianDob: "",
};

export default function Nominees() {
  const [form, setForm] = useState([]);
  const [btnFun, setBtnFun] = useState({});
  const [number, setNumber] = useState("0");
  const [nomineeSelected, setNomineeSelected] = useState("");

  const [isNominee, setIsNominee] = useState(false);
  const [errors, setErrors] = useState([]);
  const { stepsCount, tabsCreater, nomineeObj, dispatch } = useCommonReducer();

  const numberHandeler = (e) => {
    let val = e.target.value;
    setNumber(val);
  };
  const formHandeler = () => {
    if (nomineeSelected === "N") {
      setNomineeSelected("Y");
      setForm([nomineeCompObj]);
      setIsNominee(true);
    } else {
      setNomineeSelected("N");
      setIsNominee(false);
      dispatch(nomineesForm([]));
      setForm([]);
      // setNumber(0);
    }
  };

  const newFun = (name, count) => {
    let newError = errors.map((item, index) => {
      if (index + 1 === +count) {
        if (!!item[name]) {
          // console.log("ggg");
          return { ...item, [name]: null };
        }
      }
      return item;
    });
    setErrors(newError);
  };

  const thisAccountHandeler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let count = e.target.dataset.count;

    let newArray = form.map((obj) => {
      if (obj.sequenceNo === count) {
        newFun(name, count);
        return { ...obj, [name]: value };
      }
      return obj;
    });

    setForm(newArray);
  };

  useEffect(() => {
    if (+number === 1) {
      setForm([...form.slice(0, 1)]);
    }
    if (+number === 2) {
      if (form.length > 2) {
        setForm([...form.slice(0, 2)]);
      } else {
        setForm([...form, { ...nomineeCompObj, sequenceNo: "2" }]);
      }
    }
    if (+number === 3) {
      if (form.length === 2) {
        setForm([...form, { ...nomineeCompObj, sequenceNo: "3" }]);
      } else {
        setForm([
          ...form,
          { ...nomineeCompObj, sequenceNo: "2" },
          { ...nomineeCompObj, sequenceNo: "3" },
        ]);
      }
    }
  }, [number]);

  const formSubmitHandeler = (e) => {
    e.preventDefault();

    const formErrors = validateForm(form, nomineeSelected);
    const account = (e) => {
      if (!Object.keys(e).length) {
        return true;
      }
      return false;
    };
    let isAccount = formErrors.every(account);

    if (!isAccount) {
      // alert("error");
      setErrors(formErrors);
    } else {
      // alert("success");

      let obj = {
        nomineeOptedFlag: nomineeSelected,
        nomineeRecords: form,
      };
      dispatch(nomineesForm(obj));
      dispatch(pageCount(stepsCount + 1));
    }
  };

  useEffect(() => {
    setBtnFun(btnHandeler(dispatch, pageCount, stepsCount));
  }, [dispatch, stepsCount]);

  useEffect(() => {
    if (Object.keys(nomineeObj).length) {
      setNomineeSelected(nomineeObj.nomineeOptedFlag === "N" ? "N" : "Y");
      setIsNominee(nomineeObj.nomineeOptedFlag === "N" ? false : true);
      setForm(nomineeObj.nomineeRecords);
    } else {
      setNomineeSelected("N");
      setNumber("0");
      setIsNominee(false);
      setForm([]);
    }
  }, [nomineeObj]);

  return (
    <React.Fragment>
      <FooterSection
        backBtn={true}
        nextBtn={false}
        btnFun={btnFun}
        cls="btn-left-align"
      />

      <Form onSubmit={formSubmitHandeler}>
        <Section heading="Nominee details">
          <GridCustom>
            <Row>
              <Col xs={12}>
                <Alert variant="info">
                  Pursuant to SEBI circular(s) No. SEBI/HO/IMD/-II
                  DOF3/P/CIR/2022/82 dated 15-Jun-2022 on the nomination for
                  mutual fund investment, it is mandatory to either register
                  nominee/opt-out of nominee registration for every NEW folio
                  created effective 1st October 2022.
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4}>
                <SelectOption
                  name="nomineeOptedFlag"
                  label="Nomination Option"
                  value={nomineeSelected}
                  // option={form?.length ? nominee[1] : nominee}
                  options={nomineeOption}
                  changeFun={formHandeler}
                  mandatory="*"
                />
              </Col>
              <Col xs={12} md={3}>
                {isNominee && (
                  <SelectOption
                    name="nomineeCount"
                    label="No. of Nominee"
                    value={form?.length || number}
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                    ]}
                    changeFun={numberHandeler}
                    mandatory="*"
                  />
                )}
              </Col>
            </Row>
          </GridCustom>
        </Section>
        {isNominee &&
          form?.map((detail, index) => {
            return (
              <AddNominee
                key={index}
                formObj={detail}
                setForm={setForm}
                count={index}
                thisAccountHandeler={thisAccountHandeler}
                errors={errors}
              />
            );
          })}

        <FooterSection
          backBtn={true}
          nextBtn={true}
          btnFun={btnFun}
          cls="btn-right-align"
        />
      </Form>
    </React.Fragment>
  );
}
