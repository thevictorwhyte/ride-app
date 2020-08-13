import { HomeActionTypes } from "./home.types";

export const setName = () => ({
  type: HomeActionTypes.SET_NAME,
  payload: "Victor",
});

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
      console.log("THERE WAS SOME SORT OF ERROR");
    }
  };
};
