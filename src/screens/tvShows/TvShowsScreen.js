import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from '../../styles/styles';

function TvShowsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>TV Show Screen</Text>
      </View>
    </ScrollView>
  );
}

export default TvShowsScreen;
