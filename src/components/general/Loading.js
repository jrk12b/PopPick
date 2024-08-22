import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/styles';

/**
 * Loading Component
 *
 * This functional component displays a loading message to indicate that
 * content or data is currently being loaded.
 * The message is rendered inside a styled container.
 *
 * Usage:
 * This component can be used to show a loading state in the application
 * while waiting for data fetching, processing, or any asynchronous operation to complete.
 */
const Loading = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Loading...</Text>
  </View>
);

export default Loading;
