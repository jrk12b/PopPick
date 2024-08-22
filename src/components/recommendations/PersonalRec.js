import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * PersonalRec Component
 *
 * This component renders a FlatList displaying a row of movies from the personalMovies data.
 * Each movie is displayed as a MoviePoster component.
 *
 * Props:
 * - personalMovies: Array - A list of recommended movies to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: navigation for the entire app
 *
 * Behavior:
 * - Movies are displayed in a single row allowing for scrolling, with each movie showing the poster image
 * - If the Personal Recommendations header text is clicked, the user is navigate to the Personal Recs screen (PersonalRecFull)
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function PersonalRec({
  personalMovies,
  handleShowOptions,
  navigation,
  mediaType,
}) {
  const page =
    mediaType === 'movies' ? 'Personal Recs' : 'Personal Rec Video Games';
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>Personal Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={personalMovies}
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

export default PersonalRec;
