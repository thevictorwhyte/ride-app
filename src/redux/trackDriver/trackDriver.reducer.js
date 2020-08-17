import { TrackDriverActionTypes } from './trackDriver.types';

const INITIAL_STATE = {
    driverInfo: {},
    driverLocation: {},
    showDriverFound: true,
    showCarMarker: false,
    distanceFromDriver: {}
};

const trackDriverReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case TrackDriverActionTypes.GET_DRIVER_INFORMATION:
            return {
                ...state,
                driverInfo: action.payload,
            };

        case TrackDriverActionTypes.GET_DRIVER_LOCATION:
            return {
                ...state,
                driverLocation: action.payload,
                showDriverFound: false,
                showCarMarker: true
            }
        case TrackDriverActionTypes.UPDATE_DRIVER_LOCATION:
            return {
                ...state,
                driverLocation: action.payload
            }
        case TrackDriverActionTypes.GET_DISTANCE_FROM_DRIVER:
            return {
                ...state,
                distanceFromDriver: action.payload
            }
        default:
            return state;
    }
};

export default trackDriverReducer;
