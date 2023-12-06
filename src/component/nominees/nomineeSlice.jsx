import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import nomineeAPI from './nomineeAPI';

const initialState = {
  nomineeObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  nomineeCountNum:1
};

export const createNomineeAsync = createAsyncThunk(
  'nominee/create',
  async (obj, thunkAPI) => {
    try {
      return await nomineeAPI.createNominee(obj);
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

export const getNomineeAsync = createAsyncThunk(
  'nominee/get',
  async (userId, thunkAPI) => {
    try {
      return await nomineeAPI.getNominee(userId);
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

export const updateNomineeAsync = createAsyncThunk(
  'nominee/update',
  async (obj, thunkAPI) => {
  
    try {
      return await nomineeAPI.updateNominee(obj);
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

export const deleteNomineeAsync = createAsyncThunk(
  'nominee/delete',
  async (id, thunkAPI) => {
    try {
      return await nomineeAPI.deleteNominee(id);
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

export const nomineeSlice = createSlice({
  name: 'nominee',
  initialState,
  reducers: {
    reset: (state) => {
      state.thirdHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    nomineeCountAction:(state,action) =>{
        state.nomineeCountNum= action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //POST can creteria form
      .addCase(createNomineeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNomineeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nomineeObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(createNomineeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //GET can creteria form
      .addCase(getNomineeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNomineeAsync.fulfilled, (state, action) => {
       
        state.isLoading = false;
        state.nomineeObj = action.payload;
        state.nomineeCountNum = action.payload.nomineeDetail?.length;
        state.isError = false;
        state.message = '';
      })
      .addCase(getNomineeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //UPDATE can creteria form
      .addCase(updateNomineeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNomineeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nomineeObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateNomineeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = nomineeSlice;

export const { reset, nomineeCountAction } = actions;
export default reducer;
