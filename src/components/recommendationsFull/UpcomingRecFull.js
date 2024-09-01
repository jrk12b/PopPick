import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';
import {keyExtractor} from '../../components/general/ListConstants';

/**
 * UpcomingRecFull Component
 *
 * This component renders a FlatList displaying a grid of upcoming movies recommended to the user.
 * Each movie is represented as a Poster component, providing a visual representation of the movie.
 *
 * Props:
 * - upcomingMovies: Array - A list of upcoming movies that have been recommended to the user.
 * - handleShowOptions: Function - A callback function invoked when a movie is selected to display options.
 * - mediaType: String - The type of media being displayed (e.g., 'movies' or 'video games').
 *
 * Behavior:
 * - If upcomingMovies is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid layout with 3 columns, showcasing each movie's poster image.
 * - If a specific movie is clicked, handleShowOptions is called to provide options for that movie.
 * - If upcomingMovies is not yet loaded, a loading message "Loading..." is displayed.
 */
function UpcomingRecFull({upcomingMovies, handleShowOptions, mediaType}) {
  if (!upcomingMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={styles.FlatList}
      data={upcomingMovies}
      keyExtractor={keyExtractor}
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
