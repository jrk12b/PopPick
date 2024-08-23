import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * UpcomingRec Component
 *
 * This component renders a FlatList displaying a row of upcoming movie recommendations.
 * Each movie is displayed as a Poster component, allowing users to view details and options.
 *
 * Props:
 * - upcomingMovies: Array - A list of upcoming movies to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: Object - Navigation object for the app, used to navigate between screens.
 * - mediaType: String - The type of media being displayed (e.g., 'movies' or 'video games').
 *
 * Behavior:
 * - Movies are displayed in a single horizontal row, allowing for scrolling, with each movie showing the poster image.
 * - If the "Upcoming Recommendations" header text is clicked, the user is navigated to the "Upcoming Recs" screen (UpcomingRecFull).
 * - If a specific movie is clicked, handleShowOptions is invoked to display options for that movie.
 */
function UpcomingRec({
  upcomingMovies,
  handleShowOptions,
  navigation,
  mediaType,
}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Upcoming Recs')}>
        <Text style={styles.sectionTitle}>Upcoming Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={upcomingMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Poster
            item={item}
            handleShowOptions={handleShowOptions}
            mediaType={mediaType}
          />
        )}
        horizontal
      />
    </View>
  );
}

export default UpcomingRec;
