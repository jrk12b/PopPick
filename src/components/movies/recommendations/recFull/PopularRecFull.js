import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../../../styles/styles';
import MoviePoster from '../../MoviePoster';

/**
 * PopularRecFull Component
 *
 * This component renders a FlatList displaying a grid of movies from the popularMovies data.
 * Each movie is displayed as a MoviePoster component.
 *
 * Props:
 * - popularMovies: Array - A list of popular movies that has been recommended to the user.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 *
 * Behavior:
 * - If popularMovies is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid with 3 columns, with each movie showing the poster image
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function PopularRecFull({popularMovies, handleShowOptions, mediaType}) {
  if (!popularMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={styles.FlatList}
      data={popularMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <MoviePoster
          item={item}
          handleShowOptions={handleShowOptions}
          listType="popularMovies"
          mediaType={mediaType}
        />
      )}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>
          Popular Recommendations ({popularMovies.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default PopularRecFull;
