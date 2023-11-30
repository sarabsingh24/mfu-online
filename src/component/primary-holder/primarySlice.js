import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import primaryAPI from './primaryAPI';

const initialState = {
  primeHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
};

export const createPrimaryHolderAsync = createAsyncThunk(
  'primary/create',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
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
        state.message=''; 
      })
      .addCase(updatePrimaryHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = primarySlice;

export const { reset } = actions;
export default reducer;
