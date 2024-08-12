import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

const apiKey = '15979629ea6e558ef491c9b9ccee0043';

const SearchList = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query,
        )}`,
      );
      const data = await response.json();
      // Limit results to top 3
      setResults(data.results.slice(0, 3));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={searchMovies} />
        <Button title="Clear" onPress={clearSearch} />
      </View>
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
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
          )}
        />
      ) : (
        <Text>No results found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
});

export default SearchList;
