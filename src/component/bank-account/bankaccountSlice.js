import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bankAccountAPI from './bankAccountAPI';

const initialState = {
  bankAccountsObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  accountCountNum: 1,
};

export const bankAccountFormAsync = createAsyncThunk(
  'bankAccount/create',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
    try {
      return await bankAccountAPI.createBankAccount(obj);
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

export const bankAccountSlice = createSlice({
  name: 'bankAccount',
  initialState,
  reducers: {
    reset: (state) => {
      state.bankAccountsObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    accountsFun: (state, action) => {
      console.log('slice', action.payload);
      state.accountCountNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //push can creteria form
      .addCase(bankAccountFormAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bankAccountFormAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bankAccountsObj = action.payload;
      })
      .addCase(bankAccountFormAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = bankAccountSlice;

export const { reset, accountsFun } = actions;
export default reducer;
