import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import criteriaAPI from './canCriteriaAPI';

const initialState = {
  canCriteriaObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
};



export const criteriaFormAsync = createAsyncThunk(
  'criteria/create',
  async (obj, thunkAPI) => {
    console.log('slice', obj);
    try {
      return await criteriaAPI.createCriteria(obj);
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


export const getCriteriaFormAsync = createAsyncThunk(
  'criteria/get',
  async (userId, thunkAPI) => {
   
    try {
      return await criteriaAPI.getCriteria(userId);
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

export const updateCriteriaFormAsync = createAsyncThunk(
  'criteria/update',
  async (obj, thunkAPI) => {

    console.log('slice',obj)
    try {
      return await criteriaAPI.updateCriteria(obj);
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


export const canCriteriaSlice = createSlice({
  name: 'criteria',
  initialState,
  reducers: {
    reset: (state) => {
      state.canCriteriaObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      //create can creteria form
      .addCase(criteriaFormAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(criteriaFormAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.canCriteriaObj = action.payload;
      })
      .addCase(criteriaFormAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get can creteria form
      .addCase(getCriteriaFormAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCriteriaFormAsync.fulfilled, (state, action) => {
       

        state.isLoading = false;
        state.canCriteriaObj = action.payload;
      })
      .addCase(getCriteriaFormAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //update can creteria form
      .addCase(updateCriteriaFormAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCriteriaFormAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.canCriteriaObj = action.payload;
      })
      .addCase(updateCriteriaFormAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

const {actions,reducer} =canCriteriaSlice

export const { reset } = actions;
export default reducer;
