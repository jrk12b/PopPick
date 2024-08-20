import React from 'react';
import {ScrollView, Text} from 'react-native';
import CustomButton from '../components/CustomButton';
import styles from '../styles/styles';

/**
 * HomeScreen Component
 *
 * This screen serves as the main entry point of the app, providing navigation options to various sections of the app.
 * It displays a header and several buttons that navigate to different screens when pressed.
 *
 * Props:
 * - navigation: The navigation prop provided by React Navigation, used to navigate between screens.
 */
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
        title="Go to Video Games"
        onPress={() => navigation.navigate('Video Games')}
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
        title="Go to Tv Shows"
        onPress={() => navigation.navigate('TV Shows')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </ScrollView>
  );
}

export default HomeScreen;
