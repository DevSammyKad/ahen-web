import { createSlice } from "@reduxjs/toolkit";

const PracticeDrivingSlice = createSlice({
  name: "PracticeDriving",
  initialState: {
    practiceDrivingSearchText: "",
  },
  reducers: {
    setPracticeDrivingSearchText: (state, action) => {
      return {
        ...state,
        practiceDrivingSearchText: action.payload,
      };
    },
  },
});

export const { setPracticeDrivingSearchText } = PracticeDrivingSlice.actions;

export default PracticeDrivingSlice.reducer;
