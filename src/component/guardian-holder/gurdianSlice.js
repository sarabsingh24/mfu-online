import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import guardianAPI from './guardianAPI';

const initialState = {
  guardianHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
};

export const createGuardianHolderAsync = createAsyncThunk(
  'guardian/create',
  async (obj, thunkAPI) => {
    try {
      return await guardianAPI.createGuardianHolder(obj);
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

export const getGuardianHolderAsync = createAsyncThunk(
  'guardian/get',
  async (userId, thunkAPI) => {
    try {
      return await guardianAPI.getGuardianHolder(userId);
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

export const updateGuardianHolderAsync = createAsyncThunk(
  'guardian/update',
  async (obj, thunkAPI) => {
    try {
      return await guardianAPI.updateGuardianHolder(obj);
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

export const deleteGuardianHolderAsync = createAsyncThunk(
  'second/delete',
  async (id, thunkAPI) => {
    try {
      return await guardianAPI.deleteGuardianHolder(id);
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

export const guardianSlice = createSlice({
  name: 'guardian',
  initialState,
  reducers: {
    reset: (state) => {
      state.guardianHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      //create guardian form
      .addCase(createGuardianHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGuardianHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardianHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(createGuardianHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get guardian form
      .addCase(getGuardianHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGuardianHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardianHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getGuardianHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //update guardian form
      .addCase(updateGuardianHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGuardianHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardianHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateGuardianHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //DELETE guardian form
      .addCase(deleteGuardianHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGuardianHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guardianHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(deleteGuardianHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = guardianSlice;

export const { reset } = actions;
export default reducer;
