import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../../../styles/styles';
import VideoGamePoster from '../../VideoGamePoster';

/**
 * WatchedListFull Component
 *
 * This component renders a FlatList displaying a grid of movies from the watched list data.
 * Each movie is displayed as a MoviePoster component. The component also handles optional
 * rendering of icons for movies in the liked, my list, or watched list.
 *
 * Props:
 * - watchedList: Array - A list of movies the user has already watched.
 * - myList: Array - (Optional) A list of movies in the user's personal list.
 * - likedList: Array - (Optional) A list of liked movies to display.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 *
 * Behavior:
 * - If myList is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a grid with 3 columns, with each movie showing the poster image and icons based on its presence in the liked, my list, or watched list.
 * - If a specific movie is clicked, handleShowOptions are displayed.
 */
function PlayedListFull({playedListVideoGames, handleShowOptions}) {
  return (
    <FlatList
      style={styles.FlatList}
      data={playedListVideoGames}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <VideoGamePoster
          item={item}
          handleShowOptions={handleShowOptions}
          listType="playedListVideoGames"
        />
      )}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>
          Played List ({playedListVideoGames.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default PlayedListFull;
