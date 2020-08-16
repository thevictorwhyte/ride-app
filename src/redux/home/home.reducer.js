import { HomeActionTypes } from './home.types';

const INITIAL_STATE = {
  region: {},
  inputData: {},
  resultTypes: {
    pickUp: false,
    dropOff: false,
  },
  predictions: [],
  selectedAddress: {},
  distanceMatrix: {},
  fare: null,
  booking: {},
  nearByDrivers: [],
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomeActionTypes.GET_CURRENT_LOCATION:
      return {
        ...state,
        region: action.payload,
      };

    case HomeActionTypes.GET_INPUT:
      const { key, value } = action.payload;
      return {
        ...state,
        inputData: {
          [key]: value,
        },
      };

    case HomeActionTypes.TOGGLE_SEARCH_RESULTS:
      if (action.payload === 'pickup') {
        return {
          ...state,
          resultTypes: {
            pickUp: true,
            dropOff: false,
          },
          predictions: [],
        };
      } else if (action.payload === 'dropoff') {
        return {
          ...state,
          resultTypes: {
            pickUp: false,
            dropOff: true,
          },
          predictions: [],
        };
      } else if (action.payload === 'close') {
        return {
          ...state,
          resultTypes: {
            pickUp: false,
            dropOff: false,
          },
          predictions: [],
        };
      } else {
        return { ...state };
      }

    case HomeActionTypes.GET_ADDRESS_PREDICTIONS:
      return {
        ...state,
        predictions: action.payload,
      };

    case HomeActionTypes.GET_SELECTED_ADDRESS:
      let selectedTitle = state.resultTypes.pickUp
        ? 'selectedPickup'
        : 'selectedDropoff';
      return {
        ...state,
        selectedAddress: {
          ...state.selectedAddress,
          [selectedTitle]: action.payload,
        },
        resultTypes: {
          pickUp: false,
          dropOff: false,
        },
      };
    case HomeActionTypes.GET_DISTANCE_MATRIX:
      return {
        ...state,
        distanceMatrix: action.payload,
      };

    case HomeActionTypes.GET_FARE:
      return {
        ...state,
        fare: action.payload,
      };

    case HomeActionTypes.BOOK_CAR:
      return {
        ...state,
        booking: action.payload,
      };

    case HomeActionTypes.GET_NEARBY_DRIVERS:
      return {
        ...state,
        nearByDrivers: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
