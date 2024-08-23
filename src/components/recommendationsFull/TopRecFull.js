import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * TopRecFull Component
 *
 * This component renders a FlatList displaying a grid of top-rated movies recommended to the user.
 * Each movie is represented as a Poster component, providing a visual representation of the movie.
 *
 * Props:
 * - topMovies: Array - A list of top-rated movies that have been recommended to the user.
 * - handleShowOptions: Function - A callback function invoked when a movie is selected to display options.
 * - mediaType: String - The type of media being displayed (e.g., 'movies' or 'video games').
 *
 * Behavior:
 * - If topMovies is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid layout with 3 columns, showcasing each movie's poster image.
 * - If a specific movie is clicked, handleShowOptions is called to provide options for that movie.
 * - If topMovies is not yet loaded, a loading message "Loading..." is displayed.
 */
function TopRecFull({topMovies, handleShowOptions, mediaType}) {
  if (!topMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={styles.FlatList}
      data={topMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <Poster
          item={item}
          handleShowOptions={handleShowOptions}
          mediaType={mediaType}
        />
      )}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>
          Top Recommendations ({topMovies.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default TopRecFull;
