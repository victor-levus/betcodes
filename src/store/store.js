import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "./slices/betsSlice";
import postsReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    bets: betsReducer,
    posts: postsReducer,
    user: userReducer,
  },
});
