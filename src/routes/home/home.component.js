import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Container } from 'native-base';

import {
  getCurrentLocation
} from '../../redux/home/home.actions';

import HeaderContainer from '../../components/header/header.component';
import MapContainer from '../../components/map-container/map-container.component';
import BookButton from '../../components/book-button/book-button.component';
import Fare from '../../components/fare/fare.component';
import FooterContainer from '../../components/footer/footer.component';
import FindDriver from '../../components/find-driver/find-driver.component';

const taxiLogo = require('../../assets/img/ride-logo.png');
const carMarker = require('../../assets/img/carMarker.png');
class Home extends React.Component {
  componentDidMount() {
    this.props.getCurrentLocation();
  }
  render() {
    const { region, fare } = this.props;
    const { status } = this.props.booking;
    return (
      <Container>
        {status !== 'pending' ?
          <View style={{ flex: 1 }}>
            <HeaderContainer logo={taxiLogo} />
            {region.latitude ? <MapContainer carMarker={carMarker} /> : null}
            <BookButton />
            {fare ? <Fare /> : null}
            <FooterContainer />
          </View>
          :
          <FindDriver />
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  region: state.home.region,
  inputData: state.home.inputData || {},
  fare: state.home.fare,
  booking: state.home.booking
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentLocation: () => dispatch(getCurrentLocation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
