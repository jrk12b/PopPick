import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import MovieScreen from '../../screens/movies/MovieScreen';
import BooksScreen from '../../screens/books/BooksScreen';
import TvShowsScreen from '../../screens/tvShows/TvShowsScreen';
import VideoGamesScreen from '../../screens/videoGames/VideoGameScreen';
import MyListScreen from '../../screens/movies/MylistScreen';
import WatchedListScreen from '../../screens/movies/WatchedListScreen';
import LikedListScreen from '../../screens/movies/LikedListScreen';
import SearchListScreen from '../../screens/movies/SearchListScreen';
import PersonalRecScreen from '../../screens/movies/PersonalRecScreen';
import PopularRecScreen from '../../screens/movies/PopularRecScreen';
import UpcomingRecScreen from '../../screens/movies/UpcomingRecScreen';
import TopRecScreen from '../../screens/movies/TopRecScreen';
import CustomRecScreen from '../../screens/movies/CustomRecScreen';
import MyListVideoGamesScreen from '../../screens/videoGames/MylistVideoGamesScreen';
import PlayedListScreen from '../../screens/videoGames/PlayedListScreen';
import LikedListVideoGamesScreen from '../../screens/videoGames/LikedListVideoGamesScreen';
import PersonalRecVideoGamesScreen from '../../screens/videoGames/PersonalRecVideoGamesScreen';
import SearchListVideoGamesScreen from '../../screens/videoGames/SearchListVideoGamesScreen';

const Stack = createStackNavigator();

/**
 * AppNavigator Component
 *
 * This component sets up the main navigation structure of the app using React Navigation.
 * It defines a stack navigator that allows users to navigate between different screens
 * representing various sections of the app, such as Movies, Books, TV Shows, Video Games,
 * and personalized recommendations.
 *
 * The stack navigator is configured to include multiple screens, each corresponding to a different
 * section or feature of the app. These screens are associated with their respective components
 * and can be navigated to by their names.
 *
 * Screens:
 * - Home: Displays the home screen of the app.
 * - Movies: Displays the main movie screen.
 * - My List: Shows the user's personal list of saved movies.
 * - Watched List: Displays the list of movies the user has marked as watched.
 * - Liked List: Shows the list of movies the user has liked.
 * - Search Movies: Provides a search functionality for finding movies.
 * - Personal Recs: Displays personalized movie recommendations.
 * - Popular Recs: Shows popular movie recommendations.
 * - Upcoming Recs: Displays upcoming movie recommendations.
 * - Top Recs: Shows top-rated movie recommendations.
 * - Books: Displays the books section of the app.
 * - TvShows: Displays the TV shows section of the app.
 * - VideoGames: Displays the video games section of the app.
 *
 * Navigation:
 * - The navigation container wraps the stack navigator, ensuring the entire app is navigable.
 * - Each screen can be navigated to by using its name in the `Stack.Screen` component.
 * - Some screens have their headers shown (`headerShown: true`), while others use default options.
 *
 * Usage:
 * - The `AppNavigator` component should be used as the main navigation setup in the root of the app.
 * - This allows users to seamlessly transition between different sections and features within the app.
 */
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
        <Stack.Screen name="Search" component={SearchListScreen} />
        <Stack.Screen name="Personal Recs" component={PersonalRecScreen} />
        <Stack.Screen name="Popular Recs" component={PopularRecScreen} />
        <Stack.Screen name="Upcoming Recs" component={UpcomingRecScreen} />
        <Stack.Screen name="Top Recs" component={TopRecScreen} />
        <Stack.Screen name="Custom Recs" component={CustomRecScreen} />
        <Stack.Screen
          name="Books"
          component={BooksScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="TV Shows"
          component={TvShowsScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Video Games"
          component={VideoGamesScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="My List Video Games"
          component={MyListVideoGamesScreen}
        />
        <Stack.Screen name="Played List" component={PlayedListScreen} />
        <Stack.Screen
          name="Liked List Video Games"
          component={LikedListVideoGamesScreen}
        />
        <Stack.Screen
          name="Personal Rec Video Games"
          component={PersonalRecVideoGamesScreen}
        />
        <Stack.Screen
          name="Search Video Games"
          component={SearchListVideoGamesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
