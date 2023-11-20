import React from "react";
import { BtnStyle } from "./ButtonCustom-style";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";


function ButtonCustom({ text, btnFun, variant, type, bgColor }) {
  return (
    <>
      {!type ? (
        //Back button
        <BtnStyle onClick={btnFun} back>
          <MdArrowBackIosNew />
        </BtnStyle>
      ) : (
        //Next button
        <BtnStyle type={type}><MdArrowForwardIos /></BtnStyle>
      )}
    </>
  );
}

export default ButtonCustom;

{
  /* <Stack gap={2} className="col-md-5 mx-auto">
  <Button variant={variant} onClick={btnFun}>
    {text}
  </Button>
</Stack>; */
}
