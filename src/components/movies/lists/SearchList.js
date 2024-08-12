import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const apiKey = '15979629ea6e558ef491c9b9ccee0043';

const SearchList = ({handleShowOptions}) => {
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
      console.log(data.results); // Debugging line
      setResults(data.results.slice(0, 3));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const handlePress = movie => {
    handleShowOptions(movie, 'recommendations');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
        placeholderTextColor="#FBF4F4"
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.buttonContainer}>
        <CustomButton title="Search" onPress={searchMovies} />
        <CustomButton title="Clear" onPress={clearSearch} />
      </View>
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
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

const CustomButton = ({title, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

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
});

export default SearchList;
