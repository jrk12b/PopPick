import React from 'react';
import {ScrollView, Text} from 'react-native';
import CustomButton from '../components/CustomButton';
import styles from '../styles/styles';

function HomeScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textHeader}>Home Screen</Text>
      <CustomButton
        title="Go to Movies"
        onPress={() => navigation.navigate('Movies')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <CustomButton
        title="Go to Books"
        onPress={() => navigation.navigate('Books')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <CustomButton
        title="Go to Video Games"
        onPress={() => navigation.navigate('VideoGames')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <CustomButton
        title="Go to Tv Shows"
        onPress={() => navigation.navigate('TvShows')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </ScrollView>
  );
}

export default HomeScreen;
