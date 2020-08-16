import { HomeActionTypes } from './home.types';
import store from '../store';
import calculateFare from '../../../src/utilis/fareCalculator';

const API_KEY = 'AIzaSyAzsibFMiD-aDpR32rd7WgJxl7jXYg-Gy8';
// get users current location
export const getCurrentLocation = () => {
  return async (dispatch) => {
    try {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude, accuracy } = position.coords;

          const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
          const circumference = (40075 / 360) * 1000;

          const latitudeDelta =
            accuracy * (1 / (Math.cos(latitude) * circumference));
          const longitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;

          dispatch({
            type: HomeActionTypes.GET_CURRENT_LOCATION,
            payload: {
              longitude: longitude,
              latitude: latitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            },
          });
        },
        (err) => console.log(err.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch (err) {
      console.log('THERE WAS SOME SORT OF ERROR');
    }
  };
};

export const getInputData = (payload) => {
  return {
    type: HomeActionTypes.GET_INPUT,
    payload,
  };
};

//toggle search result modal
export const toggleSearchResultModal = (payload) => {
  return {
    type: HomeActionTypes.TOGGLE_SEARCH_RESULTS,
    payload,
  };
};

// get address predictions from google
export const getAddressPredictions = () => {
  return (dispatch, store) => {
    let userInput = store().home.resultTypes.pickUp
      ? store().home.inputData.pickup
      : store().home.inputData.dropoff;
    let longitude = store().home.region.longitude;
    let latitude = store().home.region.latitude;
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userInput}&location=${latitude},${longitude}&radius=10000&strictbounds&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        return dispatch({
          type: HomeActionTypes.GET_ADDRESS_PREDICTIONS,
          payload: data.predictions,
        });
      })
      .catch((err) => console.log(err.message));
  };
};

const dummyNumbers = {
  baseFare: 0.4,
  timeRate: 0.14,
  distanceRate: 0.97,
  surge: 1,
};

export const getSelectedAddress = (placeID, desc) => {
  return (dispatch, store) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(desc);
        return dispatch({
          type: HomeActionTypes.GET_SELECTED_ADDRESS,
          payload: {
            location: data.result.geometry.location,
            formattedAddress: desc,
          },
        });
      })
      .then(() => {
        //get distance and time
        if (
          store().home.selectedAddress.selectedPickup &&
          store().home.selectedAddress.selectedDropoff
        ) {
          let originLatitude = store().home.selectedAddress.selectedPickup
            .location.lat;
          let originLongitude = store().home.selectedAddress.selectedPickup
            .location.lng;

          let destinationLatitude = store().home.selectedAddress.selectedDropoff
            .location.lat;
          let destinationLongitude = store().home.selectedAddress
            .selectedDropoff.location.lng;

          fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLatitude},${originLongitude}&destinations=${destinationLatitude},${destinationLongitude}&key=${API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              return dispatch({
                type: HomeActionTypes.GET_DISTANCE_MATRIX,
                payload: data,
              });
            })
            .catch((err) => console.log(err.message));
        }
        // CALCULATE FARE
        setTimeout(function () {
          if (
            store().home.selectedAddress.selectedPickup &&
            store().home.selectedAddress.selectedDropoff
          ) {
            let time = store().home.distanceMatrix.rows[0].elements[0].duration
              .value;
            let distance = store().home.distanceMatrix.rows[0].elements[0]
              .distance.value;

            const fare = calculateFare(
              dummyNumbers.baseFare,
              dummyNumbers.timeRate,
              time,
              dummyNumbers.distanceRate,
              distance,
              dummyNumbers.surge
            );
            return dispatch({
              type: HomeActionTypes.GET_FARE,
              payload: fare,
            });
          }
        }, 1000);
      })
      .catch((err) => console.log(err.message));
  };
};

// BOOK CAR
export const bookCar = () => {
  return (dispatch, store) => {
    const nearByDrivers = store().home.nearByDrivers;
    const nearByDriver = nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)];
    const payload = {
      data: {
        userName: 'victor',
        pickUp: {
          address: store().home.selectedAddress.selectedPickup.formattedAddress,
          longitude: store().home.selectedAddress.selectedPickup.location.lat,
          latitude: store().home.selectedAddress.selectedPickup.location.lng,
        },
        dropOff: {
          address: store().home.selectedAddress.selectedDropoff
            .formattedAddress,
          longitude: store().home.selectedAddress.selectedDropoff.location.lat,
          latitude: store().home.selectedAddress.selectedDropoff.location.lng,
        },
        fare: store().home.fare,
        status: 'pending',
      },
      nearByDriver: {
        socketId: nearByDriver.socketId,
        driverId: nearByDriver.driverId,
        latitude: nearByDriver.coordinate.coordinates[1],
        longitude: nearByDriver.coordinate.coordinates[0],
      }
    };

    fetch('https://ride-server.herokuapp.com/api/bookings', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return dispatch({
          type: HomeActionTypes.BOOK_CAR,
          payload: data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getNearbyDrivers = () => {
  return (dispatch, store) => {
    let data = {
      latitude: store().home.region.latitude,
      longitude: store().home.region.longitude,
    };

    let url = new URL('https://ride-server.herokuapp.com/api/driverLocation'),
      params = data;
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return dispatch({
          type: HomeActionTypes.GET_NEARBY_DRIVERS,
          payload: data,
        });
      })
      .catch((err) => console.log(err.message));
    // fetch('https://ride-server.herokuapp.com/api/driverLocation', {
    //   method: 'GET',
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     return dispatch({
    //       type: HomeActionTypes.GET_NEARBY_DRIVERS,
    //       payload: data,
    //     });
    //   })
    //   .catch((err) => console.log(err.message));
  };
};
