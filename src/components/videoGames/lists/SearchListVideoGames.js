import React, {useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import styles from '../../../styles/styles';
import VideoGamePoster from '../VideoGamePoster';
import CustomButton from '../../CustomButton';
import {getAccessToken} from '../../../hooks/videoGames/auth';
import {VIDEO_GAME_CLIENT_ID} from '../../../config';

/**
 * SearchList Component
 *
 * This component provides a search interface for movies, allowing users to enter a query,
 * see suggestions, and view search results. It integrates with an external movie database API.
 *
 * Props:
 * - myList: Array - A list of movies in the user's personal list.
 * - likedList: Array - A list of movies that the user has liked.
 * - watchedList: Array - A list of movies that the user has already watched.
 * - handleShowOptions: Function - A callback function triggered when a movie is selected,
 *   which shows additional options for the selected movie.
 *
 * Behavior:
 * - Allows users to search for movies by entering a query.
 * - Fetches and displays movie suggestions as the user types.
 * - Displays a list of search results based on the user's query.
 * - Allows users to clear the search input and results.
 * - Handles the selection of suggestions and shows additional options for each movie.
 */
const SearchListVideoGames = ({
  searchList,
  myListVideoGames,
  likedListVideoGames,
  playedListVideoGames,
  handleShowOptions,
}) => {
  // State variables for managing the search query, search results, suggestions, and input focus state.
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChangeText = text => {
    setQuery(text);
  };

  const searchVideoGames = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': VIDEO_GAME_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
        body: `search "${query}"; fields *;`,
      });
      const data = await response.json();

      setResults(data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching video games:', error);
    }
  };

  /**
   * Clears the search input, results, and suggestions.
   * Resets the query, results, and suggestions state variables.
   */
  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for video games..."
        placeholderTextColor="#FBF4F4"
        value={query}
        onChangeText={handleChangeText}
      />
      <CustomButton
        title="Search"
        onPress={() => searchVideoGames(query)}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <CustomButton
        title="Clear"
        onPress={clearSearch}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      {results.length > 0 ? (
        <FlatList
          key={results.length}
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <VideoGamePoster
              item={item}
              likedListVideoGames={likedListVideoGames}
              myListVideoGames={myListVideoGames}
              playedListVideoGames={playedListVideoGames}
              handleShowOptions={handleShowOptions}
              listType="likedList"
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

export default SearchListVideoGames;
