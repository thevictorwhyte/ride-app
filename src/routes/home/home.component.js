import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Container } from "native-base";

import { getCurrentLocation } from "../../redux/home/home.actions";

import MapContainer from "../../components/map-container/map-container.component";

class Home extends React.Component {
  componentDidMount() {
    this.props.getCurrentLocation();
  }
  render() {
    return (
      <Container>
        {this.props.region.latitude ? <MapContainer /> : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  region: state.home.region,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentLocation: () => dispatch(getCurrentLocation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
