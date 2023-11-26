import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector,useDispatch } from 'react-redux';
import {getCriteriaFormAsync} from './component/can-criteria/canCriteriaSlice'


//
import Tabs from './common/tabs/Tabs';
import BankAccounts from './component/bank-account/BankAccounts';
import CanCriteria from './component/can-criteria/CanCriteria';
import GuardianHolder from './component/guardian-holder/GuardianHolder';
import Nominees from './component/nominees/Nominees';
import PrimaryHolder from './component/primary-holder/PrimaryHolder';
import ThirdHolder from './component/third-holder/ThirdHolder';
import ProofUpload from './component/proof-upload/ProofUpload';
import SecondHolder from './component/second-holder/SecondHolder';
import CheckNavigate from './common/check-navigate/CheckNavigate';

function App() {
  const methods = useForm();
  const { userId } = useSelector((state) => state.account);
  const dispatch = useDispatch();


  useEffect(() => {
    console.log(userId);
    dispatch(getCriteriaFormAsync(userId));
  }, [userId]);



 

  return (
    <React.Fragment>
      <Container>
        <FormProvider {...methods}>
          <Router>
            <Tabs />
            <CheckNavigate />
            <Routes>
              <Route
                path="/can-criteria"
                element={<CanCriteria methods={methods} />}
              />
              <Route
                path="/primary-holder"
                element={<PrimaryHolder methods={methods} />}
              />
              <Route path="/second-holder" element={<SecondHolder />} />
              <Route path="/third-holder" element={<ThirdHolder />} />
              <Route path="/guardian-holder" element={<GuardianHolder />} />
              <Route path="/bank-accounts" element={<BankAccounts />} />
              <Route path="/nominees" element={<Nominees />} />
              <Route path="/proof-upload" element={<ProofUpload />} />
            </Routes>
          </Router>
        </FormProvider>
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
