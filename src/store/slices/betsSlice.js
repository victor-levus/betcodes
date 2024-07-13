import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { BASEURL } from "../../pages/auth/auth";

export const BASE_URL = BASEURL + "betcodes/bets/";

const initialState = {
  data: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,

  addBetStatus: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  addBetError: null,

  updateBetStatus: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  updateBetError: null,
};

export const fetchBets = createAsyncThunk("bets/fetchPosts", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addNewBet = createAsyncThunk(
  "bets/addNewBet",
  async (betFormData) => {
    const response = await axios.post(BASE_URL, betFormData);
    return response.data;
  }
);

export const updateBet = createAsyncThunk(
  "bets/updateBet",
  async (betId, betFormData) => {
    const response = await axios.patch(`${BASE_URL}${betId}/`, betFormData);
    return response.data;
  }
);

const betsSlice = createSlice({
  name: "bets",
  initialState: initialState,

  reducers: {
    betAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchBets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchBets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addNewBet.pending, (state, action) => {
        state.addBetStatus = "loading";
      })
      .addCase(addNewBet.fulfilled, (state, action) => {
        state.addBetStatus = "succeeded";
        state.data.push(action.payload);
        state.addBetError = null;
      })
      .addCase(addNewBet.rejected, (state, action) => {
        state.addBetStatus = "failed";
        state.addBetError = action.error.message;
      })

      .addCase(updateBet.pending, (state, action) => {
        state.updateBetStatus = "loading";
      })
      .addCase(updateBet.fulfilled, (state, action) => {
        state.updateBetStatus = "succeeded";
        state.data.push(action.payload);
        state.updateBetError = null;
      })
      .addCase(updateBet.rejected, (state, action) => {
        state.updateBetStatus = "failed";
        state.updateBetError = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const selectAllBets = (state) => state.bets.data;
export const getBetStatus = (state) => state.bets.status;
export const getBetError = (state) => state.bets.error;
export const getaddBetStatus = (state) => state.bets.addBetStatus;
export const getaddBetError = (state) => state.bets.addBetError;
export const { betAdded } = betsSlice.actions;

export default betsSlice.reducer;
