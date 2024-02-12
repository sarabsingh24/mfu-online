import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Style.css';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

//component
import Tabs from '../../common/tabs/Tabs';
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import Section from '../../common/section/Section';
import GridCustom from '../../common/grid-custom/GridCustom';
import SelectOption from '../../common/form-elements/SelectOption';
import SelectOptionHook from '../../common/form-elements/SelectOptionHook';
import { accountCount } from './accountData';
import BankAccountSection from './BankAccountSection';
import FooterSection from '../../common/footerSection/FooterSection';
import { btnHandeler } from '../../common/helper/Helper';
import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';

import {
  accountsFun,
  createBankAccountOBJ,
  getBankProofAsync,
} from './bankaccountSlice';

const bankRecord = [
  {
    sequenceNo: '1',
    defaultAccountFlag: true,
    accountNo: '',
    accountType: '',
    bankId: '',
    micrCode: '',
    ifscCode: '',
    bankProof: '',
    reAccountNo: '',
  },
];

function BankAccounts() {
  const [form, setForm] = useState([]);
  const [number, setNumber] = useState(1);
  const [btnFun, setBtnFun] = useState({});
  const [errorsOld, setErrors] = useState([]);
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);

  const [bankAccount, setBankAccount] = useState([]);

  const { accountCountNum, bankAccountsObj, bankProofList } = useSelector(
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

    console.log(val);
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
    dispatch(getBankProofAsync());
  }, []);

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

  const formSubmitHandeler = (data) => {
    // console.log("data bank acount", data)
    let newObj = [];

    for (let k in data) {
      if (k.includes('Default')) {
        let lab = k.split('-')[1];
        newObj[0] = {
          ...newObj[0],
          sequenceNo: 1,
          defaultAccountFlag: 'Y',
          [lab]: data[k],
        };
      }

      if (k.includes('Second')) {
        let lab = k.split('-')[1];
        newObj[1] = {
          ...newObj[1],
          sequenceNo: 2,
          defaultAccountFlag: 'N',
          [lab]: data[k],
        };
      }
      if (k.includes('Third')) {
        let lab = k.split('-')[1];
        newObj[2] = {
          ...newObj[2],
          sequenceNo: 3,
          defaultAccountFlag: 'N',
          [lab]: data[k],
        };
      }
    }
    // console.log('bank account',newObj);

    setBankAccount(newObj);

    dispatch(createBankAccountOBJ(newObj.slice(0, number)));

    dispatch(pageCount(stepsCount + 1));
  };

  useEffect(() => {
    setValue('accounts', bankAccountsObj?.length || bankRecord?.length);
  }, []);

  useEffect(() => {
    dispatch(accountsFun(bankAccountsObj?.length));
    if (bankAccountsObj.length > 0) {
      dispatch(accountsFun(1));
    }

    setNumber(bankAccountsObj?.length || 1);
  }, [bankAccountsObj?.length]);

  const backBtnHandeler = () => {
    dispatch(pageCount(stepsCount - 1));
  };

  // console.log(bankProofList);

  return (
    <Container>
      <Tabs />

      <ButtonCustomNew backFun={backBtnHandeler} />
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
          length: number,
        }).map((detail, index) => {
          return (
            <BankAccountSection
              key={index}
              formObj={bankAccountsObj[index] || bankRecord[index]}
              setForm={setForm}
              count={index}
              thisAccountHandeler={thisAccountHandeler}
              errorsOld={errorsOld}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              bankProof={bankProofList}
            />
          );
        })}
        <div className="button-container">
          <ButtonCustomNew backFun={backBtnHandeler} />
          <ButtonCustomNew text="next" />
        </div>
      </Form>
    </Container>
  );
}

export default BankAccounts;
