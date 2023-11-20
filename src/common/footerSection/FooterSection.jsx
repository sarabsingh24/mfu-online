import React from "react";

//component
import ButtonCustom from "../../common/button/ButtonCustom";
import { BtnStyle } from "../button/ButtonCustom-style";

function FooterSection({ backBtn, nextBtn, submitBtn,btnFun,cls }) {
  return (
    <div className={`mb-4 ${cls}`}>
      {backBtn && (
        <ButtonCustom
          text="Back"
          variant="outline-primary"
          btnFun={btnFun.prevHandeler}
        />
      )}
      {nextBtn && <ButtonCustom text="Next" variant="primary" type="submit" />}
      {submitBtn && (
        <BtnStyle text="Submit" bgColor>
          Submit Form{" "}
        </BtnStyle>
      )}
    </div>
  );
}

export default FooterSection;



{/* <div className="mb-4 btn-right-align ">
  {backBtn && (
    <ButtonCustom
      text="Back"
      variant="outline-primary"
      btnFun={btnFun.prevHandeler}
    />
  )}
  {nextBtn && <ButtonCustom text="Next" variant="primary" type="submit" />}
  {submitBtn && (
    <BtnStyle text="Submit" bgColor>
      Submit Form{" "}
    </BtnStyle>
  )}
</div>; */}