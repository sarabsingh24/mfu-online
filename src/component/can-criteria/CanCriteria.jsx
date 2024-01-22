import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Style.css';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  createCanCriteriaAsync,
  updateCriteriaFormAsync,
} from './canCriteriaSlice';
import { Container } from 'react-bootstrap';

//component
import Tabs from '../../common/tabs/Tabs';
import ButtonCustomNew from '../../common/button/ButtonCustomNew';
import SelectOptionHook from '../../common/form-elements/SelectOptionHook';
import GridCustom from '../../common/grid-custom/GridCustom';
import Section from '../../common/section/Section';
import InputText from '../../common/form-elements/InputText';
import SelectOption from '../../common/form-elements/SelectOption';
import FooterSection from '../../common/footerSection/FooterSection';
import { btnHandeler } from '../../common/helper/Helper';

import { tabUpdate, pageCount } from '../../reducer/Reducer/tab/tabSlice';
import {
  criteriaForm,
  primeHolderForm,
  secondHolderForm,
  thirdHolderForm,
  guardianHolderForm,
  nomineesForm,
} from '../../reducer/Reducer/account/accountSlice';
import { validateForm } from './CanCriteriaValidation';
import {
  natureOptions,
  investorOptions,
  singleOptions,
  jointOptions,
  singleIndividualOptions,
  singleMinorOptions,
  singleSoleProprietorOptions,
  holderOptions,
} from './canCriteriaData';
import { createCanCriteria } from './canCriteriaSlice';

const defaultValue = {
  holdingNature: '',
  investorCategory: '',
  taxStatus: '',
  holderCount: '',
};

const errorFontStyle = {
  color: 'red',
  fontSize: '12px',
  height: '12px',
  display: 'block',
  marginBottom: '6px',
};

