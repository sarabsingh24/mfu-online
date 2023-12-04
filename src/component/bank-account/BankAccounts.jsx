import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Style.css';
import { useFormContext } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { useSelector, useDispatch } from 'react-redux';

//component

import Section from '../../common/section/Section';
import GridCustom from '../../common/grid-custom/GridCustom';
import SelectOption from '../../common/form-elements/SelectOption';
import SelectOptionHook from '../../common/form-elements/SelectOptionHook';
import { accountCount } from './accountData';
import BankAccountSection from './BankAccountSection';
import FooterSection from '../../common/footerSection/FooterSection';
import { btnHandeler } from '../../common/helper/Helper';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';
import { validateForm } from './BankAccountValidation';
import {
  createBankAccountAsync,
  updateBankAccountAsync,
} from './bankaccountSlice';

import { accountsFun } from './bankaccountSlice';

const bankRecord = {
  sequenceNo: '1',
  defaultAccountFlag: true,
  accountNo: '',
  accountType: '',
  bankId: '',
  micrCode: '',
  ifscCode: '',
  bankProof: '',
  reAccountNo: '',
};

function BankAccounts() {
  const [form, setForm] = useState([]);
  const [number, setNumber] = useState('0');
  const [btnFun, setBtnFun] = useState({});
  const [errorsOld, setErrors] = useState([]);
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);
  const { userId } = useSelector((state) => state.account);
  const [bankAccount, setBankAccount] = useState([]);

  const { accountCountNum, bankAccountsObj } = useSelector(
    (state) => state.bankAccount
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useFormContext();
  // useFormPersist('form-name-bankAccount', { watch, setValue });

  const numberHandeler = (e) => {
    let val = e.target.value;

    setNumber(val);
    dispatch(accountsFun(val));
  };

  const thisAccountHandeler = (e, num) => {
    let name = e.target.name;
    let value = e.target.value;
    let count = e.target.dataset.count;

    let newArray = form.map((obj) => {
      if (obj.sequenceNo === count) {
        return { ...obj, [name]: value };
      }
      return obj;
    });

    let newError = errorsOld.map((item, index) => {
      if (index + 1 === +count) {
        if (!!item[name]) {
          return { ...item, [name]: null };
        }
      }
      return item;
    });

    setErrors(newError);

    setForm(newArray);
  };

  useEffect(() => {
    // if (+number === 1) {
    //   setForm([...form.slice(0, 1)]);
    // }
    // if (+number === 2) {
    //   if (form.length > 2) {
    //     setForm([...form.slice(0, 2)]);
    //   } else {
    //     setForm([...form, { ...bankRecord, sequenceNo: '2' }]);
    //   }
    // }
    // if (+number === 3) {
    //   if (form.length === 2) {
    //     setForm([...form, { ...bankRecord, sequenceNo: '3' }]);
    //   } else {
    //     setForm([
    //       ...form,
    //       { ...bankRecord, sequenceNo: '2' },
    //       { ...bankRecord, sequenceNo: '3' },
    //     ]);
    //   }
    // }
  }, [number]);

  useEffect(() => {
    setBtnFun(btnHandeler(dispatch, pageCount, stepsCount));
  }, [dispatch, stepsCount]);

  useEffect(() => {
    if (Object.keys(bankAccountsObj).length) {
      setForm(bankAccountsObj);
    } 
  }, [bankAccountsObj]);

  const formSubmitHandeler = (data) => {
    let newObj = [];

    for (let k in data) {
      if (k.includes('Default')) {
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
    console.log(newObj);

    setBankAccount(newObj);

    if (bankAccountsObj?.userId) {
      dispatch(
        updateBankAccountAsync({
          accountDetails: [...newObj.slice(0, accountCountNum)],
          userId: userId,
        })
      );
    } else {
      dispatch(
        createBankAccountAsync({
          accountDetails: [...newObj.slice(0, accountCountNum)],
          userId: userId,
        })
      );
    }

    dispatch(pageCount(stepsCount + 1));
  };

  const backBtnHandeler = () => {
    dispatch(pageCount(stepsCount - 1));
  };

  useEffect(()=>{
    setValue(
      'accounts',
      bankAccountsObj.accountDetails.length 
    );
  },[])

  useEffect(() => {
    dispatch(accountsFun(bankAccountsObj.accountDetails.length));
  }, [bankAccountsObj.accountDetails.length]);




  return (
    <React.Fragment>
      <FooterSection
        backBtn={true}
        nextBtn={false}
        btnFun={btnFun}
        cls="btn-left-align"
      />
      <Form onSubmit={handleSubmit(formSubmitHandeler)}>
        <Section heading="Number of bank account">
          <GridCustom>
            <Row>
              <Col xs={12} md={4}>
                <SelectOptionHook
                  register={register}
                  name="accounts"
                  label="Bank Account(s)"
                  // reqText=""
                  disabled={false}
                  mandatory="*"
                  // errorBorder={errors?.holdingNature?.message}
                  listOptions={accountCount}
                  // value={form?.holdingNature || ''}
                  changeFun={numberHandeler}
                />
              </Col>
            </Row>
          </GridCustom>
        </Section>

        {Array.from({
          length:  accountCountNum,
        }).map((detail, index) => {
          return (
            <BankAccountSection
              key={index}
              formObj={bankAccountsObj.accountDetails[index]}
              setForm={setForm}
              count={index}
              thisAccountHandeler={thisAccountHandeler}
              errorsOld={errorsOld}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          );
        })}

        <button type="button" onClick={backBtnHandeler}>
          Back
        </button>
        <button type="submit">Next</button>

        <button
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
        {/* <FooterSection
          backBtn={true}
          nextBtn={true}
          btnFun={btnFun}
          cls="btn-right-align"
        />*/}
      </Form>
    </React.Fragment>
  );
}

export default BankAccounts;
