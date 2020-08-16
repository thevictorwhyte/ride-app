import React from 'react';
import { Text } from 'react-native';
import { View, Button } from 'native-base';
import { FontAwesome } from "@expo/vector-icons";
import AnimatedLoader from 'react-native-animated-loader';

import { connect } from 'react-redux';

import styles from './find-driver.styles';

const FindDriver = ({ selectedAddress }) => {
    const { selectedPickup, selectedDropoff } = selectedAddress || {};
    return (
        <View style={styles.findDriverContainer}>
            <View style={styles.findDriverContainer}>
                <AnimatedLoader visible={true} animationStyle={styles.spinner} speed={1} source={require("../../assets/loader.json")} />
                <Text style={styles.findDriverContainer}> Processing your request...</Text>
                <FontAwesome style={styles.locationIcon} name="map-marker" />

                <View style={styles.pickup}>
                    <Text>{selectedPickup.formattedAddress}</Text>
                </View>

                <FontAwesome style={styles.toArrow} name="long-arrow-down" />

                <View style={styles.dropoff}>
                    <Text>{selectedDropoff.formattedAddress}</Text>
                </View>

                <View>
                    <Text style={styles.termsText}>By booking you confirm that you accept our T & C</Text>
                    <Button style={styles.cancelBtn}>
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    selectedAddress: state.home.selectedAddress,
});

export default connect(mapStateToProps, null)(FindDriver);
