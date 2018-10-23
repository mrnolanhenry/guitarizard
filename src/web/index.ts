import AppClient, { AppState } from "./client";

const initialState = ((window as any) as { initialState: AppState })
  .initialState;

console.log(">>>>>", initialState);

new AppClient({ initialState });
