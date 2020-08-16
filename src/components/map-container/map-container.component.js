import React from "react";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { connect } from "react-redux";

import { getNearbyDrivers } from '../../redux/home/home.actions';

import SearchBox from "../search-box/search-box.component";
import SearchResults from "../search-results/search-results.component";

import styles from "./map-container.styles";

class MapContainer extends React.Component {
  componentDidMount() {
    this.props.getNearbyDrivers()
  }

  render() {
    const { region, resultTypes, carMarker, nearByDrivers, selectedAddress } = this.props;

    const { selectedPickup, selectedDropoff } = selectedAddress || {};

    return (
      <View style={styles.container}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
          <MapView.Marker coordinate={region} pinColor="green" />
          {
            nearByDrivers.length > 0
              ? nearByDrivers.map((driver, i) =>
                <MapView.Marker
                  key={i}
                  coordinate={{ latitude: driver.coordinate.coordinates[1], longitude: driver.coordinate.coordinates[0] }}
                  image={carMarker} />
              )
              : null
          }

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
        </MapView>
        <SearchBox />
        {resultTypes.pickUp || resultTypes.dropOff ? <SearchResults /> : null}
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  region: state.home.region,
  resultTypes: state.home.resultTypes,
  nearByDrivers: state.home.nearByDrivers,
  selectedAddress: state.home.selectedAddress
});

const mapDispatchToProps = (dispatch) => ({
  getNearbyDrivers: () => dispatch(getNearbyDrivers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
