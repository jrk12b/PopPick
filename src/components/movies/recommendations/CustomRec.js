import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import MoviePoster from '../MoviePoster';
import styles from '../../../styles/styles';

/**
 * MyList Component
 *
 * This component renders a FlatList displaying a row of movies from the my list data.
 * Each movie is displayed as a MoviePoster component. The component also handles optional
 * rendering of icons for movies in the liked, my list, or watched list.
 *
 * Props:
 * - myList: Array - A list of movies in the user's personal list to display.
 * - likedList: Array - (Optional) A list of liked movies.
 * - watchedList: Array - (Optional) A list of movies the user has already watched.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: navigation for the entire app
 *
 * Behavior:
 * - If myList is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a single row allowing for scrolling, with each movie showing the poster image and icons based on its presence in the liked, my list, or watched list.
 * - If the My List header text is clicked, the user is navigate to the Liked List screen (MyListFull)
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function CustomRec({customMovies, handleShowOptions, navigation}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Custom Recs')}>
        <Text style={styles.sectionTitle}>Custom Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={customMovies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
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

export default CustomRec;