function CanCriteria() {
  const [form, setForm] = useState({});
  const [errorsOLD, setErrors] = useState({});
const [IsPan, setIsPan] = useState(false);
  const [taxList, setTaxList] = useState([]);
  const [investorList, setInvestorList] = useState([]);
  const [btnFun, setBtnFun] = useState({});
  const [selectHolderCount, setSelectHolderCount] = useState([
    {
      value: '0',
      label: '0',
    },
  ]);

  const { canCriteriaObj } = useSelector((state) => state.criteria);
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);
  // const { userId } = useSelector((state) => state.account);
  const { user, IslogedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  //  useFormPersist('form-name-canCriteria', { watch, setValue });

  const formHandeler = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    setForm({ ...form, [name]: val });
    // errors[name].message = '';

    // if (!!errorsOLD[name]) {
    //   setErrors({ ...errorsOLD, [name]: null });
    // }
  };

  const tabShoHideHandeler = (tabList, listName) => {
    let tabArray = ['CRI', 'PRIM', 'BANK', ...listName, 'PROO'];

    let updateArray = tabList.map((tab) => {
      if (tabArray.includes(tab.short)) {
        return { ...tab, show: true };
      }
      return { ...tab, show: false };
    });

    dispatch(tabUpdate(updateArray));
  };

  useEffect(() => {
    if (Object.keys(canCriteriaObj).length > 0) {
      setForm(canCriteriaObj);
    } else {
      setForm(defaultValue);
    }
  }, [canCriteriaObj]);

  useEffect(() => {
    tabShoHideHandeler(tabsCreater, ['NOMI']);
  }, []);

  useEffect(() => {
    if (form?.holdingNature === 'SI') {
      setInvestorList(singleOptions);
      tabShoHideHandeler(tabsCreater, ['NOMI']);
      setForm({
        ...form,
        holdingNature: form.holdingNature || '',
        investorCategory: form.investorCategory || '',
        holderCount: 1,
      });
      setSelectHolderCount([
        {
          value: '1',
          label: '1',
        },
      ]);
    } else if (form.holdingNature === 'JO') {
      setInvestorList(jointOptions);
      setTaxList(singleIndividualOptions);
      tabShoHideHandeler(tabsCreater, ['SEC', 'NOMI']);
      setForm({
        ...form,
        holdingNature: 'JO',
        investorCategory: form.investorCategory || '',
        holderCount:
          form.holderCount === ''
            ? 2
            : form.holderCount === 1
            ? 2
            : form.holderCount,
      });
      setSelectHolderCount([
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
      ]);
    } else if (form.holdingNature === 'AS') {
      setForm({ ...form, holdingNature: 'AS', investorCategory: 'I' });
      setInvestorList(jointOptions);
    } else {
      setInvestorList([]);
    }
  }, [form?.holdingNature]);

  useEffect(() => {
    if (form.investorCategory === 'I') {
      setTaxList(singleIndividualOptions);

      if (form.holdingNature === 'JO') {
        if (form.holderCount === '3') {
          tabShoHideHandeler(tabsCreater, ['SEC', 'THIR', 'NOMI']);
        }
        tabShoHideHandeler(tabsCreater, ['SEC', 'NOMI']);
      } else {
        tabShoHideHandeler(tabsCreater, ['NOMI']);
      }
    } else if (form.investorCategory === 'M') {
      setTaxList(singleMinorOptions);
      tabShoHideHandeler(tabsCreater, ['GUAR']);
      setForm({
        ...form,
        holdingNature: 'SI',
        // investorCategory: form.investorCategory || "",
        holderCount: form.holderCount === 1 ? 2 : 2,
      });
    } else if (form.investorCategory === 'S') {
      setTaxList(singleSoleProprietorOptions);
      tabShoHideHandeler(tabsCreater, ['NOMI']);
    } else {
      setTaxList([]);
    }
  }, [form?.investorCategory]);

  useEffect(() => {
    if (form.holderCount === '3') {
      if (form.holdingNature === 'SI' && form.investorCategory !== 'M') {
        setForm({
          ...form,
          holderCount: 1,
        });
        tabShoHideHandeler(tabsCreater, ['NOMI']);
      }
      if (form.holdingNature === 'JO' && form.investorCategory !== 'M') {
        setForm({
          ...form,
          holderCount: 3,
        });
        tabShoHideHandeler(tabsCreater, ['SEC', 'THIR', 'NOMI']);
      }

      if (form.investorCategory === 'M') {
        setForm({
          ...form,
          holderCount: 2,
        });
        tabShoHideHandeler(tabsCreater, ['GUAR']);
      }
    }
    if (form.holderCount === '2') {
      if (form.holdingNature === 'SI' && form.investorCategory !== 'M') {
        setForm({
          ...form,
          holderCount: 1,
        });
        tabShoHideHandeler(tabsCreater, ['NOMI']);
      }
      if (form.holdingNature === 'JO' && form.investorCategory !== 'M') {
        setForm({
          ...form,
          holderCount: 2,
        });
        tabShoHideHandeler(tabsCreater, ['SEC', 'NOMI']);
      }

      if (form.investorCategory === 'M') {
        setForm({
          ...form,
          holderCount: 2,
        });
        tabShoHideHandeler(tabsCreater, ['GUAR']);
      }
    }
    if (form.holderCount === '1') {
      if (form.holdingNature === 'JO' || form.investorCategory !== 'M') {
        tabShoHideHandeler(tabsCreater, ['SEC', 'NOMI']);
        setForm({
          ...form,
          holderCount: 2,
        });
      }
      if (form.investorCategory === 'M') {
        setForm({
          ...form,
          holderCount: 2,
        });
        tabShoHideHandeler(tabsCreater, ['GUAR']);
      }
    }
  }, [form?.holderCount]);

  const formSubmitHandeler = (data) => {
    console.log(data)
    dispatch(
      createCanCriteria({
        requestEvent: 'CR',
        holdingNature: data.holdingNature,
        investorCategory: data.investorCategory,
        taxStatus: data.taxStatus,
        holderCount: data.holderCount,
      })
    );

    dispatch(pageCount(stepsCount + 1));
  };

  return (
    <Container>
      <Tabs />
      <Form onSubmit={handleSubmit(formSubmitHandeler)}>
        <Section heading="Account Type">
          <GridCustom>
            <Row>
              <Col xs={12} md={6}>
                <SelectOptionHook
                  register={register}
                  name="holdingNature"
                  label="Holding Nature"
                  reqText="please select holding nature"
                  disabled={false}
                  mandatory="*"
                  errorBorder={errors?.holdingNature?.message}
                  listOptions={natureOptions}
                  value={form?.holdingNature || ''}
                  changeFun={formHandeler}
                />
                <small style={errorFontStyle}>
                  {errors?.holdingNature?.message}
                </small>
              </Col>
              <Col xs={12} md={6}>
                <SelectOptionHook
                  register={register}
                  name="investorCategory"
                  label="Investor Category"
                  reqText="please select investor category"
                  disabled={false}
                  mandatory="*"
                  errorBorder={errors?.investorCategory?.message}
                  listOptions={
                    investorList.length ? investorList : investorOptions
                  }
                  value={form?.investorCategory || ''}
                  changeFun={formHandeler}
                />
                <small style={errorFontStyle}>
                  {errors?.investorCategory?.message}
                </small>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <SelectOptionHook
                  register={register}
                  name="taxStatus"
                  label="Tax Status"
                  reqText="please select tax status"
                  disabled={false}
                  mandatory="*"
                  errorBorder={errors?.taxStatus?.message}
                  listOptions={
                    taxList.length ? taxList : singleIndividualOptions
                  }
                  value={form?.taxStatus || ''}
                  changeFun={formHandeler}
                />
                <small style={errorFontStyle}>
                  {errors?.taxStatus?.message}
                </small>
              </Col>
              <Col xs={12} md={6}>
                <SelectOptionHook
                  register={register}
                  name="holderCount"
                  label="Holders"
                  reqText="please select holders counts"
                  disabled={false}
                  mandatory="*"
                  errorBorder={errors?.holderCount?.message}
                  listOptions={selectHolderCount}
                  value={form?.holderCount || 1}
                  changeFun={formHandeler}
                />
              </Col>
            </Row>
          </GridCustom>
        </Section>
        <div className="button-container">
          <ButtonCustomNew text="next" />
        </div>
      </Form>
    </Container>
  );
}

export default CanCriteria;
