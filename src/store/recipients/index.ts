import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RecipientsState } from "./types";

const initialState: RecipientsState = {
  recipients: [],
  loading: false,
  error: null,
};

export const addRecipientAsync = createAsyncThunk(
  "recipients/addRecipient",
  async (data) => {
    const response = await fetch("/api/recipients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

const recipientsSlice = createSlice({
  name: "recipients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRecipientAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRecipientAsync.fulfilled, (state, action) => {
        state.recipients = action.payload;
        state.loading = false;
      })
      .addCase(addRecipientAsync.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export default recipientsSlice.reducer;

export const selectRecipients = (state: { recipients: RecipientsState }) =>
  state.recipients;
