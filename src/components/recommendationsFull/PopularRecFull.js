import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * PopularRecFull Component
 *
 * This component renders a FlatList displaying a grid of popular movies that have been recommended to the user.
 * Each movie is displayed as a Poster component, allowing users to view additional details.
 *
 * Props:
 * - popularMovies: Array - A list of popular movies recommended to the user.
 * - handleShowOptions: Function - A callback function invoked when a movie is selected to display options.
 * - mediaType: String - The type of media being displayed (e.g., 'movies' or 'video games').
 *
 * Behavior:
 * - If popularMovies is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid layout with 3 columns, showcasing each movie's poster image.
 * - If a specific movie is clicked, handleShowOptions is called to provide options for that movie.
 * - If popularMovies is not yet loaded, a loading message "Loading..." is displayed.
 */
function PopularRecFull({popularMovies, handleShowOptions, mediaType}) {
  if (!popularMovies) {
    return <Text>Loading...</Text>;
  }
  let flattenedData = [];

  if (mediaType === 'books' && popularMovies?.works) {
    // When mediaType is 'books', extract the works array
    flattenedData = popularMovies.works;
  } else if (Array.isArray(popularMovies)) {
    // For other media types, use the data as is
    flattenedData = popularMovies;
  }

  const keyExtractor = item =>
    mediaType === 'books'
      ? item.cover_id?.toString() || item.key // fallback to a different key if cover_id is not available
      : item.id?.toString() || item.key;

  const renderItem = ({item}) => (
    <Poster
      item={item}
      handleShowOptions={handleShowOptions}
      mediaType={mediaType}
    />
  );
  return (
    <FlatList
      style={styles.FlatList}
      data={flattenedData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>
          Popular Recommendations ({flattenedData.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default PopularRecFull;
