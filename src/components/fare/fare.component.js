import React from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';

import { connect } from 'react-redux';

import styles from './fare.styles';

const Fare = ({ fare }) => {
  return (
    <View style={styles.fareContainer}>
      <Text>
        <Text style={styles.fareText}> FARE: NG</Text>{' '}
        <Text style={styles.amount}>{fare}</Text>
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  fare: state.home.fare,
});

export default connect(mapStateToProps, null)(Fare);
