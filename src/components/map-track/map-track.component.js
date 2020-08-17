import React from "react";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { connect } from "react-redux";

import styles from "../map-container/map-container.styles";

const carMarker = require('../../assets/img/carMarker.png');
const MapTrack = ({ region, selectedAddress, driverLocation, showCarMarker }) => {

    const { selectedPickup, selectedDropoff } = selectedAddress || {};

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
                <MapView.Marker coordinate={region} pinColor="green" />
                {
                    selectedPickup ?
                        <MapView.Marker coordinate={{ latitude: selectedPickup.location.lat, longitude: selectedPickup.location.lng }} pinColor="green" />
                        : null
                }

                {
                    selectedDropoff ?
                        <MapView.Marker coordinate={{ latitude: selectedDropoff.location.lat, longitude: selectedDropoff.location.lng }} pinColor="blue" />
                        : null
                }

                {
                    showCarMarker ?
                        <MapView.Marker coordinate={{ latitude: driverLocation.coordinate.coordinates[1], longitude: driverLocation.coordinate.coordinates[0] }} image={carMarker} />
                        : null
                }
            </MapView>
        </View>
    );
};

const mapStateToProps = (state) => ({
    region: state.home.region,
    selectedAddress: state.home.selectedAddress,
    driverLocation: state.trackDriver.driverLocation,
    showCarMarker: state.trackDriver.showCarMarker
});



export default connect(mapStateToProps, null)(MapTrack);
