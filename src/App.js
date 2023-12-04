import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getCriteriaFormAsync } from './component/can-criteria/canCriteriaSlice';
import { getPrimaryHolderAsync } from './component/primary-holder/primarySlice';
import { getSecondHolderAsync } from './component/second-holder/SecondSlice';
import { getThirdHolderAsync } from './component/third-holder/thirdSlice';
import { getBankAccountAsync } from './component/bank-account/bankaccountSlice';
import {getNomineeAsync} from './component/nominees/nomineeSlice'
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
    if (userId) {
      dispatch(getCriteriaFormAsync(userId));
      dispatch(getPrimaryHolderAsync(userId));
      dispatch(getSecondHolderAsync(userId));
      dispatch(getThirdHolderAsync(userId));
      dispatch(getBankAccountAsync(userId));
       dispatch(getNomineeAsync(userId));
    }
  }, []);

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
              <Route
                path="/second-holder"
                element={<SecondHolder methods={methods} />}
              />
              <Route
                path="/third-holder"
                element={<ThirdHolder methods={methods} />}
              />
              <Route path="/guardian-holder" element={<GuardianHolder />} />
              <Route
                path="/bank-accounts"
                element={<BankAccounts methods={methods} />}
              />
              <Route
                path="/nominees"
                element={<Nominees methods={methods} />}
              />
              <Route path="/proof-upload" element={<ProofUpload methods={methods}/>} />
            </Routes>
          </Router>
        </FormProvider>
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
