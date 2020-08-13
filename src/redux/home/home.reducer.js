import { HomeActionTypes } from "./home.types";

const INITIAL_STATE = {
  name: "Victor",
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomeActionTypes.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
