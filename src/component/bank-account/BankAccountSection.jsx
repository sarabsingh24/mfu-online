import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../Style.css";

//component
import Section from "../../common/section/Section";
import InputText from "../../common/form-elements/InputText";

import GridCustom from "../../common/grid-custom/GridCustom";
import SelectOption from "../../common/form-elements/SelectOption";
import { accountType, bankProofOptions } from "./accountData";

function BankAccountSection({
  count,
  form,
  formObj,
  setForm,
  errors,
  thisAccountHandeler,
}) {
  let accountCount = count === 0 ? "Default" : count === 1 ? "Second" : "Third";

  return (
    <Section heading={`${accountCount} Bank Account details`}>
      <GridCustom>
        <Row>
          <Col xs={12} md={4}>
            <InputText
              name="accountNo"
              label="Bank A/c No"
              type="password"
              value={formObj?.accountNo || ""}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputText
              name="reAccountNo"
              label="Re-Enter Bank A/c No"
              type="text"
              value={formObj?.reAccountNo || ""}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
          <Col xs={12} md={4}>
            <SelectOption
              name="accountType"
              label="Account Type"
              value={formObj?.accountType || ""}
              options={accountType}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <InputText
              name="bankId"
              label="Bank"
              type="text"
              value={formObj?.bankId || ""}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputText
              name="micrCode"
              label="MICR"
              type="text"
              value={formObj?.micrCode || ""}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputText
              name="ifscCode"
              label="IFSC"
              type="text"
              value={formObj?.ifscCode || ""}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <SelectOption
              name="bankProof"
              label="Bank Proof"
              value={formObj?.bankProof || ""}
              options={bankProofOptions}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
        </Row>
      </GridCustom>
    </Section>
  );
}

export default BankAccountSection;
