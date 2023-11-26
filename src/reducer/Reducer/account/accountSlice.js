import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountService from './accountService';

const initialState = {
  guardianHolderObj: {},
  bankAccountsObj: [],
  nomineeObj: {},
  proofUploadObj: [],
  account: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  userId:1
};

export const createAccount = createAsyncThunk(
  'account/create',
  async (data, thunkAPI) => {
    try {
      return await accountService.createAccount(data);
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

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    reset: (state) => {
      state.guardianHolderObj = {};
      state.bankAccountsObj = [];
      state.nomineeObj = {};
      state.proofUploadObj = [];
      state.account = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },

    guardianHolderForm: (state, action) => {
      state.guardianHolderObj = action.payload;
    },
    bankAccountForm: (state, action) => {
      state.bankAccountsObj = action.payload;
    },
    nomineesForm: (state, action) => {
      state.nomineeObj = action.payload;
    },
    proofUploadForm: (state, action) => {
      state.proofUploadObj = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        console.log('payload===', action.payload);
        console.log('can ===', action.payload.can);
        state.isLoading = false;
        state.isSuccess = true;
        state.canId = action.payload.can && action.payload.can;
        state.account.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.account= null
      });
  },
});

export const {
  reset,

  guardianHolderForm,
  bankAccountForm,
  nomineesForm,
  proofUploadForm,
} = accountSlice.actions;
export default accountSlice.reducer;
