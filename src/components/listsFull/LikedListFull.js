import React from 'react';
import {FlatList, Text} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * LikedListFull Component
 *
 * This component renders a FlatList displaying a grid of movies from the liked list data.
 * Each movie is displayed as a MoviePoster component. The component also handles optional
 * rendering of icons for movies in the liked, my list, or watched list.
 *
 * Props:
 * - likedList: Array - A list of liked movies to display.
 * - myList: Array - (Optional) A list of movies in the user's personal list.
 * - watchedList: Array - (Optional) A list of movies the user has already watched.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 *
 * Behavior:
 * - If likedList is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid with 3 columns, with each movie showing the poster image and icons based on its presence in the liked, my list, or watched list.
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function LikedListFull({
  likedList,
  myList,
  watchedList,
  handleShowOptions,
  mediaType,
}) {
  return (
    <FlatList
      style={styles.FlatList}
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
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>Liked ({likedList.length})</Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default LikedListFull;
