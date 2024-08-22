import React, {useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';
import CustomButton from '../general/CustomButton';
import {API_KEY, VIDEO_GAME_CLIENT_ID} from '../../config';
import {getAccessToken} from '../../hooks/videoGames/auth';

const SearchList = ({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  mediaType,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchMedia = async () => {
    if (mediaType === 'movies') {
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
    } else if (mediaType === 'videoGames') {
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
        placeholder={`Search for ${
          mediaType === 'movies' ? 'movies' : 'video games'
        }...`}
        placeholderTextColor="#FBF4F4"
        value={query}
        onChangeText={text => {
          setQuery(text);
        }}
      />
      <CustomButton
        title="Search"
        onPress={searchMedia}
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
          data={results}
          keyExtractor={item => item.id.toString()}
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
