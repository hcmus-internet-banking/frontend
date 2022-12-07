import { BaseState } from "./../index";

export interface AuthState extends BaseState {
  user: LoginResponse | null;
}

export interface LoginResponse {
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

export interface RegisterResponse {
  id: string;
  accountNumber: string;
  lastName: string;
  firstName: string;
  email: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
