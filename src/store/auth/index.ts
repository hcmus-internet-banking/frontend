import { handleResponse } from "./../../core/handleResponse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../core/client";
import {
  AuthState,
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from "./types";

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const { data } = await client.post("/api/auth/logout");
  return data;
});

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const response = await client.post<LoginResponse>(
      "/api/auth/login",
      payload
    );

    return handleResponse(response);
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

    return handleResponse(response);
  }
);

export const refreshTokenAsync = async (refreshToken: string) => {
  const response = await client.post<RefreshTokenResponse>(
    "/api/auth/refresh-token",
    {
      refreshToken,
    }
  );

  return handleResponse(response);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    updateAccessToken(state, action: { payload: { accessToken: string } }) {
      if (state.user) {
        state.user.tokens.accessToken = action.payload.accessToken;
      }
    },
  },
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
        state.user = null;
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

export const { logout, updateAccessToken } = authSlice.actions;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.user;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
