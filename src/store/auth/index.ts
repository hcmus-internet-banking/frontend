import { rootStore } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../core/client";
import { AuthState, LoginResponse, RegisterResponse } from "./types";

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const { data } = await client.post("/api/logout");
  return data;
});

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const response = await client.post<LoginResponse>(
      "/api/auth/login",
      payload
    );

    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = await client.post<RegisterResponse>(
      "/api/auth/register",
      payload
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });

    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });

    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export const selectAuth = (state: { auth: AuthState }) => state.auth;

export default authSlice.reducer;
