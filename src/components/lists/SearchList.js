import React, {useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';
import CustomButton from '../general/CustomButton';
import {API_KEY, VIDEO_GAME_CLIENT_ID} from '../../config';
import {getAccessToken} from '../../hooks/videoGames/auth';
import flattenData from '../../hooks/books/flattenData';
import {keyExtractor} from '../../components/general/ListConstants';

/**
 * SearchList Component
 *
 * This component allows users to search for either movies or video games based on the provided media type.
 * Users can input a query, and the component fetches and displays results from the appropriate API.
 * The search results are shown as a grid of posters, with each item displaying as a Poster component.
 *
 * Props:
 * - myList: Array - A list of media items added to the user's personal list.
 * - likedList: Array - (Optional) A list of media items the user has liked.
 * - watchedList: Array - (Optional) A list of media items the user has already watched or played.
 * - handleShowOptions: Function - A callback function to handle actions when a media item is selected.
 * - mediaType: String - The type of media being searched (either 'movies' or 'videoGames').
 *
 * State:
 * - query: String - The current search query input by the user.
 * - results: Array - The search results returned from the API.
 *
 * Behavior:
 * - The user can search for movies or video games by typing a query and pressing the "Search" button.
 * - The component fetches results from the appropriate API based on the media type and displays them in a grid.
 * - Users can clear the search results by pressing the "Clear" button.
 * - If no results are found, a message is displayed to the user.
 */

const SearchList = ({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  mediaType,
}) => {
  // State for storing the search query and the search results
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  /**
   * searchMedia Function
   *
   * This function handles the search functionality. It fetches data from either the movie or video game
   * API based on the current media type, using the user's search query. The results are then stored
   * in the state and displayed.
   */
  const searchMedia = async () => {
    if (mediaType === 'Movies') {
      try {
        // Fetching movie data from The Movie Database (TMDb) API
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query,
          )}`,
        );
        const data = await response.json();
        console.log(data);
        // Limiting the results to the top 10
        setResults(data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    } else if (mediaType === 'Video Games') {
      try {
        // Fetching video game data from IGDB API
        const accessToken = await getAccessToken();
        const response = await fetch('https://api.igdb.com/v4/games', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Client-ID': VIDEO_GAME_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
          },
          // Querying based on the user's input, including specific fields
          body: `search "${query}"; fields name, rating, similar_games, first_release_date, cover;`,
        });
        const data = await response.json();
        // Limiting the results to the top 10
        setResults(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching video games:', error);
      }
    } else if (mediaType === 'TV Shows') {
      try {
        // Fetching movie data from The Movie Database (TMDb) API
        const response = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
            query,
          )}`,
        );
        const data = await response.json();
        // Limiting the results to the top 10
        setResults(data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching tv shows:', error);
      }
    } else if (mediaType === 'Books') {
      const convertedQuery = query.replace(/ /g, '+');
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?limit=10&q=${convertedQuery}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              Connection: 'keep-alive',
              'Accept-Encoding': 'gzip, deflate, br',
            },
          },
        );
        const data = await response.json();
        const flattenedData = flattenData(data);
        // Limiting the results to the top 10
        if (flattenedData) {
          setResults(flattenedData.slice(0, 10));
        } else {
          console.error('No items found in the response');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
  };

  /**
   * clearSearch Function
   *
   * This function clears the current search query and results, resetting the search state.
   */
  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const placeholders = {
    Books: 'Books',
    Movies: 'Movies',
    'TV Shows': 'TV Shows',
    default: 'Video Games',
  };

  const placeholder = `Search for ${
    placeholders[mediaType] || placeholders.default
  }...`;

  return (
    <View style={styles.container}>
      {/* Text input for entering the search query */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#FBF4F4"
        value={query}
        onChangeText={text => {
          setQuery(text);
        }}
      />

      {/* Button to trigger the search */}
      <CustomButton
        title="Search"
        onPress={searchMedia}
        style={styles.button}
        textStyle={styles.buttonText}
      />

      {/* Button to clear the search results */}
      <CustomButton
        title="Clear"
        onPress={clearSearch}
        style={styles.button}
        textStyle={styles.buttonText}
      />

      {/* Displaying the search results in a grid, or a no-results message */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <Poster
              item={item}
              likedList={likedList}
              myList={myList}
              watchedList={watchedList}
              handleShowOptions={handleShowOptions}
              mediaType={mediaType}
            />
          )}
          numColumns={3}
          contentContainerStyle={styles.resultsContainer}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </View>
  );
};

export default SearchList;
