import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function TvShowsScreen() {
  return (
    <View style={styles.container}>
      <Text>Tv Shows Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TvShowsScreen;
