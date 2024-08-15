import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import MoviePoster from '../MoviePoster';

/**
 * UpcomingRec Component
 *
 * This component renders a FlatList displaying a row of movies from the upcomingMovies data.
 * Each movie is displayed as a MoviePoster component.
 *
 * Props:
 * - upcomingMovies: Array - A list of recommended movies to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: navigation for the entire app
 *
 * Behavior:
 * - Movies are displayed in a single row allowing for scrolling, with each movie showing the poster image
 * - If the Upcoming Recommendations header text is clicked, the user is navigate to the Upcoming Recs screen (UpcomingRecFull)
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function UpcomingRec({upcomingMovies, handleShowOptions, navigation}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Upcoming Recs')}>
        <Text style={styles.sectionTitle}>Upcoming Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={upcomingMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MoviePoster
            item={item}
            handleShowOptions={handleShowOptions}
            listType="recommendations"
          />
        )}
        horizontal
      />
    </View>
  );
}

export default UpcomingRec;
