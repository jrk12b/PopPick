import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/styles';

const Error = ({message}) => (
  <View style={styles.container}>
    <Text style={styles.text}>Error: {message}</Text>
  </View>
);

export default Error;
