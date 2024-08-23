import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * PersonalRecFull Component
 *
 * This component renders a FlatList displaying a grid of movies from the user's personal recommendations.
 * Each movie is displayed as a Poster component, allowing users to view details and options.
 *
 * Props:
 * - customMovies: Array - A list of movies that have been recommended to the user.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - mediaType: String - The type of media being displayed (e.g., 'movies' or 'video games').
 *
 * Behavior:
 * - If customMovies is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid layout with 3 columns, with each movie showing the poster image.
 * - If a specific movie is clicked, handleShowOptions is invoked to display options for that movie.
 * - If customMovies is not yet available, a loading message "Loading..." is displayed.
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
          Custom Recommendations ({customMovies.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default PersonalRecFull;
