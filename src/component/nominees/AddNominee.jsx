import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// component
import GridCustom from "../../common/grid-custom/GridCustom";
import Section from "../../common/section/Section";
import InputText from "../../common/form-elements/InputText";
import DatePicker from "../../common/form-elements/DatePicker";

export default function AddNominee({
  count,
  formObj,
  setForm,
  errors,
  thisAccountHandeler,
}) {
  let order = count === 0 ? "First" : count === 1 ? "Second" : "Third";

  return (
    <Section heading={`${order} Nominee`}>
      <GridCustom>
        <Row>
          <Col xs={12} md={3}>
            <InputText
              name="nomineeName"
              label="Name of Nominee"
              value={formObj?.nomineeName || ""}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
          <Col xs={12} md={3}>
            <InputText
              name="relation"
              label="Relationship"
              value={formObj?.relation || ""}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
          <Col xs={12} md={3}>
            <InputText
              name="percentage"
              label="Percent(%)"
              value={formObj?.percentage || ""}
              // value={100}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
            />
          </Col>
          <Col xs={12} md={3}>
            <DatePicker
              name="dateOfBirth"
              label="Date of Birth"
              value={formObj?.dateOfBirth || ""}
              count={count + 1}
              changeFun={thisAccountHandeler}
              mandatory="*"
              errors={errors[count]}
              dob={true}
            />
          </Col>
        </Row>
      </GridCustom>
    </Section>
  );
}
