import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function CheckNavigate() {
  const [str, setStr] = useState(null);
  const [displayedTab, setDisplayedTab] = useState([]);

  const navigate = useNavigate();

  const { stepsCount, tabsCreater, openForm } = useSelector(
    (state) => state.tab
  );
 
  const location = useLocation();
  useEffect(() => {
    let filterTabs = tabsCreater.filter((tab) => tab.show === true);
    let currTabs = filterTabs.map((tab) => tab.short);

    setDisplayedTab(currTabs);
  }, [tabsCreater]);

  useEffect(() => {
   
    let displaySection = displayedTab[stepsCount];
    setStr(displaySection);
  }, [displayedTab, stepsCount, tabsCreater]);

  useEffect(() => {
    
    if (str === 'CRI' || openForm === 'CRI') {
      navigate('/can-criteria');
    }
    if (str === 'PRIM' ) {
      navigate('primary-holder');
    }
    if (str === 'SEC' ) {
      navigate('second-holder');
    }
    if (str === 'THIR' ) {
      navigate('third-holder');
    }
    if (str === 'GUAR' ) {
      navigate('guardian-holder');
    }
    if (str === 'BANK' ) {
      navigate('bank-accounts');
    }
    if (str === 'NOMI' ) {
      navigate('nominees');
    }
    if (str === 'PROO' ) {
      navigate('proof-upload');
    }
   
  }, [str, navigate]);

  return <>{!str && <div>Loading...</div>}</>;
}

export default CheckNavigate;
