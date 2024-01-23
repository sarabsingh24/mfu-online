import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import thirdAPI from './thirdAPI';

const initialState = {
  thirdHolderObj: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  canId: '',
  taxResidency: 'N',
};

export const createThirdHolderAsync = createAsyncThunk(
  'third/create',
  async (obj, thunkAPI) => {
    
    try {
      return await thirdAPI.createThirdHolder(obj);
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

export const getThirdHolderAsync = createAsyncThunk(
  'third/get',
  async (userId, thunkAPI) => {
    try {
      return await thirdAPI.getThirdHolder(userId);
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

export const updateThirdHolderAsync = createAsyncThunk(
  'third/update',
  async (obj, thunkAPI) => {
    try {
      return await thirdAPI.updateThirdHolder(obj);
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

export const deleteThirdHolderAsync = createAsyncThunk(
  'third/delete',
  async (id, thunkAPI) => {
    try {
      return await thirdAPI.deleteThirdHolder(id);
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

export const thirdSlice = createSlice({
  name: 'third',
  initialState,
  reducers: {
    reset: (state) => {
      state.thirdHolderObj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    changeTaxResidency: (state, action) => {
      state.taxResidency = action.payload;
    },
    createThirdHolderOBJ: (state, action) => {
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
          taxRecords: {
            taxCountry: action.payload.fatcaDetail.taxRecords.taxCountry,
            taxReferenceNo:
              action.payload.fatcaDetail.taxRecords.taxReferenceNo,
            identityType: action.payload.fatcaDetail.taxRecords.identityType,
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      //POST can creteria form
      .addCase(createThirdHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createThirdHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.thirdHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(createThirdHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //GET can creteria form
      .addCase(getThirdHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getThirdHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.thirdHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(getThirdHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //UPDATE can creteria form
      .addCase(updateThirdHolderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateThirdHolderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.thirdHolderObj = action.payload;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateThirdHolderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    //DELETE can creteria form
    // .addCase(deleteThirdHolderAsync.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(deleteThirdHolderAsync.fulfilled, (state, action) => {
    //   console.log('third slice',action.payload)
    //   state.isLoading = false;

    //   state.isError = false;
    //   state.message = action.payload;
    // })
    // .addCase(deleteThirdHolderAsync.rejected, (state, action) => {
    //   console.log('third slice', action.payload);
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

const { actions, reducer } = thirdSlice;

export const { reset, createThirdHolderOBJ, changeTaxResidency } = actions;
export default reducer;
