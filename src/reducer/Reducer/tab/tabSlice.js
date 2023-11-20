import { createSlice } from "@reduxjs/toolkit";
import { stepsList } from "../../../common/tabs/Data";

const initialState = {
  tabsCreater: stepsList,
  stepsCount: 0,
  openForm: "CRI",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    reset: (state) => {
      state.tabsCreater = stepsList;
      state.statestepsCount = 0;
      state.stateopenForm = "CRI";
    },
    tabUpdate: (state, action) => {
      state.tabsCreater = action.payload;
    },
    pageCount: (state, action) => {
      state.stepsCount = action.payload;
    },
    nextSection: (state, action) => {
      state.openForm = action.payload;
    },
  },
});


export const {
  reset,
  tabUpdate,
  pageCount,
  nextSection,
} = tabSlice.actions;
export default tabSlice.reducer;