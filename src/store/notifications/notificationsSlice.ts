import { createSlice } from "@reduxjs/toolkit";
import NotificationsType from "../../types/notificationsType";
import NotificationType from "../../types/notificationType";

const initialState: NotificationsType = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      let notificationsArray: NotificationType[] = state.notifications;
      notificationsArray =
        notificationsArray.length < 5
          ? notificationsArray
          : notificationsArray.slice(1);
      notificationsArray.push(payload);

      state.notifications = notificationsArray;
    },
    removeNotification: (state, { payload }) => {
      const notificationsArray: NotificationType[] = state.notifications.filter(
        (_, index) => {
          return index !== payload;
        }
      );
      state.notifications = notificationsArray;
    },
  },
});

export const notificationsSliceAction = { ...notificationsSlice.actions };
export const notificationsSliceReducer = notificationsSlice.reducer;
