import { configureStore } from "@reduxjs/toolkit";
import authenticatedUserReducer from "./reducers/authenticated-user.reducer";
import notificationsReducer from "./reducers/notifications.reducer";
// ...

export const store = configureStore({
  reducer: {
    authenticatedUser: authenticatedUserReducer,
    notifications: notificationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
