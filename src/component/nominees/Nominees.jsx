import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
// component
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import SelectOptionHook from '../../common/form-elements/SelectOptionHook';
import GridCustom from '../../common/grid-custom/GridCustom';
import Section from '../../common/section/Section';
import SelectOption from '../../common/form-elements/SelectOption';
import FooterSection from '../../common/footerSection/FooterSection';
import { btnHandeler } from '../../common/helper/Helper';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';

import AddNominee from './AddNominee';
import { validateForm } from './NomineeValidation';
import { nomineesForm } from '../../reducer/Reducer/account/accountSlice';
import {
  nomineeCountAction,
  createNomineeAsync,
  updateNomineeAsync,
} from '../nominees/nomineeSlice';

const nomineeOption = [
  { value: 'N', label: 'No - I/We declare to Opt out' },
  { value: 'Y', label: 'Yes - I/We wish to nominate' },
];

const errorFontStyle = {
  color: 'red',
  fontSize: '12px',
  height: '12px',
  display: 'block',
};

const nomineeCompObj = {
  sequenceNo: '1',
  nomineeName: '',
  relation: '',
  percentage: '',
  dateOfBirth: '',
  // nomineeGuardianName: "",
  // nomineeGuardianRelation: "",
  // nomineeGuardianDob: "",
};

