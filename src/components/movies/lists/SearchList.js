/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import debounce from 'lodash.debounce';
import searchListStyles from '../../../styles/searchListStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const apiKey = '15979629ea6e558ef491c9b9ccee0043';

const SearchList = ({handleShowOptions, likedList, myList, watchedList}) => {
  const isLiked = movieId => likedList.some(movie => movie.id === movieId);
  const isSaved = movieId => myList.some(movie => movie.id === movieId);
  const isWatched = movieId => watchedList.some(movie => movie.id === movieId);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedFetchSuggestions = useCallback(
    debounce(query => fetchSuggestions(query), 300), // 300ms debounce
    [],
  );

  const fetchSuggestions = async query => {
    if (query.length < 3) {
      return;
    } // Minimum length to start fetching

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query,
        )}`,
      );
      const data = await response.json();
      setSuggestions(data.results.slice(0, 10));
    } catch (error) {
      console.error('Error fetching movie suggestions:', error);
    }
  };

  const handleChangeText = text => {
    setQuery(text);
    debouncedFetchSuggestions(text);
  };

  const handleSuggestionPress = movie => {
    setQuery(movie.title);
    setSuggestions([]);
  };

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query,
        )}`,
      );
      const data = await response.json();
      setResults(data.results.slice(0, 10)); // Increase the number of results displayed
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSuggestions([]);
  };

  return (
    <View style={searchListStyles.container}>
      <TextInput
        style={searchListStyles.input}
        placeholder="Search for movies..."
        placeholderTextColor="#FBF4F4"
        value={query}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && suggestions.length > 0 && (
        <FlatList
          style={searchListStyles.suggestionsList}
          data={suggestions}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={searchListStyles.suggestionItem}
              onPress={() => handleSuggestionPress(item)}>
              <Text style={searchListStyles.suggestionText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={searchListStyles.buttonContainer}>
        <TouchableOpacity
          style={searchListStyles.button}
          onPress={searchMovies}>
          <Text style={searchListStyles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={searchListStyles.button} onPress={clearSearch}>
          <Text style={searchListStyles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {results.length > 0 ? (
        <FlatList
          key={results.length}
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={searchListStyles.movieContainer}>
              <TouchableOpacity
                onPress={() => handleShowOptions(item, 'recommendations')}>
                <View style={searchListStyles.posterContainer}>
                  {item.poster_path && (
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                      style={searchListStyles.poster}
                    />
                  )}
                  {isLiked(item.id) && (
                    <Icon
                      name="favorite"
                      size={18}
                      color="white"
                      style={searchListStyles.favoriteIcon}
                    />
                  )}
                  {isSaved(item.id) && (
                    <Icon
                      name="bookmark"
                      size={18}
                      color="white"
                      style={searchListStyles.savedIcon}
                    />
                  )}
                  {isWatched(item.id) && (
                    <Icon
                      name="remove-red-eye"
                      size={18}
                      color="white"
                      style={searchListStyles.watchedIcon}
                    />
                  )}
                </View>
                <Text style={searchListStyles.title}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={3} // Number of columns for the grid
          contentContainerStyle={searchListStyles.resultsContainer}
        />
      ) : (
        <Text style={searchListStyles.noResultsText}>No results found.</Text>
      )}
    </View>
  );
};

export default SearchList;
