import React from 'react';
import { Text } from 'react-native';
import { View, Button } from 'native-base';

import { connect } from 'react-redux';

import styles from './book-button.styles';
import { bookCar } from '../../redux/home/home.actions';

const BookButton = ({ bookCar }) => {
  return (
    <Button style={styles.buttonContainer} onPress={() => bookCar()}>
      <Text style={styles.btnText}>Book</Text>
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  bookCar: () => dispatch(bookCar()),
});

export default connect(null, mapDispatchToProps)(BookButton);
