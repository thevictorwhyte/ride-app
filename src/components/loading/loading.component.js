import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import AnimatedLoader from 'react-native-animated-loader';

import styles from './loading.styles';

const Loading = () => {
    return (
        <View style={styles.loadingContainer}>
            <AnimatedLoader visible={true} animationStyle={styles.spinner} speed={1} source={require("../../assets/loader.json")} />
            {/* <Text>Hang tight, I'm getting your location...</Text> */}
        </View>
    );
}

export default Loading;