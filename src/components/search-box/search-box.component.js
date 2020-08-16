import React from 'react';
import { Text } from 'react-native';
import { View, InputGroup, Input } from 'native-base';

import { connect } from 'react-redux';

import {
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
} from '../../redux/home/home.actions';

import { FontAwesome } from '@expo/vector-icons';

import styles from './search-box.styles';

const SearchBox = ({
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  selectedAddress,
}) => {
  function handleInput(key, val) {
    getInputData({
      key,
      value: val,
    });
    getAddressPredictions();
  }

  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}> PICK-UP</Text>
        <InputGroup>
          <FontAwesome name="search" size={15} color="#211858" />
          <Input
            onFocus={() => toggleSearchResultModal('pickup')}
            style={styles.inputSearch}
            placeholder="Choose pick-up location"
            onChangeText={handleInput.bind(this, 'pickup')}
            defaultValue={
              selectedAddress.selectedPickup
                ? selectedAddress.selectedPickup.formattedAddress
                : null
            }
          />
        </InputGroup>
      </View>

      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}> DROP-OFF</Text>
        <InputGroup>
          <FontAwesome name="search" size={15} color="#211858" />
          <Input
            onFocus={() => toggleSearchResultModal('dropoff')}
            style={styles.inputSearch}
            placeholder="Choose drop-off location"
            onChangeText={handleInput.bind(this, 'dropoff')}
            defaultValue={
              selectedAddress.selectedDropoff
                ? selectedAddress.selectedDropoff.formattedAddress
                : null
            }
          />
        </InputGroup>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  selectedAddress: state.home.selectedAddress,
});

const mapDispatchToProps = (dispatch) => ({
  getInputData: (payload) => dispatch(getInputData(payload)),
  toggleSearchResultModal: (payload) =>
    dispatch(toggleSearchResultModal(payload)),
  getAddressPredictions: (val) => dispatch(getAddressPredictions(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
