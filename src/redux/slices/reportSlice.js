import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    isReportOpen: false,
  },
  reducers: {
    toggleOpenReport: (state, action) => {
      return {
        ...state,
        isReportOpen: action.payload,
      };
    },
  },
});

export const { toggleOpenReport } = reportSlice.actions;

export default reportSlice.reducer;
