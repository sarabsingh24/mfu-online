import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tabReducer from "./Reducer/tab/tabSlice";
import accountReducer from "./Reducer/account/accountSlice";
import criteriaReducer from "../component/can-criteria/canCriteriaSlice"
import primaryReducer from '../component/primary-holder/primarySlice'
import secondSlice from '../component/second-holder/SecondSlice'
import thirdReducer from '../component/third-holder/thirdSlice'
import bankAccountReducer from '../component/bank-account/bankaccountSlice'
import nomineeObj from '../component/nominees/nomineeSlice'
import proofReducer from '../component/proof-upload/proofSlice'
import guardianReducer from '../component/guardian-holder/gurdianSlice'
import authReducer from '../component/auth/authSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  user:authReducer,
  tab: tabReducer,
  // account: accountReducer,
  criteria: criteriaReducer,
  primary: primaryReducer,
  second: secondSlice,
  third: thirdReducer,
  bankAccount: bankAccountReducer,
  guardian:guardianReducer,
  nominee: nomineeObj,
  proof: proofReducer,

});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export const store = configureStore({
//   reducer: {
//     tab: tabReducer,
//     account: accountSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

