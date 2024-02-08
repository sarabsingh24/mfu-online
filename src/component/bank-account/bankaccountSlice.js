import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bankAccountAPI from './bankAccountAPI';

const initialState = {
  bankAccountsObj: [],
  bankProofList:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  accountCountNum: 1,
};



export const getBankProofAsync = createAsyncThunk(
  'bankAccount/getproof',
  async (obj, thunkAPI) => {
    try {
      return await bankAccountAPI.getBankProof(obj);
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


export const createBankAccountAsync = createAsyncThunk(
  'bankAccount/create',
  async (obj, thunkAPI) => {
   
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

export const getBankAccountAsync = createAsyncThunk(
  'bankAccount/get',
  async (userId, thunkAPI) => {
    
    try {
      return await bankAccountAPI.getBankAccount(userId);
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

export const updateBankAccountAsync = createAsyncThunk(
  'bankAccount/update',
  async (obj, thunkAPI) => {
   
    try {
      return await bankAccountAPI.updateBankAccount(obj);
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
      state.bankAccountsObj = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    accountsFun: (state, action) => {
      state.accountCountNum = action.payload;
    },
    createBankAccountOBJ :(state, action)=>{
      console.log(action.payload)
      state.bankAccountsObj = action.payload;

    },
  },
  extraReducers: (builder) => {
    builder
      //create bank account
      .addCase(createBankAccountAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBankAccountAsync.fulfilled, (state, action) => {
        console.log('aa', action.payload);
        state.isLoading = false;
        state.bankAccountsObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(createBankAccountAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get bank account
      .addCase(getBankAccountAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBankAccountAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bankAccountsObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getBankAccountAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //update bank account
      .addCase(updateBankAccountAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBankAccountAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bankAccountsObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateBankAccountAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get bank proof
      .addCase(getBankProofAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBankProofAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bankProofList = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getBankProofAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = bankAccountSlice;

export const { reset, accountsFun, createBankAccountOBJ } = actions;
export default reducer;
