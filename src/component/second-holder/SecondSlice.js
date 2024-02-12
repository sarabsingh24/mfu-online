import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  secondHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  taxResidency: 'N',
};



export const secondSlice = createSlice({
  name: 'second',
  initialState,
  reducers: {
    reset: (state) => {
      state.secondHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    changeTaxResidency: (state, action) => {
      state.taxResidency = action.payload;
    },
    deleteSecondHolderObj: (state, action) => {
      state.secondHolderObj = {};
    },

    createSecondHolderOBJ: (state, action) => {
      state.secondHolderObj = {
        holderType: 'PR',
        residencePhoneNo: '',
        relationship: '01',
        relationshipProof: '01',
        panExemptFlag: action.payload.panExemptFlag,
        panPekrnNo: action.payload.panPekrnNo,
        name: action.payload.name,
        dateOfBirth: action.payload.dateOfBirth,
        contactDetail: {
          primaryEmail: action.payload.contactDetail.primaryEmail,
          mobileIsdCode: action.payload.contactDetail.mobileIsdCode,
          primaryMobileNo: action.payload.contactDetail.primaryMobileNo,
        },
        otherDetail: {
          otherInfo: 'string',
          grossIncome: action.payload.otherDetail.grossIncome
            ? action.payload.otherDetail.grossIncome
            : '',
          netWorth: action.payload.otherDetail.netWorth
            ? action.payload.otherDetail.netWorth
            : '',
          netWorthDate: action.payload.otherDetail.netWorthDate
            ? action.payload.otherDetail.netWorthDate
            : '',
          sourceOfWealth: action.payload.otherDetail.sourceOfWealth,
          sourceOfWealthOthers: action.payload.otherDetail.sourceOfWealthOthers,
          occupation: action.payload.otherDetail.occupation,
          occupationOthers: action.payload.otherDetail.occupationOthers,
          kraAddressType: action.payload.otherDetail.kraAddressType,
          pep: action.payload.otherDetail.pep,
        },
        fatcaDetail: {
          taxResidencyFlag: action.payload.fatcaDetail.taxResidencyFlag,
          birthCity: action.payload.fatcaDetail.birthCity,
          birthCountry: action.payload.fatcaDetail.birthCountry,
          citizenshipCountry: action.payload.fatcaDetail.citizenshipCountry,
          nationalityCountry: action.payload.fatcaDetail.nationalityCountry,
          taxRecords: action.payload.fatcaDetail.taxRecords,
        },
      };
    },
  },
});

const { actions, reducer } = secondSlice;

export const {
  reset,
  createSecondHolderOBJ,
  changeTaxResidency,
  deleteSecondHolderObj,
} = actions;
export default reducer;
