import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { Container } from 'react-bootstrap';
// component
import Tabs from '../../common/tabs/Tabs';
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import SelectOptionHook from '../../common/form-elements/SelectOptionHook';
import GridCustom from '../../common/grid-custom/GridCustom';
import Section from '../../common/section/Section';
import SelectOption from '../../common/form-elements/SelectOption';
import FooterSection from '../../common/footerSection/FooterSection';
import { btnHandeler } from '../../common/helper/Helper';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';

import AddNominee from './AddNominee';


import {
  nomineeCountAction,

  createNomineeOBJ,
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
  // const { userId } = useSelector((state) => state.account);

  // const { user, IslogedIn } = useSelector((state) => state.user);
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
      // setNumber(1);
      setIsNominee(true);
    } else {
      setValue('nomineeOptedFlag', 'N');
      setIsNominee(false);
    
      setForm([]);
      
    }
  };

  

  const formSubmitHandeler = (data) => {
    let newObj = [];

    for (let k in data) {
      if (k.includes('1st')) {
        let lab = k.split('-')[1];
        newObj[0] = { ...newObj[0], sequenceNo: 1, [lab]: data[k] };
      }

      if (k.includes('2nd')) {
        let lab = k.split('-')[1];
        newObj[1] = { ...newObj[1], sequenceNo: 2, [lab]: data[k] };
      }
      if (k.includes('3rd')) {
        let lab = k.split('-')[1];
        newObj[2] = { ...newObj[2], sequenceNo: 3, [lab]: data[k] };
      }
    }

    const checkPercentage = newObj
      .slice(0, nomineeCountNum)
      .reduce((total, current) => {
        total += +current.percentage;
        return total;
      }, 0);

    console.log('nominee', newObj);
    if (isNominee) {
      if (checkPercentage === 100) {
        dispatch(
          createNomineeOBJ({
            nomineeOptedFlag: data.nomineeOptedFlag,
            nomineeDetail: newObj.slice(0, nomineeCountNum),
          })
        );
        setpercentSts(false);
        dispatch(pageCount(stepsCount + 1));
      } else {
        setpercentSts(true);
      }
    } else {
      dispatch(
        createNomineeOBJ({
          nomineeOptedFlag: 'N',
          nomineeDetail: [],
        })
      );
      setpercentSts(false);
      dispatch(pageCount(stepsCount + 1));
    }
  };

  useEffect(() => {
    setBtnFun(btnHandeler(dispatch, pageCount, stepsCount));
  }, [dispatch, stepsCount]);

  useEffect(() => {
    setValue('nomineeOptedFlag', nomineeObj.nomineeOptedFlag);
    // setNomineeSelected(nomineeObj.nomineeOptedFlag === 'N' ? 'N' : 'Y');
    setIsNominee(nomineeObj.nomineeOptedFlag === 'N' ? false : true);
    setForm(nomineeObj.nomineeRecords);

    // console.log(nomineeObj.nomineeDetail);
    // console.log(nomineeObj?.nomineeOptedFlag);

    setValue(
      'nomineeCount',
      nomineeObj?.nomineeDetail?.length || nomineeCountNum
    );
    setValue(
      'nomineeOptedFlag',
      nomineeObj?.nomineeOptedFlag === 'N' ? 'N' : 'Y'
    );
  }, []);

  const backBtnHandeler = () => {
    dispatch(pageCount(stepsCount - 1));
  };

  return (
    <Container>
      <Tabs />

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
                formObj={
                  Object.keys(nomineeObj).length > 0
                    ? nomineeObj?.nomineeDetail[index]
                    : nomineeCompObj
                }
                setForm={setForm}
                count={index}
                // thisAccountHandeler={thisAccountHandeler}
                percentSts={percentSts}
                errors={errors}
                setValue={setValue}
              />
            );
          })}
        <div className="button-container">
          <ButtonCustomNew backFun={backBtnHandeler} />
          <ButtonCustomNew text="Submit" />
        </div>
      </Form>
    </Container>
  );
}
