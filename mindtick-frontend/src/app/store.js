import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { taskApi } from "../features/tasks/taskApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(taskApi.middleware),
});
