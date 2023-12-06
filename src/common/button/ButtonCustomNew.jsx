import React from 'react'
import { BtnStyle, BtnTextStyle } from './ButtonCustom-style';
import { MdArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';

function ButtonCustomNew({ text, backFun }) {
  return (
    <React.Fragment>
      {text === 'next' ? (
        <BtnStyle type="submit">
          <MdArrowForwardIos />
        </BtnStyle>
      ) : (
        <BtnStyle type='button' onClick={backFun}>
          <MdArrowBackIosNew />
        </BtnStyle>
      )}
    </React.Fragment>
  );
}

export default ButtonCustomNew



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