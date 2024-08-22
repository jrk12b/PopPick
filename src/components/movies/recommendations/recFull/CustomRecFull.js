import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../../../styles/styles';
import MoviePoster from '../../MoviePoster';

/**
 * PersonalRecFull Component
 *
 * This component renders a FlatList displaying a grid of movies from the personalMovies data.
 * Each movie is displayed as a MoviePoster component.
 *
 * Props:
 * - personalMovies: Array - A list of movies that has been recommended to the user.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 *
 * Behavior:
 * - If personalMovies is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid with 3 columns, with each movie showing the poster image
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function PersonalRecFull({customMovies, handleShowOptions, mediaType}) {
  if (!customMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={styles.FlatList}
      data={customMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <MoviePoster
          item={item}
          handleShowOptions={handleShowOptions}
          listType="personalMovies"
          mediaType={mediaType}
        />
      )}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>
          Custom Recommendations ({customMovies.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default PersonalRecFull;
