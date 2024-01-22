import React, { useState, useEffect } from 'react';
import { StepperContainer, StepperLine, Steps } from './CommonTab-style';
import Tab from './Tab';
import { useSelector, useDispatch } from 'react-redux';
//component
import { stepsList } from './Data';

import { tabUpdate } from '../../reducer/Reducer/tab/tabSlice';
// import useCommonReducer from "../customComp/useCommonReducer";

function Tabs() {
  const [tabs, setTabs] = useState([]);

  // const {  tabsCreater } = useCommonReducer();
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);
  const dispatch = useDispatch();

  useEffect(() => {
    let copyTab = tabsCreater.filter((tab) => tab.show === true);

    let currentTab = copyTab.slice(0, stepsCount + 1);

    let getVal = currentTab.map((val) => val.short);

    let heilightedTab = tabsCreater.map((tab) => {
      if (getVal.includes(tab.short)) {
        return { ...tab, active: true };
      }
      return { ...tab, active: false };
    });

    dispatch(tabUpdate(heilightedTab));
  }, [stepsCount]);

  useEffect(() => {
    setTabs(tabsCreater);
  }, [tabsCreater]);

  return (
    <React.Fragment>
      <StepperContainer>
        <StepperLine />
        <Steps>
          {tabs?.map((step, index) => {
            return <Tab key={step.short} step={step} count={index} />;
          })}
        </Steps>
      </StepperContainer>
    </React.Fragment>
  );
}

export default Tabs;
