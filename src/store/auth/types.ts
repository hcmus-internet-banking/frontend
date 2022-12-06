import { BaseResponse } from "./../../core/handleResponse";
import { BaseState } from "./../index";

export interface AuthState extends BaseState {
  user: User | null;
}

export interface LoginResponse extends BaseResponse {
  data: User;
}

export interface User {
  id: string;
  accountNumber: string;
  lastName: string;
  firstName: string;
  tokens: Tokens;
}

export interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export interface RegisterResponse extends BaseResponse {
  data: RegisterUser;
}

export interface RegisterUser {
  id: string;
  accountNumber: string;
  lastName: string;
  firstName: string;
  email: string;
}

export interface RefreshTokenResponse extends BaseResponse {
  data: {
    accessToken: string;
  };
}
