import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

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

import { tabUpdate, pageCount } from './reducer/Reducer/tab/tabSlice';


function App() {
  const methods = useForm();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Router>
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
            <Route
              path="/guardian-holder"
              element={<GuardianHolder methods={methods} />}
            />
            <Route
              path="/bank-accounts"
              element={<BankAccounts methods={methods} />}
            />
            <Route path="/nominees" element={<Nominees methods={methods} />} />
            <Route
              path="/proof-upload"
              element={<ProofUpload methods={methods} />}
            />
          </Routes>
        </Router>
      </FormProvider>

      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
