/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import debounce from 'lodash.debounce';
import styles from '../../../styles/styles';
import MoviePoster from '../MoviePoster';
import {API_KEY} from '../../../config';
import CustomButton from '../../CustomButton';

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
const SearchList = ({handleShowOptions, likedList, myList, watchedList}) => {
  // State variables for managing the search query, search results, suggestions, and input focus state.
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Debounces the fetchSuggestions function to limit how frequently it's called.
  // This helps reduce the number of API calls made when the user is typing.
  const debouncedFetchSuggestions = useCallback(
    debounce(query => fetchSuggestions(query), 300),
    [],
  );

  /**
   * Fetches movie suggestions based on the current query.
   * If the query length is less than 3 characters, no suggestions are fetched.
   * The function sets the suggestions state with the first 10 results.
   */
  const fetchSuggestions = async query => {
    if (query.length < 3) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query,
        )}`,
      );
      const data = await response.json();
      setSuggestions(data.results.slice(0, 10));
    } catch (error) {
      console.error('Error fetching movie suggestions:', error);
    }
  };

  /**
   * Handles text input changes by updating the query state and fetching suggestions.
   * The debouncedFetchSuggestions function is used to avoid making excessive API calls.
   */
  const handleChangeText = text => {
    setQuery(text);
    debouncedFetchSuggestions(text);
  };

  /**
   * Handles the selection of a movie suggestion.
   * Updates the query state with the selected movie's title and clears the suggestions.
   */
  const handleSuggestionPress = movie => {
    setQuery(movie.title);
    setSuggestions([]);
  };

  /**
   * Searches for movies based on the current query.
   * Fetches the top 10 search results and updates the results state.
   * This function is similar to fetchSuggestions but is triggered explicitly by the user.
   */
  const searchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query,
        )}`,
      );
      const data = await response.json();
      setResults(data.results.slice(0, 10));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  /**
   * Clears the search input, results, and suggestions.
   * Resets the query, results, and suggestions state variables.
   */
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
        placeholderTextColor="#FBF4F4"
        value={query}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && suggestions.length > 0 && (
        <FlatList
          style={styles.suggestionsList}
          data={suggestions}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(item)}>
              <Text style={styles.suggestionText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <CustomButton
        title="Search"
        onPress={searchMovies}
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
            <MoviePoster
              item={item}
              likedList={likedList}
              myList={myList}
              watchedList={watchedList}
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

export default SearchList;
