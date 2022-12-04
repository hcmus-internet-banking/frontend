export { rootStore as store } from "./store";

export interface BaseState {
  loading: boolean;
  error: string | null;
}
