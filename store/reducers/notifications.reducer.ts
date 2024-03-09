import { Notification } from "../../lib/notification.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { diffTime } from "../../services/date-formatter.service";

const initialState: { value: Notification<any>[] } = {
  value: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushNotifications: (state, action: PayloadAction<Notification<any>[]>) => {
      state.value = [...state.value, ...action.payload].filter((e) => {
        const now = new Date().toISOString();
        return diffTime(now, e.createdAt) < 3600 * 1000 * 24;
      });
    },
    clearNotifications: (state) => {
      state.value = [];
    },
  },
});

export const { pushNotifications, clearNotifications } =
  notificationsSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notifications.value;

export default notificationsSlice.reducer;
