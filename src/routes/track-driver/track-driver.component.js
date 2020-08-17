import React from 'react';
import { View, Text, Container } from 'native-base';

import { connect } from 'react-redux';

import { getCurrentLocation } from '../../redux/home/home.actions';
import { getDriverInfo, getDistanceFromDriver } from '../../redux/trackDriver/trackDriver.actions';

import HeaderContainer from '../../components/header/header.component';
import MapTrack from '../../components/map-track/map-track.component';
import DriverFound from '../../components/driver-found/driver-found.component';
import DriverFooterProfile from '../../components/driver-footer-profile/driver-footer-profile.component';
import DriverOnTheWay from '../../components/driver-on-the-way/driver-on-the-way.component';

//import styles from './track-driver.styles';

class TrackDriver extends React.Component {
    componentDidMount() {
        this.props.getCurrentLocation();
        this.props.getDriverInfo();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.driverLocation && nextProps.driverLocation !== this.props.driverLocation) {
            this.props.getDistanceFromDriver()
        }
    }

    render() {
        const { region, showDriverFound, driverInfo, distanceFromDriver } = this.props;
        return (

            <Container>
                <View style={{ flex: 1 }}>
                    <HeaderContainer />
                    {
                        region ? <MapTrack /> : null
                    }

                    {
                        distanceFromDriver.rows ? <DriverOnTheWay /> : null
                    }

                    <DriverFooterProfile />


                    {
                        showDriverFound ? <DriverFound /> : null
                    }
                </View>

            </Container>
        );
    }

}

const mapStateToProps = (state) => ({
    region: state.home.region,
    showDriverFound: state.trackDriver.showDriverFound,
    driverLocation: state.trackDriver.driverLocation,
    driverInfo: state.trackDriver.driverInfo,
    distanceFromDriver: state.trackDriver.distanceFromDriver
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentLocation: () => dispatch(getCurrentLocation()),
    getDriverInfo: () => dispatch(getDriverInfo()),
    getDistanceFromDriver: () => dispatch(getDistanceFromDriver())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackDriver);