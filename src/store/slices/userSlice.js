import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../pages/auth/auth";

export const BASE_URL = BASEURL + "auth/";

const initialState = {
  users: [],
  usersStatus: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  userError: null,

  user: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await axios.get(BASE_URL + "users/me/");
  return response.data;
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(BASE_URL + "users/");
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (userFormData) => {
    const response = await axios.post(BASE_URL, userFormData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  // reducers: {
  //   userAdded: {
  //     reducer(state, action) {
  //       state.push(action.payload);
  //     },
  //     prepare(title, content) {
  //       return {
  //         payload: {
  //           id: nanoid(),
  //           title,
  //           content,
  //         },
  //       };
  //     },
  //   },
  // },

  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.user = {};
      })

      .addCase(fetchUsers.pending, (state, action) => {
        state.usersStatus = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersStatus = "succeeded";
        state.users = action.payload;
        state.userError = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersStatus = "failed";
        state.userError = action.error.message;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const selectAllUsers = (state) => state.user?.users;
export const getUsersStatus = (state) => state.user?.usersStatus;
export const getUsersError = (state) => state.user?.usersError;

export const selectUser = (state) => state.user?.user;
export const getUserStatus = (state) => state.user?.status;
export const getUserError = (state) => state.user?.error;

export const { userAdded } = userSlice.actions;

export default userSlice.reducer;
