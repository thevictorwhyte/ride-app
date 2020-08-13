import { HomeActionTypes } from "./home.types";

export const setName = () => ({
  type: HomeActionTypes.SET_NAME,
  payload: "Victor",
});
