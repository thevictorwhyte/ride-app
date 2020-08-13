import { HomeActionTypes } from "./home.types";

const INITIAL_STATE = {
  region: {},
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomeActionTypes.GET_CURRENT_LOCATION:
      return {
        ...state,
        region: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
