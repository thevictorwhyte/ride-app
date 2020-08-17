import React from 'react';
import { Text, Image } from 'react-native';
import { View, Button } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import { connect } from 'react-redux';

import styles from './driver-footer-profile.styles';

const DriverFooterProfile = ({ driverInfo }) => {
    const { profilePic } = driverInfo || '';
    return (
        <View style={styles.footerContainer}>
            <View style={styles.imageContainer}>
                <Image resizeMode="contain" style={styles.driverPic} source={{ uri: profilePic }} />
            </View>

            <View style={styles.ratingContainer}>
                <FontAwesome name="star" style={{ fontSize: 20, color: "#0f083b" }} />
                <FontAwesome name="star" style={{ fontSize: 20, color: "#0f083b" }} />
                <FontAwesome name="star" style={{ fontSize: 20, color: "#0f083b" }} />
                <FontAwesome name="star" style={{ fontSize: 20, color: "#0f083b" }} />
                <FontAwesome name="star-half" style={{ fontSize: 20, color: "#0f083b" }} />
            </View>
            <View style={styles.iconContainer} />
            <View style={styles.iconContainer}>
                <FontAwesome name="phone" style={styles.icon} />
            </View>
            <View style={styles.iconContainer}>
                <FontAwesome name="comments-o" style={styles.icon} />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    driverInfo: state.trackDriver.driverInfo
});

export default connect(mapStateToProps, null)(DriverFooterProfile);