import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style.css";

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
  const [recCanID, setRecCanID] = useState("");
  const [nomineeApi, setNomineeApi] = useState([]);
  const [canNominee, setCanNominee] = useState([]);

  const [status, setStatus] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    stepsCount,
    tabsCreater,
    proofUploadObj,
    combinedForm,
    isSuccess,
    isError,
    message,
    nomineeObj,
    account,
    bankAccountsObj,
    canId,
    dispatch,
  } = useCommonReducer();

  useEffect(() => {
    if (proofUploadObj.length) {
      setImagesList(proofUploadObj);
    }
  }, [proofUploadObj]);

  useEffect(() => {
    let banksName = bankAccountsObj.map((bank) => bank.bankId);
    setBankAccount(banksName);

    setCanNominee(nomineeObj.nomineeRecords.length);
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

  const formSubmitHandeler = async (e) => {
    e.preventDefault();

    let reponse = await fetch("http://api.finnsysonline.com:81/mfu/v1/cans", {
      method: "POST",
      body: JSON.stringify(combinedForm),
      headers: {
        "content-type": "application/json",
      },
    });
    reponse = await reponse.json();

    if (reponse.success) {
      toast.success(reponse.message);
      setRecCanID(reponse.can);
    } else {
      toast.error(reponse.message);
      // setRecCanID("30069GS001");
    }

    if (true) {
      dispatch(createAccount(combinedForm));
    }
  };

  useEffect(() => {
    console.log(nomineeApi);
    let requestInterval;
    if (canNominee && recCanID !== "") {
      requestInterval = setInterval(async () => {
        let reponse = await fetch(
          `http://api.finnsysonline.com:81/mfu/v1/cans/${recCanID}/status`,
          {
            method: "get",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        reponse = await reponse.json();
        console.log(reponse);
        if (reponse.success) {
          let nomineeList = reponse.nomineeVerificationLinks;
          setNomineeApi(nomineeList);
          //   toast.success(reponse.message);
        } else {
          toast.error(reponse.message);
        }
      }, 3000);
    }
    return () => {
      clearInterval(requestInterval);
    };
  });

  return (
    <>
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
                Note: The allowed image file formats ( PNG, GIF, JPG | JPEG, ).
                Total submitted document file size should not be more than 500
                KB.
              </Alert>
            </Col>
          </Row>
          <Row className=" mb-4">
            <Col xs={12} md={6}>
              <h5 className={recCanID ? "text-success" : "text-secondary"}>
                Step 1: Submit Can Criteria Form &nbsp;
                {recCanID && <BsCheckCircleFill />}
              </h5>

              {!recCanID && (
                <button
                  type="button"
                  onClick={formSubmitHandeler}
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

              {bankAccount.length > 0 && recCanID !== ""
                ? bankAccount.map((name, index) => {
                    return (
                      <UploadSection
                        key={index}
                        bankName={name}
                        recCanID={recCanID}
                      />
                    );
                  })
                : ""}
            </Col>
          </Row>
          {canNominee ? (
            <Row className=" mb-4">
              <Col xs={12}>
                <h5 className="text-secondary">step 3: Nominee Varification</h5>

                {nomineeApi.length > 0 && recCanID !== ""
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
                  : ""}
              </Col>
            </Row>
          ) : (
            ""
          )}
        </GridCustom>
      </Section>

      <FooterSection
        backBtn={recCanID ? false : true}
        nextBtn={false}
        submitBtn={false}
        btnFun={btnFun}
        cls="btn-right-align"
      />
    </>
  );
}

export default ProofUpload;
