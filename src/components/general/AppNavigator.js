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
import MyListTvShowsScreen from '../../screens/tvShows/MylistTvShowsScreen';
import WatchedListTvShowsScreen from '../../screens/tvShows/WatchedListTvShowsScreen';
import LikedListTvShowsScreen from '../../screens/tvShows/LikedListTvShowsScreen';
import PersonalRecTvShowsScreen from '../../screens/tvShows/PersonalRecTvShowsScreen';
import PopularRecTvShowsScreen from '../../screens/tvShows/PopularRecTvShowsScreen';
import TopRecTvShowsScreen from '../../screens/tvShows/TopRecTvShowsScreen';
import CustomRecTvShowsScreen from '../../screens/tvShows/CustomRecTvShowsScreen';
import SearchListTvShowsScreen from '../../screens/tvShows/SearchListTvShowsScreen';
import SearchListBooksScreen from '../../screens/books/SearchListBooksScreen';
import MyListBooksScreen from '../../screens/books/MylistBooksScreen';
import LikedListBooksScreen from '../../screens/books/LikedListBooksScreen';
import ReadListBooksScreen from '../../screens/books/ReadListBooksScreen';
import FictionRecScreen from '../../screens/books/FictionRecScreen';
import NonFictionRecScreen from '../../screens/books/NonFictionRecScreen';
import DramaRecScreen from '../../screens/books/DramaRecScreen';
import AdventureRecScreen from '../../screens/books/AdventureRecScreen';

const Stack = createStackNavigator();

/**
 * AppNavigator Component
 *
 * This component sets up the main navigation structure of the app using React Navigation.
 * It defines a stack navigator that allows users to navigate between different screens,
 * representing various sections of the app, such as Movies, Books, TV Shows, Video Games,
 * and personalized recommendations.
 *
 * The stack navigator is configured to include multiple screens, each corresponding to a different
 * section or feature of the app. These screens are associated with their respective components
 * and can be navigated to by their names.
 *
 * Screens:
 * - Home: The landing page of the app, providing access to the main categories (Movies, Books, TV Shows, Video Games).
 * - Movies: The main screen for browsing and interacting with movie-related content.
 * - My List Movies: Displays a list of movies that the user has added to their personal watchlist.
 * - Watched List Movies: Displays the list of movies the user has marked as watched.
 * - Liked List Movies: Shows the list of movies the user has liked.
 * - Search Movies: A search functionality for finding specific movies.
 * - Personal Recs: Displays personalized movie recommendations based on user preferences.
 * - Popular Recs: Shows a list of currently popular movie recommendations.
 * - Upcoming Recs: Displays a list of upcoming movie releases.
 * - Top Recs: Shows a list of top-rated movies.
 * - Custom Recs: Displays custom movie recommendations tailored to the user's interests.
 * - Books: The main screen for browsing and interacting with book-related content.
 * - My List Books: Displays a list of books that the user has added to their personal reading list.
 * - Liked List Books: Shows the list of books the user has liked.
 * - Read List Books: Displays the list of books the user has marked as read.
 * - Search Books: A search functionality for finding specific books.
 * - Fiction Recs: Shows a list of recommended fiction books.
 * - Non-Fiction Recs: Displays a list of recommended non-fiction books.
 * - Drama Recs: Shows a list of recommended drama books.
 * - Adventure Recs: Displays a list of recommended adventure books.
 * - TV Shows: The main screen for browsing and interacting with TV show-related content.
 * - My List TV Shows: Displays a list of TV shows that the user has added to their personal watchlist.
 * - Watched List TV Shows: Displays the list of TV shows the user has marked as watched.
 * - Liked List TV Shows: Shows the list of TV shows the user has liked.
 * - Search TV Shows: A search functionality for finding specific TV shows.
 * - Personal Recs TV Shows: Displays personalized TV show recommendations based on user preferences.
 * - Popular Recs TV Shows: Shows a list of currently popular TV show recommendations.
 * - Top Recs TV Shows: Displays a list of top-rated TV shows.
 * - Custom Recs TV Shows: Displays custom TV show recommendations tailored to the user's interests.
 * - Video Games: The main screen for browsing and interacting with video game-related content.
 * - My List Video Games: Displays a list of video games that the user has added to their personal playlist.
 * - Played List Video Games: Displays the list of video games the user has marked as played.
 * - Liked List Video Games: Shows the list of video games the user has liked.
 * - Search Video Games: A search functionality for finding specific video games.
 * - Personal Recs Video Games: Displays personalized video game recommendations based on user preferences.
 *
 * Navigation:
 * - The NavigationContainer component wraps the Stack.Navigator, ensuring that navigation is possible across the entire app.
 * - Each screen can be navigated to by using its name in the `Stack.Screen` component.
 * - Some screens have headers shown (`headerShown: true`), while others use the default header settings.
 *
 * Usage:
 * - The `AppNavigator` component should be used as the main navigation setup in the root of the app.
 * - This setup allows users to seamlessly transition between different sections and features within the app.
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
        <Stack.Screen name="My List Movies" component={MyListScreen} />
        <Stack.Screen
          name="Watched List Movies"
          component={WatchedListScreen}
        />
        <Stack.Screen name="Liked List Movies" component={LikedListScreen} />
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
        <Stack.Screen
          name="Played List Video Games"
          component={PlayedListScreen}
        />
        <Stack.Screen
          name="Liked List Video Games"
          component={LikedListVideoGamesScreen}
        />
        <Stack.Screen
          name="Personal Recs Video Games"
          component={PersonalRecVideoGamesScreen}
        />
        <Stack.Screen
          name="Search Video Games"
          component={SearchListVideoGamesScreen}
        />
        <Stack.Screen name="My List TV Shows" component={MyListTvShowsScreen} />
        <Stack.Screen
          name="Watched List TV Shows"
          component={WatchedListTvShowsScreen}
        />
        <Stack.Screen
          name="Liked List TV Shows"
          component={LikedListTvShowsScreen}
        />
        <Stack.Screen
          name="Personal Recs TV Shows"
          component={PersonalRecTvShowsScreen}
        />
        <Stack.Screen
          name="Popular Recs TV Shows"
          component={PopularRecTvShowsScreen}
        />
        <Stack.Screen
          name="Top Recs TV Shows"
          component={TopRecTvShowsScreen}
        />
        <Stack.Screen
          name="Custom Recs TV Shows"
          component={CustomRecTvShowsScreen}
        />
        <Stack.Screen
          name="Search TV Shows"
          component={SearchListTvShowsScreen}
        />
        <Stack.Screen name="My List Books" component={MyListBooksScreen} />
        <Stack.Screen
          name="Liked List Books"
          component={LikedListBooksScreen}
        />
        <Stack.Screen name="Read List Books" component={ReadListBooksScreen} />
        <Stack.Screen name="Search Books" component={SearchListBooksScreen} />
        <Stack.Screen name="Fiction Recs" component={FictionRecScreen} />
        <Stack.Screen name="Non-Fiction Recs" component={NonFictionRecScreen} />
        <Stack.Screen name="Drama Recs" component={DramaRecScreen} />
        <Stack.Screen name="Adventure Recs" component={AdventureRecScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
