/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import debounce from 'lodash.debounce';
import styles from '../../../styles/styles';
import MoviePoster from '../MoviePoster';
import {API_KEY} from '../../../config';
import CustomButton from '../../CustomButton';

// refactor

const SearchList = ({handleShowOptions, likedList, myList, watchedList}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedFetchSuggestions = useCallback(
    debounce(query => fetchSuggestions(query), 300),
    [],
  );

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
