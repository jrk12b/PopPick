import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * TopRec Component
 *
 * This component renders a FlatList displaying a row of movies from the topMovies data.
 * Each movie is displayed as a Poster component.
 *
 * Props:
 * - topMovies: Array - A list of recommended movies to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: navigation for the entire app
 *
 * Behavior:
 * - Movies are displayed in a single row allowing for scrolling, with each movie showing the poster image
 * - If the Top Recommendations header text is clicked, the user is navigate to the Top Recs screen (TopRecFull)
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function TopRec({topMovies, handleShowOptions, navigation, mediaType}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Top Recs')}>
        <Text style={styles.sectionTitle}>Top Rated Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={topMovies}
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

export default TopRec;
