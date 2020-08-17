import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

import {
  getCurrentLocation
} from '../../redux/home/home.actions';

import HeaderContainer from '../../components/header/header.component';
import MapContainer from '../../components/map-container/map-container.component';
import Loading from '../../components/loading/loading.component';
import BookButton from '../../components/book-button/book-button.component';
import Fare from '../../components/fare/fare.component';
import FooterContainer from '../../components/footer/footer.component';
import FindDriver from '../../components/find-driver/find-driver.component';

import styles from './home.styles';

const taxiLogo = require('../../assets/img/ride-logo.png');
const carMarker = require('../../assets/img/carMarker.png');


class Home extends React.Component {
  componentDidMount() {
    this.props.getCurrentLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.booking.status === 'confirmed') {
      Actions.trackDriver({ type: 'reset' });
    }
  }

  render() {
    const { region, fare } = this.props;
    const { status } = this.props.booking;
    return (
      <Container>
        {status !== 'pending' ?
          <View style={{ flex: 1 }}>
            <HeaderContainer logo={taxiLogo} />
            <View style={styles.mapContent}>
              {region.latitude ? <MapContainer carMarker={carMarker} /> : <Loading />}
            </View>

            <BookButton />
            {fare ? <Fare /> : null}
            <FooterContainer style={styles.footerContent} />
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

const mapDispatchToProps = dispatch => ({
  getCurrentLocation: () => dispatch(getCurrentLocation())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
