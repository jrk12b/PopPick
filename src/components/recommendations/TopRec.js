import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * TopRec Component
 *
 * This component renders a FlatList displaying a row of top-rated movie recommendations.
 * Each movie is displayed as a Poster component, allowing users to view details and options.
 *
 * Props:
 * - topMovies: Array - A list of top-rated movies to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: Object - Navigation object for the app, used to navigate between screens.
 * - mediaType: String - The type of media being displayed (e.g., 'movies' or 'video games').
 *
 * Behavior:
 * - Movies are displayed in a single horizontal row, allowing for scrolling, with each movie showing the poster image.
 * - If the "Top Rated Recommendations" header text is clicked, the user is navigated to the "Top Recs" screen (TopRecFull).
 * - If a specific movie is clicked, handleShowOptions is invoked to display options for that movie.
 */
function TopRec({topMovies, handleShowOptions, navigation, mediaType}) {
  const page =
    mediaType === 'movies'
      ? 'Top Recs'
      : mediaType === 'TV Shows'
      ? 'Top Recs TV Shows'
      : 'Top Rec Video Games';
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
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
