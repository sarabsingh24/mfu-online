import React from 'react';
import Button from 'react-bootstrap/Button';
import { BtnStyle, BtnTextStyle, BtnSubmitStyle } from './ButtonCustom-style';
import { MdArrowBackIosNew,MdArrowForwardIos } from 'react-icons/md';


function ButtonCustomNew({ text, backFun }) {
  return (
    <React.Fragment>
      {text === 'next' ? (
        <BtnStyle type="submit">
          <MdArrowForwardIos />
        </BtnStyle>
      ) : text === 'Submit' ? (
        <Button variant="success" type="submit">
          Submit
        </Button>
      ) : (
        <BtnStyle type="button" onClick={backFun}>
          <MdArrowBackIosNew />
        </BtnStyle>
      )}
    </React.Fragment>
  );
}

export default ButtonCustomNew;

//  {
//    text === 'save' ? (
//      <BtnTextStyle type="submit">Save</BtnTextStyle>
//    ) : text === 'next' ? (
//      <BtnStyle onClick={myFun}>
//        <MdArrowForwardIos />
//      </BtnStyle>
//    ) : (
//      <BtnStyle onClick={myFun}>
//        <MdArrowBackIosNew />
//      </BtnStyle>
//    );
//  }
