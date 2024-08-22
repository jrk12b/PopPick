import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * LikedList Component
 *
 * This component renders a FlatList displaying a row of movies from the liked list data.
 * Each movie is displayed as a Poster component. The component also handles optional
 * rendering of icons for movies in the liked, my list, or watched list.
 *
 * Props:
 * - likedList: Array - A list of liked movies to display.
 * - watchedList: Array - (Optional) A list of movies the user has already watched.
 * - myList: Array - (Optional) A list of movies in the user's personal list.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 * - navigation: navigation for the entire app
 *
 * Behavior:
 * - If likedList is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a single row allowing for scrolling, with each movie showing the poster image and icons based on its presence in the liked, my list, or watched list.
 * - If the Liked List header text is clicked, the user is navigate to the Liked List screen (LikedListFull)
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function LikedList({
  likedList,
  myList,
  watchedList,
  handleShowOptions,
  navigation,
  mediaType,
}) {
  console.log('liked here: ' + likedList);
  const page = mediaType === 'movies' ? 'Liked List' : 'Liked List Video Games';
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>Liked ({likedList.length})</Text>
      </TouchableOpacity>
      {likedList.length === 0 ? (
        <Text style={styles.text}>No movies added yet.</Text>
      ) : (
        <FlatList
          data={likedList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Poster
              item={item}
              likedList={likedList}
              myList={myList}
              watchedList={watchedList}
              handleShowOptions={handleShowOptions}
              mediaType={mediaType}
            />
          )}
          horizontal
        />
      )}
    </View>
  );
}

export default LikedList;
