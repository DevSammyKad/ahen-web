import { createSlice } from '@reduxjs/toolkit';

const NotificationSlice = createSlice({
  name: 'Notification',
  initialState: {
    isNotificationOpen: false,
  },
  reducers: {
    toggleOpenNotification: (state, action) => {
      return {
        ...state,
        isNotificationOpen: action.payload,
      };
    },
  },
});

export const { toggleOpenNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
