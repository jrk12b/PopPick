import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/movies/MovieScreen';
import BooksScreen from '../screens/books/BooksScreen';
import TvShowsScreen from '../screens/tvShows/TvShowsScreen';
import VideoGamesScreen from '../screens/videoGames/VideoGamesScreen';
import MyListScreen from '../screens/movies/MylistScreen';
import WatchedListScreen from '../screens/movies/WatchedListScreen';
import LikedListScreen from '../screens/movies/LikedListScreen';
import SearchListScreen from '../screens/movies/SearchListScreen';
import PersonalRecScreen from '../screens/movies/PersonalRecScreen';
import PopularRecScreen from '../screens/movies/PopularRecScreen';
import UpcomingRecScreen from '../screens/movies/UpcomingRecScreen';
import TopRecScreen from '../screens/movies/TopRecScreen';

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
          component={MovieScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen name="MyListScreen" component={MyListScreen} />
        <Stack.Screen name="WatchedListScreen" component={WatchedListScreen} />
        <Stack.Screen name="LikedListScreen" component={LikedListScreen} />
        <Stack.Screen name="SearchListScreen" component={SearchListScreen} />
        <Stack.Screen name="PersonalRecScreen" component={PersonalRecScreen} />
        <Stack.Screen name="PopularRecScreen" component={PopularRecScreen} />
        <Stack.Screen name="UpcomingRecScreen" component={UpcomingRecScreen} />
        <Stack.Screen name="TopRecScreen" component={TopRecScreen} />
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
