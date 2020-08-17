import { HomeActionTypes, TrackDriverActionTypes } from './trackDriver.types';
import store from '../store';
import API_KEY from '../../utilis/api';

export const getDriverInfo = () => {

    return (dispatch, store) => {
        let driverId = store().home.booking.driverId;
        fetch(`http://ride-server.herokuapp.com/api/driver/${driverId}`)
            .then(res => res.json())
            .then(data => {
                return dispatch({
                    type: TrackDriverActionTypes.GET_DRIVER_INFORMATION,
                    payload: data
                })
            })
            .catch(err => console.log(err.message))
    }
}

// get initial driver location
export const getDriverLocation = () => {

    return (dispatch, store) => {
        let driverId = store().home.booking.driverId;
        fetch(`http://ride-server.herokuapp.com/api/driverLocation/${driverId}`)
            .then(res => res.json())
            .then(data => {
                return dispatch({
                    type: TrackDriverActionTypes.GET_DRIVER_LOCATION,
                    payload: data
                })
            })
            .catch(err => console.log(err.message))
    }
}

// get distance from driver
export const getDistanceFromDriver = () => {
    return (dispatch, store) => {
        if (store().trackDriver.driverLocation) {
            let originLatitude = store().home.selectedAddress.selectedPickup
                .location.lat;
            let originLongitude = store().home.selectedAddress.selectedPickup
                .location.lng;

            let destinationLatitude = store().trackDriver.driverLocation.coordinate.coordinates[1];
            let destinationLongitude = store().trackDriver.driverLocation.coordinate.coordinates[0];

            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLatitude},${originLongitude}&destinations=${destinationLatitude},${destinationLongitude}&key=${API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    return dispatch({
                        type: TrackDriverActionTypes.GET_DISTANCE_FROM_DRIVER,
                        payload: data,
                    });
                })
                .catch((err) => console.log(err.message));
        }
    }
}
