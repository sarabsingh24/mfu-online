import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import proofAPI from './proofAPI';

const initialState = {
  proofUploadObj: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

};

export const createProofDataAsync = createAsyncThunk(
  'proof/create',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
    try {
      return await proofAPI.createProofData(obj);
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

export const getProofDataAsync = createAsyncThunk(
  'proof/get',
  async (userId, thunkAPI) => {
    try {
      return await proofAPI.getProofData(userId);
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

export const updateProofDataAsync = createAsyncThunk(
  'proof/update',
  async (obj, thunkAPI) => {
    try {
      return await proofAPI.updateProofData(obj);
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

export const proofSlice = createSlice({
  name: 'proof',
  initialState,
  reducers: {
    reset: (state) => {
      state.proofUploadObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      //create primary form
      .addCase(createProofDataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProofDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.proofUploadObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(createProofDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get primary form
      .addCase(getProofDataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProofDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.proofUploadObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getProofDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //update primary form
      .addCase(updateProofDataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProofDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.proofUploadObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateProofDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = proofSlice;

export const { reset } = actions;
export default reducer;
