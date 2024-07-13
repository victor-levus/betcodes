import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../pages/auth/auth";

export const BASE_URL = BASEURL + "betcodes/posts/";

const initialState = {
  data: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  addPostStatus: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  addPostError: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postFormData) => {
    const response = await axios.post(BASE_URL, postFormData);
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,

  // reducers: {
  //   postAdded: {
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
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addNewPost.pending, (state, action) => {
        state.addPostStatus = "loading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.addPostStatus = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.addPostStatus = "failed";
        state.addPostError = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const selectAllPosts = (state) => state.posts.data;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getAddPostStatus = (state) => state.posts.addPoststatus;
export const getAddPostError = (state) => state.posts.addPostError;

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
