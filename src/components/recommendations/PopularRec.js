import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import MoviePoster from '../general/Poster';

/**
 * PopularRec Component
 *
 * This component renders a FlatList displaying a row of movies from the popularMovies data.
 * Each movie is displayed as a MoviePoster component.
 *
 * Props:
 * - popularMovies: Array - A list of recommended movies to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: navigation for the entire app
 *
 * Behavior:
 * - Movies are displayed in a single row allowing for scrolling, with each movie showing the poster image
 * - If the Popular Recommendations header text is clicked, the user is navigate to the Popular Recs screen (PopularRecFull)
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function PopularRec({popularMovies, handleShowOptions, navigation, mediaType}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Popular Recs')}>
        <Text style={styles.sectionTitle}>Popular Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={popularMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MoviePoster
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

export default PopularRec;
