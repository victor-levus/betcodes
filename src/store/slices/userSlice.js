import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = "http://localhost:8000/api/auth/users/";

const initialState = {
  data: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: undefined,
};

export const fetchUser = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(BASE_URL + "me/");
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (userFormData) => {
    const response = await axios.user(BASE_URL, userFormData);
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
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const selectUser = (state) => state.user?.data;
export const getUserStatus = (state) => state.user?.status;
export const getUserError = (state) => state.user?.error;

export const { userAdded } = userSlice.actions;

export default userSlice.reducer;
