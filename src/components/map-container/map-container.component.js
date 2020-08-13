import React from "react";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { connect } from "react-redux";

import { getCurrentLocation } from "../../redux/home/home.actions";

import styles from "./map-container.styles";

const MapContainer = ({ region }) => {
  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
        <MapView.Marker coordinate={region} pinColor="green" />
      </MapView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  region: state.home.region,
});

export default connect(mapStateToProps, null)(MapContainer);
