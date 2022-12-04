import { BaseState } from "./../index";

export interface AuthState extends BaseState {
  user: User | null;
  token: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
