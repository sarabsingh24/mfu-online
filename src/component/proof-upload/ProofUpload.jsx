import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import "../Style.css";
import { Container } from 'react-bootstrap';

import { BsCheckCircleFill } from "react-icons/bs";

// component
import GridCustom from "../../common/grid-custom/GridCustom";
import Section from "../../common/section/Section";
import InputText from "../../common/form-elements/InputText";
import FooterSection from "../../common/footerSection/FooterSection";
import { btnHandeler } from "../../common/helper/Helper";
import useCommonReducer from "../../common/customComp/useCommonReducer";
import { pageCount } from "../../reducer/Reducer/tab/tabSlice";
import {
  createAccount,
  reset,
} from "../../reducer/Reducer/account/accountSlice";
import UploadSection from "./UploadSection";

function ProofUpload() {
  const [btnFun, setBtnFun] = useState({});
  const [imagesList, setImagesList] = useState([]);
  const [bankAccount, setBankAccount] = useState([]);
  const [recCanID, setRecCanID] = useState(true);
  const [nomineeApi, setNomineeApi] = useState([]);
  const [canNominee, setCanNominee] = useState([]);

  const [status, setStatus] = useState(false);

const { bankAccountsObj } = useSelector((state) => state.bankAccount);
const { nomineeObj } = useSelector((state) => state.nominee);
const { proofUploadObj } = useSelector((state) => state.proof);
const { stepsCount, tabsCreater } = useSelector((state) => state.tab);
// const { userId } = useSelector((state) => state.account);

const dispatch = useDispatch();


  const location = useLocation();
  const navigate = useNavigate();
 const {
   register,
   handleSubmit,
   watch,
   setValue,
   getValues,
   formState: { errors },
 } = useFormContext();

  




  // useEffect(() => {
  //   if (proofUploadObj.length) {
  //     setImagesList(proofUploadObj);
  //   }
  // }, [proofUploadObj]);

  useEffect(() => {
    // let banksName = bankAccountsObj.map((bank) => bank.bankId);
    // setBankAccount(banksName);

    setCanNominee(nomineeObj.length);
    // console.log(nomineeObj);
    // setRecCanID(canId);
  }, [bankAccountsObj, nomineeObj]);

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (isSuccess) {
  //     toast.success("User Registered successfuly");
  //     // dispatch(reset());
  //     // dispatch(pageCount(0));
  //   }
  // }, [isError, isSuccess, message]);

  useEffect(() => {
    setBtnFun(btnHandeler(dispatch, pageCount, stepsCount));
  }, [dispatch, stepsCount]);

  const formSubmitHandeler = async (data) => {
console.log(data)
    // e.preventDefault();
    // let reponse = await fetch("http://api.finnsysonline.com:81/mfu/v1/cans", {
    //   method: "POST",
    //   body: JSON.stringify(combinedForm),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // });
    // reponse = await reponse.json();

    // if (reponse.success) {
    //   toast.success(reponse.message);
    //   setRecCanID(reponse.can);
    // } else {
    //   toast.error(reponse.message);
    //   // setRecCanID("30069GS001");
    // }

    if (true) {
      // dispatch(createAccount(combinedForm));............sarab
    }
  };

  useEffect(() => {
    console.log(bankAccountsObj);
    // let requestInterval;
    // if (canNominee && recCanID !== "") {
    //   requestInterval = setInterval(async () => {
    //     let reponse = await fetch(
    //       `http://api.finnsysonline.com:81/mfu/v1/cans/${recCanID}/status`,
    //       {
    //         method: "get",
    //         headers: {
    //           "content-type": "application/json",
    //         },
    //       }
    //     );
    //     reponse = await reponse.json();
    //     console.log(reponse);
    //     if (reponse.success) {
    //       let nomineeList = reponse.nomineeVerificationLinks;
    //       setNomineeApi(nomineeList);
    //       //   toast.success(reponse.message);
    //     } else {
    //       toast.error(reponse.message);
    //     }
    //   }, 3000);
    // }
    // return () => {
    //   clearInterval(requestInterval);
    // };
  }, [bankAccountsObj]);


    const backBtnHandeler = () => {
      dispatch(pageCount(stepsCount - 1));
    };

  return (
    <Container>
      <Form onSubmit={handleSubmit(formSubmitHandeler)} autoComplete="off">
        <FooterSection
          backBtn={true}
          nextBtn={false}
          submitBtn={false}
          btnFun={btnFun}
          cls="btn-left-align"
        />
        <Section heading="Proof Upload">
          <GridCustom>
            <Row>
              <Col xs={12}>
                <Alert variant="danger">
                  Note: The allowed image file formats ( PNG, GIF, JPG | JPEG,
                  ). Total submitted document file size should not be more than
                  500 KB.
                </Alert>
              </Col>
            </Row>
            <Row className=" mb-4">
              <Col xs={12} md={6}>
                <h5 className={recCanID ? 'text-success' : 'text-secondary'}>
                  Step 1: Submit Can Criteria Form &nbsp;
                  {recCanID && <BsCheckCircleFill />}
                </h5>

                {!recCanID && (
                  <button
                    type="submit"
                    className="btn  btn-success me-2  btn-sm"
                  >
                    Submit Can Criteria Form
                  </button>
                )}
              </Col>
            </Row>
            <Row className=" mb-4">
              <Col xs={12}>
                <h5 className="text-secondary" disabled>
                  Step 2: Proof Upload
                </h5>

                {bankAccountsObj?.accountDetails?.map((bank, index) => {
                  return (
                    // <div>{name}</div>
                    <UploadSection
                      key={`${index}r`}
                      bankName={bank.bankId}
                      recCanID={recCanID}
                      proofUploadObj={proofUploadObj}
                    />
                  );
                })}
              </Col>
            </Row>
            {canNominee ? (
              <Row className=" mb-4">
                <Col xs={12}>
                  <h5 className="text-secondary">
                    step 3: Nominee Varification
                  </h5>

                  {nomineeApi.length > 0 && recCanID !== ''
                    ? nomineeApi.map((item, index) => {
                        return (
                          <a
                            key={index}
                            class="btn btn-outline-success btn-sm"
                            role="button"
                            href={item.nomineeVerificationLinks[index]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            click to verify
                          </a>
                        );
                      })
                    : ''}
                </Col>
              </Row>
            ) : (
              ''
            )}
          </GridCustom>
        </Section>
        <button type="button" onClick={backBtnHandeler}>
          Back
        </button>
        {/* <FooterSection
        backBtn={recCanID ? false : true}
        nextBtn={false}
        submitBtn={false}
        btnFun={btnFun}
        cls="btn-right-align"
      /> */}
      </Form>
    </Container>
  );
}

export default ProofUpload;
