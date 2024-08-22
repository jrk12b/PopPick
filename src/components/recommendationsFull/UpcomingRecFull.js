import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * UpcomingRecFull Component
 *
 * This component renders a FlatList displaying a grid of movies from the upcomingMovies data.
 * Each movie is displayed as a Poster component.
 *
 * Props:
 * - upcomingMovies: Array - A list of upcoming movies that has been recommended to the user.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 *
 * Behavior:
 * - If upcomingMovies is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid with 3 columns, with each movie showing the poster image
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function UpcomingRecFull({upcomingMovies, handleShowOptions, mediaType}) {
  if (!upcomingMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={styles.FlatList}
      data={upcomingMovies}
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
          Upcoming Recommendations ({upcomingMovies.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default UpcomingRecFull;
