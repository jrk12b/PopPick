import React from 'react';
import 'react-native-gesture-handler';
import {View, StatusBar} from 'react-native';
import AppNavigator from './src/components/AppNavigator';

function App(): React.JSX.Element {
  // Static background color set to black
  const backgroundStyle = {
    backgroundColor: 'black',
    flex: 1, // Ensure the view fills the entire screen
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle="light-content" // Light text for dark background
        backgroundColor="black" // Set StatusBar background color to black
      />
      <AppNavigator />
    </View>
  );
}

export default App;
