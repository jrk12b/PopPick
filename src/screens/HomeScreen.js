import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Movies"
        onPress={() => navigation.navigate('Movies')}
      />
      <Button
        title="Go to Books"
        onPress={() => navigation.navigate('Books')}
      />
      <Button
        title="Go to Video Games"
        onPress={() => navigation.navigate('VideoGames')}
      />
      <Button
        title="Go to Tv Shows"
        onPress={() => navigation.navigate('TvShows')}
      />
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

export default HomeScreen;
