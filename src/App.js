import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getCriteriaFormAsync } from './component/can-criteria/canCriteriaSlice';
import { getPrimaryHolderAsync } from './component/primary-holder/primarySlice';
import { getSecondHolderAsync } from './component/second-holder/SecondSlice';
import { getThirdHolderAsync } from './component/third-holder/thirdSlice';
import { getBankAccountAsync } from './component/bank-account/bankaccountSlice';
import { getNomineeAsync } from './component/nominees/nomineeSlice';
import { getGuardianHolderAsync } from './component/guardian-holder/gurdianSlice';
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
import LoginScreen from './component/auth/LoginScreen';
import Register from './component/auth/Register';
import HeaderSection from './common/header/HeaderSection';
import Protected from './component/auth/Protected';
import { tabUpdate, pageCount } from './reducer/Reducer/tab/tabSlice';


function App() {
  const methods = useForm();
  const { userId } = useSelector((state) => state.account);
  const { IslogedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getCriteriaFormAsync(userId));
      dispatch(getPrimaryHolderAsync(userId));
      dispatch(getSecondHolderAsync(userId));
      dispatch(getThirdHolderAsync(userId));
      dispatch(getBankAccountAsync(userId));
      dispatch(getNomineeAsync(userId));
      dispatch(getGuardianHolderAsync(userId));
    }

  }, []);

  console.log(IslogedIn);

  return (
    <React.Fragment>
      <Container>
        <FormProvider {...methods}>
          <Router>
            {/* <HeaderSection /> */}

            {userId && <CheckNavigate />}

            <Routes>
              <Route path="/signin" element={<LoginScreen />} />
              <Route path="/signup" element={<Register />} />
              <Route
                path="/can-criteria"
                element={
                  <Protected>
                    <CanCriteria methods={methods} />
                  </Protected>
                }
              />
              <Route
                path="/primary-holder"
                element={
                  <Protected>
                    <PrimaryHolder methods={methods} />
                  </Protected>
                }
              />
              <Route
                path="/second-holder"
                element={
                  <Protected>
                    <SecondHolder methods={methods} />
                  </Protected>
                }
              />
              <Route
                path="/third-holder"
                element={
                  <Protected>
                    <ThirdHolder methods={methods} />
                  </Protected>
                }
              />
              <Route
                path="/guardian-holder"
                element={
                  <Protected>
                    <GuardianHolder methods={methods} />
                  </Protected>
                }
              />
              <Route
                path="/bank-accounts"
                element={
                  <Protected>
                    <BankAccounts methods={methods} />
                  </Protected>
                }
              />
              <Route
                path="/nominees"
                element={
                  <Protected>
                    <Nominees methods={methods} />{' '}
                  </Protected>
                }
              />
              <Route
                path="/proof-upload"
                element={
                  <Protected>
                    <ProofUpload methods={methods} />
                  </Protected>
                }
              />
            </Routes>
          </Router>
        </FormProvider>
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
