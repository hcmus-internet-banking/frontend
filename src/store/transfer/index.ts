import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  loading: boolean;
  error: string | null;
  data: any;
};

const initialState: InitialState = {
  loading: false,
  error: null,
  data: null,
};

export const transferAsync = createAsyncThunk(
  "transfer/transfer",
  async (data) => {
    const response = await fetch("/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transferAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(transferAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(transferAsync.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export default transferSlice.reducer;

export const selectTransfer = (state: { transfer: InitialState }) =>
  state.transfer;

export const selectRecipient = (state: { transfer: InitialState }) =>
  state.transfer.data;
