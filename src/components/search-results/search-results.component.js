import React from 'react';
import { Text } from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';

import { connect } from 'react-redux';

import { getSelectedAddress } from '../../redux/home/home.actions';

import { MaterialIcons } from '@expo/vector-icons';

import styles from './search-results.styles';

const SearchResults = ({ predictions, getSelectedAddress }) => {
  // function handleSelectedAddress(placeID, desc) {
  //   getSelectedAddress(placeID, desc);
  // }

  return (
    <View style={styles.searchResultsWrapper}>
      <List>
        {predictions.length >= 1
          ? predictions.map((prediction, i) => (
              <ListItem
                onPress={() =>
                  getSelectedAddress(
                    prediction.place_id,
                    prediction.description
                  )
                }
                key={i}
                button
                avatar
              >
                <Left style={styles.leftContainer}>
                  <MaterialIcons name="location-on" style={styles.leftIcon} />
                </Left>
                <Body>
                  <Text style={styles.primaryText}>
                    {prediction.description}
                  </Text>
                  <Text style={styles.secondaryText}>
                    {prediction.structured_formatting.secondary_text}
                  </Text>
                </Body>
              </ListItem>
            ))
          : null}
      </List>
    </View>
  );
};

const mapStateToProps = (state) => ({
  predictions: state.home.predictions || [],
});

const mapDispatchToProps = (dispatch) => ({
  getSelectedAddress: (placeID, desc) =>
    dispatch(getSelectedAddress(placeID, desc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
