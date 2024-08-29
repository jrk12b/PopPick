import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * PopularRec Component
 *
 * This component renders a FlatList displaying a row of popular movie recommendations.
 * Each movie is displayed as a Poster component, allowing users to view details and options.
 *
 * Props:
 * - popularMovies: Array - A list of popular movies to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: Object - Navigation object for the app, used to navigate between screens.
 * - mediaType: String - The type of media being displayed (e.g., 'movies' or 'video games').
 *
 * Behavior:
 * - Movies are displayed in a single horizontal row, allowing for scrolling, with each movie showing the poster image.
 * - If the "Popular Recommendations" header text is clicked, the user is navigated to the "Popular Recs" screen (PopularRecFull).
 * - If a specific movie is clicked, handleShowOptions is invoked to display options for that movie.
 */
function PopularRec({popularMovies, handleShowOptions, navigation, mediaType}) {
  const page =
    mediaType === 'books'
      ? 'Popular Recs books'
      : mediaType === 'movies'
      ? 'Popular Recs'
      : mediaType === 'TV Shows'
      ? 'Popular Recs TV Shows'
      : 'Popular Rec Video Games';

  // possible refactor, this is repeated elsewhere
  let flattenedData = [];

  if (mediaType === 'books' && popularMovies?.items) {
    // When mediaType is 'books', extract the items array
    flattenedData = popularMovies.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail, // Adjust this line as needed
      // Include any other properties you may need
    }));
  } else if (Array.isArray(popularMovies)) {
    // For other media types, use the data as is
    flattenedData = popularMovies;
  }

  const keyExtractor = item => item.id?.toString() || item.key;

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>Popular Recommendations</Text>
      </TouchableOpacity>
      {flattenedData.length > 0 ? (
        <FlatList
          data={flattenedData}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <Poster
              item={item}
              handleShowOptions={handleShowOptions}
              mediaType={mediaType}
            />
          )}
          horizontal
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
}

export default PopularRec;
