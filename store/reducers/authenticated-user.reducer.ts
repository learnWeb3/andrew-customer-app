import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AutenticatedUserState {
  _id: string | null;
}

const initialState: AutenticatedUserState = {
  _id: null,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setAuthenticatedUser: (
      state,
      action: PayloadAction<{
        _id: string;
      }>
    ) => {
      state._id = action.payload._id;
    },
  },
});

export const { setAuthenticatedUser } = authenticatedUserSlice.actions;

export const selectAuthenticatedUserId = (state: RootState) =>
  state.authenticatedUser._id;

export default authenticatedUserSlice.reducer;
