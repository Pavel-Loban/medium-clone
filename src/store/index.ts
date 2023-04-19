import { configureStore } from "@reduxjs/toolkit";
import articleSliceReducer from './articleSlice'
import userSliceReducer from "./userSlice";

export const store = configureStore({
    reducer: {
      article: articleSliceReducer,
      user: userSliceReducer,
    },
  });

  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>