import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import primaryAPI from './primaryAPI';

const initialState = {
  primeHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  taxResidency:'N',
  
};

export const createPrimaryHolderAsync = createAsyncThunk(
  'primary/create',
  async (obj, thunkAPI) => {
    try {
      return await primaryAPI.createPrimaryHolder(obj);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPrimaryHolderAsync = createAsyncThunk(
  'primary/get',
  async (userId, thunkAPI) => {
    try {
      return await primaryAPI.getPrimaryHolder(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePrimaryHolderAsync = createAsyncThunk(
  'primary/update',
  async (obj, thunkAPI) => {
    try {
      return await primaryAPI.updatePrimaryHolder(obj);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const primarySlice = createSlice({
  name: 'primary',
  initialState,
  reducers: {
    reset: (state) => {
      state.primeHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    changeTaxResidency: (state, action) => {
      state.taxResidency = action.payload;
    },
   
    createPrimaryHolderOBJ: (state, action) => {
      console.log(action.payload.fatcaDetail.taxRecords);
      state.primeHolderObj = {
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
          // taxRecords: {
          //   taxCountry: action.payload.fatcaDetail.taxRecords.taxCountry,
          //   taxReferenceNo:
          //     action.payload.fatcaDetail.taxRecords.taxReferenceNo,
          //   identityType: action.payload.fatcaDetail.taxRecords.identityType,
          // }
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      //create primary form
      .addCase(createPrimaryHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPrimaryHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.primeHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(createPrimaryHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get primary form
      .addCase(getPrimaryHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrimaryHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.primeHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getPrimaryHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //update primary form
      .addCase(updatePrimaryHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePrimaryHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.primeHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updatePrimaryHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = primarySlice;
export const { reset, createPrimaryHolderOBJ, changeTaxResidency } = actions;
export default reducer;
