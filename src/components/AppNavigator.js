import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MoviesScreen from '../screens/MoviesScreen';
import BooksScreen from '../screens/BooksScreen';
import TvShowsScreen from '../screens/TvShowsScreen';
import VideoGamesScreen from '../screens/VideoGamesScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Books"
          component={BooksScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="TvShows"
          component={TvShowsScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="VideoGames"
          component={VideoGamesScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
