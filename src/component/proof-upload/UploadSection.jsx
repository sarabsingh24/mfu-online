import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import "../Style.css";
import axios from "axios";

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

function UploadSection({ bankName, recCanID }) {
  const [btnFun, setBtnFun] = useState({});
  const [imagesList, setImagesList] = useState([]);
  const [data, setData] = useState("");
  const [bankProofSize, setBankProofSize] = useState(0);
  const [status, setStatus] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSizeGrater, setIsSizeGrater] = useState(false);
  const divId = useRef();
  const [reqData, setReqData] = useState({
    actionType: "AD",
    imageReferenceNo: "",
    imageType: "",
  });

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
    dispatch,
  } = useCommonReducer();

  useEffect(() => {
    if (proofUploadObj.length) {
      setImagesList(proofUploadObj);
    }
  }, [proofUploadObj]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("User Registered successfuly");
      dispatch(reset());
      dispatch(pageCount(0));
    }
  }, [isError, isSuccess, message]);

  const getImageHandeler = (e) => {
    e.preventDefault();

    const { name, size, type } = e.target.files[0];
    const path = URL.createObjectURL(e.target.files[0]);
    const id = +new Date();

    // const path = URL.createObjectURL(e.target.files[0]);
    setData(e.target.files[0]);
    setIsUploaded(false);

    setImagesList([{ id, path, name, size, type, status: "pending..." }]);

    setReqData({ ...reqData, imageReferenceNo: name, imageType: type });
    e.target.value = "";
  };

  const removeImgHandeler = (id, size) => {
    let filterImage = imagesList.filter((img) => img.id !== id);
    setImagesList(filterImage);

    // dispatch(proofUploadForm([...filterImage]));
  };

  const addProofHandeler = () => {
    let defaultBtn = divId.current;
    defaultBtn.click();
  };

  const fileUploadHandeler = async (size) => {
    const formData = new FormData();
    formData.append("file", data);
    formData.append("actionType", "AD");
    formData.append("imageType", "2#BP");

    // console.log([...formData]);

    if (size < 500000) {
      let response = await fetch(
        `http://api.finnsysonline.com:81/mfu/v1/cans/11169GS001/proof`,
        {
          method: "post",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("file uploaded");
        setBankProofSize(size);
        setIsUploaded(true);
      } else {
        toast.error(response.message);
      }
      setIsSizeGrater(false);
    } else {
      setIsSizeGrater(true);
    }
  };
  console.log(bankProofSize);

  return (
    <section className="bg-light mb-4 pb-3 rounded-3">
      <GridCustom style={{ position: "relative" }}>
        <Row className="justify-content-md-end mb-4 ">
          <Col xs={12} md={12} style={{ textAlign: "right" }}>
            <input
              type="file"
              name="file"
              className="upload-image-btn"
              ref={divId}
              onChange={getImageHandeler}
              style={{ position: "relative" }}
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              <h6 className="pb-2 mb-0">
                Upload proof for {bankName} Bank Name
              </h6>
              <div>
                <button
                  type="button"
                  onClick={addProofHandeler}
                  className="btn btn-outline-success  btn-sm"
                >
                  Add Proof
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="proof-table-header">
              <div>Image Preview</div> <div>Image Name</div>
              <div>Image Size</div> <div>Proof Type</div>
              <div> Status</div> <div>Options</div>
            </div>
          </Col>
        </Row>

        {imagesList.length ? (
          imagesList?.map((image, index) => {
            return (
              <React.Fragment>
                <Row key={index}>
                  <Col xs={12}>
                    <div className="proof-table-row">
                      <div>
                        <img
                          src={image.path}
                          alt={image.name}
                          style={{ width: "80px" }}
                        />
                      </div>

                      <div>{image.name}</div>
                      <div>{(image.size / 1024).toFixed(2)} KB</div>
                      <div>{image.type}</div>
                      <div>
                        {isUploaded ? (
                          <span>
                            <BsCheckCircleFill
                              style={{ color: "green", fontSize: "21px" }}
                            />
                          </span>
                        ) : (
                          "Pending"
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        {!isUploaded ? (
                          <>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() =>
                                fileUploadHandeler(image.size + bankProofSize)
                              }
                              disabled={
                                image.size + bankProofSize > 500000
                                  ? true
                                  : false
                              }
                            >
                              Upload
                            </Button>

                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() =>
                                removeImgHandeler(image.id, image.size)
                              }
                            >
                              Remove
                            </Button>
                          </>
                        ) : (
                          "Uploaded"
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                {image.size + bankProofSize > 500000 ? (
                  <small
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      color: "red",
                    }}
                  >
                    Total uploaded images size are more than 500 KB
                  </small>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          })
        ) : (
          <Row>
            <Col xs={12}>
              <div className="no-image-found"> No image added</div>
            </Col>
          </Row>
        )}
      </GridCustom>
    </section>
  );
}

export default UploadSection;
