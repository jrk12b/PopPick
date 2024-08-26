import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Poster from '../general/Poster';
import styles from '../../styles/styles';

/**
 * CustomRec Component
 *
 * This component renders a FlatList displaying a row of custom movie recommendations.
 * Each recommendation is displayed as a Poster component. The component allows users
 * to navigate to a detailed screen of custom recommendations.
 *
 * Props:
 * - customMovies: Array - A list of custom movie recommendations to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: Object - Navigation object for the app, used to navigate between screens.
 * - mediaType: String - The type of media being displayed (e.g., 'movies').
 *
 * Behavior:
 * - If customMovies is empty, the component does not display any items (no empty state message).
 * - Movies are displayed in a single horizontal row, allowing for scrolling, with each movie showing the poster image.
 * - If the "Custom Recommendations" header text is clicked, the user is navigated to the "Custom Recs" screen.
 * - If a specific movie recommendation is clicked, handleShowOptions is invoked to display options for that movie.
 */
function CustomRec({customMovies, handleShowOptions, navigation, mediaType}) {
  const page =
    mediaType === 'movies'
      ? 'Custom Recs'
      : mediaType === 'TV Shows'
      ? 'Custom Recs TV Shows'
      : 'Custom Rec Video Games';
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>Custom Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={customMovies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
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

export default CustomRec;
