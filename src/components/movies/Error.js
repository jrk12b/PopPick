import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/styles';

/**
 * Error Component
 *
 * This functional component displays an error message passed to it as a prop.
 * The message is rendered inside a styled container.
 *
 * Props:
 * - message: String - The error message to be displayed.
 *
 * Usage:
 * This component can be used to display error messages to the user
 * in a consistent and styled manner throughout the application.
 */
const Error = ({message}) => (
  <View style={styles.container}>
    <Text style={styles.text}>Error: {message}</Text>
  </View>
);

export default Error;
