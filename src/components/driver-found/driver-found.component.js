import React from 'react';
import { Text, Image } from 'react-native';
import { View, Button } from 'native-base';

import { connect } from 'react-redux';

import { getDriverLocation } from '../../redux/trackDriver/trackDriver.actions';

import styles from './driver-found.styles';

const DriverFound = ({ driverInfo, getDriverLocation }) => {
    const { profilePic } = driverInfo || '';
    const { vehicle } = driverInfo || {};
    return (
        <View style={styles.findDriverContainer}>
            <View style={styles.content}>
                <Text>YAY Driver Found!</Text>
                <Image resizeMode="contain" style={styles.driverPic} source={{ uri: profilePic }} />
                <View style={styles.driverInfo}>
                    <Text style={styles.quotationMarkLeft}>""</Text>
                    <View style={styles.driverBio}>
                        <Text style={styles.bioText}>Hi my name is</Text>
                        <Text style={styles.nameText}>{driverInfo.firstName} {driverInfo.lastName}</Text>
                        <Text style={styles.bioText}>and I am 0.2km away</Text>
                    </View>
                    <Text style={styles.quotationMarkRight}>""</Text>
                </View>

                <View style={styles.vehicleDetails}>
                    <Text style={styles.vehicleText}>Vehicle plate number: </Text>
                    <Text style={styles.vehicleNumber}>{vehicle ? vehicle.plateNumber : null}</Text>

                    <Button style={styles.nextBtn} onPress={() => getDriverLocation()} >
                        <Text style={styles.nextBtnText}>Next</Text>
                    </Button>
                </View>


            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    driverInfo: state.trackDriver.driverInfo
});

const mapDispatchToProps = dispatch => ({
    getDriverLocation: () => dispatch(getDriverLocation())
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverFound);
