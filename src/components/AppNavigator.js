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
        <Stack.Screen name="My List" component={MyListScreen} />
        <Stack.Screen name="Watched List" component={WatchedListScreen} />
        <Stack.Screen name="Liked List" component={LikedListScreen} />
        <Stack.Screen name="Search Movies" component={SearchListScreen} />
        <Stack.Screen name="Personal Recs" component={PersonalRecScreen} />
        <Stack.Screen name="Popular Recs" component={PopularRecScreen} />
        <Stack.Screen name="Upcoming Recs" component={UpcomingRecScreen} />
        <Stack.Screen name="Top Recs" component={TopRecScreen} />
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