export default function Nominees() {
  const [form, setForm] = useState([]);
  const [btnFun, setBtnFun] = useState({});
  const [number, setNumber] = useState('0');
  const [nomineeSelected, setNomineeSelected] = useState('');

  const [isNominee, setIsNominee] = useState(false);
  const [errorsOLD, setErrors] = useState([]);
  const [percentSts, setpercentSts] = useState(false);

  const { nomineeObj, nomineeCountNum } = useSelector((state) => state.nominee);
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);
  const { userId } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const numberHandeler = (e) => {
    let val = e.target.value;
    console.log(val);
    setNumber(val);
    dispatch(nomineeCountAction(val));
  };
  const formHandeler = (e) => {
    let val = e.target.value;

    if (val !== 'N') {
      setValue('nomineeOptedFlag', 'Y');
      setForm([nomineeCompObj]);
      dispatch(nomineeCountAction(1));
      setIsNominee(true);
    } else {
      setValue('nomineeOptedFlag', 'N');
      setIsNominee(false);
      dispatch(
        updateNomineeAsync({
          ...nomineeObj,
          nomineeOption: 'N',
          nomineeDetail: [],
        })
      );
      dispatch(nomineesForm([]));
      setForm([]);
      // setNumber(0);
    }
  };

  // const newFun = (name, count) => {
  //   let newError = errorsOLD.map((item, index) => {
  //     if (index + 1 === +count) {
  //       if (!!item[name]) {
  //         // console.log("ggg");
  //         return { ...item, [name]: null };
  //       }
  //     }
  //     return item;
  //   });
  //   setErrors(newError);
  // };

  // const thisAccountHandeler = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   let count = e.target.dataset.count;

  //   let newArray = form.map((obj) => {
  //     if (obj.sequenceNo === count) {
  //       newFun(name, count);
  //       return { ...obj, [name]: value };
  //     }
  //     return obj;
  //   });

  //   setForm(newArray);
  // };

  // useEffect(() => {

  //   if (+number === 1) {
  //     setForm([...form.slice(0, 1)]);
  //   }
  //   if (+number === 2) {
  //     if (form.length > 2) {
  //       setForm([...form.slice(0, 2)]);
  //     } else {
  //       setForm([...form, { ...nomineeCompObj, sequenceNo: '2' }]);
  //     }
  //   }
  //   if (+number === 3) {
  //     if (form.length === 2) {
  //       setForm([...form, { ...nomineeCompObj, sequenceNo: '3' }]);
  //     } else {
  //       setForm([
  //         ...form,
  //         { ...nomineeCompObj, sequenceNo: '2' },
  //         { ...nomineeCompObj, sequenceNo: '3' },
  //       ]);
  //     }
  //   }
  // }, [number]);

  const formSubmitHandeler = (data) => {
    let newObj = [];

    for (let k in data) {
      if (k.includes('First')) {
        let lab = k.split('-')[1];
        newObj[0] = { ...newObj[0], [lab]: data[k] };
      }

      if (k.includes('Second')) {
        let lab = k.split('-')[1];
        newObj[1] = { ...newObj[1], [lab]: data[k] };
      }
      if (k.includes('Third')) {
        let lab = k.split('-')[1];
        newObj[2] = { ...newObj[2], [lab]: data[k] };
      }
    }

    const checkPercentage = newObj
      .slice(0, nomineeCountNum)
      .reduce((total, current) => {
        total += +current.percentage;
        return total;
      }, 0);

    console.log(newObj.slice(0, nomineeCountNum));
    if (checkPercentage === 100) {
      if (nomineeObj.userId) {
        dispatch(
          updateNomineeAsync({
            nomineeOption: data.nomineeOptedFlag,
            nomineeDetail: newObj.slice(0, nomineeCountNum),
            userId: userId,
          })
        );
      } else {
        dispatch(
          createNomineeAsync({
            nomineeOption: data.nomineeOptedFlag,
            nomineeDetail: newObj.slice(0, nomineeCountNum),
            userId: userId,
          })
        );
      }
      setpercentSts(false);
      dispatch(pageCount(stepsCount + 1));
    } else {
      setpercentSts(true);
    }

    // const formErrors = validateForm(form, nomineeSelected);
    // const account = (e) => {
    //   if (!Object.keys(e).length) {
    //     return true;
    //   }
    //   return false;
    // };
    // let isAccount = formErrors.every(account);

    // if (!isAccount) {
    //   // alert("error");
    //   setErrors(formErrors);
    // } else {
    //   // alert("success");

    //   let obj = {
    //     nomineeOptedFlag: nomineeSelected,
    //     nomineeRecords: form,
    //   };

    // dispatch(nomineesForm(obj));

    // }
  };

  useEffect(() => {
    setBtnFun(btnHandeler(dispatch, pageCount, stepsCount));
  }, [dispatch, stepsCount]);

  useEffect(() => {
    if (nomineeObj.userId) {
      setValue('nomineeOptedFlag', nomineeObj.nomineeOptedFlag);
      // setNomineeSelected(nomineeObj.nomineeOptedFlag === 'N' ? 'N' : 'Y');
      setIsNominee(nomineeObj.nomineeOptedFlag === 'N' ? false : true);
      setForm(nomineeObj.nomineeRecords);
    } else {
      setValue('nomineeOptedFlag', 'N');
      setNumber('0');
      setIsNominee(false);
      setForm([]);
    }
  }, [nomineeObj]);

  useEffect(() => {
    console.log(nomineeObj.nomineeDetail);
    setValue(
      'nomineeCount',
      nomineeObj.nomineeDetail.length || nomineeCountNum
    );
    setValue(
      'nomineeOptedFlag',
      nomineeObj?.nomineeOptedFlag === 'N' ? 'N' : 'Y'
    );
  }, [nomineeObj]);

  const backBtnHandeler = () => {
    dispatch(pageCount(stepsCount - 1));
  };

  

  return (
    <React.Fragment>
      <ButtonCustomNew backFun={backBtnHandeler} />

      <Form onSubmit={handleSubmit(formSubmitHandeler)}>
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
                <SelectOptionHook
                  register={register}
                  name="nomineeOptedFlag"
                  label="Nomination Option "
                  reqText="Nomination Option required"
                  disabled={false}
                  mandatory="*"
                  errorBorder={errors.nomineeOptedFlag?.message}
                  listOptions={nomineeOption}
                  // value={form?.fatcaDetail?.taxResidencyFlag || ''}
                  changeFun={formHandeler}
                />
                <small style={errorFontStyle}>
                  {errors.nomineeOptedFlag?.message}
                </small>
                {/* <SelectOption
                  name="nomineeOptedFlag"
                  label="Nomination Option"
                  // value={nomineeSelected}
                  // option={form?.length ? nominee[1] : nominee}
                  options={nomineeOption}
                  changeFun={formHandeler}
                  mandatory="*"
                /> */}
              </Col>
              <Col xs={12} md={3}>
                {isNominee && (
                  <SelectOption
                    name="nomineeCount"
                    label="No. of Nominee"
                    value={nomineeCountNum}
                    options={[
                      { value: '1', label: '1' },
                      { value: '2', label: '2' },
                      { value: '3', label: '3' },
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
          Array.from({
            length: nomineeCountNum,
          }).map((detail, index) => {
            return (
              <AddNominee
                key={`${index}v`}
                register={register}
                formObj={nomineeObj?.nomineeDetail[index]}
                setForm={setForm}
                count={index}
                // thisAccountHandeler={thisAccountHandeler}
                percentSts={percentSts}
                errors={errors}
                setValue={setValue}
              />
            );
          })}
        <ButtonCustomNew backFun={backBtnHandeler} />
        <ButtonCustomNew text="next" />
      </Form>
    </React.Fragment>
  );
}
