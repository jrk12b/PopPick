/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import debounce from 'lodash.debounce';

const apiKey = '15979629ea6e558ef491c9b9ccee0043';

const SearchList = ({handleShowOptions}) => {
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
      setSuggestions(data.results.slice(0, 5));
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
      setResults(data.results.slice(0, 3));
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={searchMovies}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearSearch}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleShowOptions(item, 'recommendations')}>
              <View style={styles.item}>
                {item.poster_path && (
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                    style={styles.poster}
                  />
                )}
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#595959', // Ensure the background color matches your app's design
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: '#FBF4F4', // Ensure the text color in input matches your design
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FBF4F4', // Set your desired background color for the button
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#595959', // Set the text color for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBF4F4', // Set the text color for the movie title
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  noResultsText: {
    color: '#FBF4F4', // Set the text color for "No results found."
    fontSize: 16,
    textAlign: 'center',
  },
  suggestionsList: {
    position: 'absolute',
    top: 50, // Adjust according to the position of your TextInput
    left: 10,
    right: 10,
    backgroundColor: '#595959',
    maxHeight: 200, // Set a max height for the suggestions list
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
  },
  suggestionText: {
    color: '#FBF4F4',
  },
});

export default SearchList;
