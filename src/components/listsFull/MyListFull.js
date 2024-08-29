import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * MyListFull Component
 *
 * This component renders a FlatList displaying a grid of media items (movies or video games) from the user's personal list.
 * Each item is displayed as a Poster component. The component also handles optional
 * rendering of icons for items in the liked, my list, or watched list.
 *
 * Props:
 * - myList: Array - A list of media items in the user's personal list to display.
 * - likedList: Array - (Optional) A list of liked media items.
 * - watchedList: Array - (Optional) A list of media items the user has already watched or played.
 * - handleShowOptions: Function - A callback function to handle actions when a media item is selected.
 * - mediaType: String - The type of media being displayed (either 'movies' or 'videoGames').
 *
 * Behavior:
 * - If myList is empty, the component displays a message "No movies/games added yet."
 * - Media items are displayed in a grid with 3 columns, with each item showing the poster image and icons based on its presence in the liked, my list, or watched list.
 * - If a specific media item is clicked, handleShowOptions is called to display options.
 */
function MyListFull({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  mediaType,
}) {
  const keyExtractor = item => item.id?.toString() || item.key;
  return (
    <FlatList
      style={styles.FlatList}
      data={myList}
      keyExtractor={keyExtractor}
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
        <Text style={styles.sectionTitle}>My List ({myList.length})</Text>
      }
      ListEmptyComponent={
        <Text style={styles.text}>
          No {mediaType === 'movies' ? 'movies' : 'games'} added yet.
        </Text>
      }
    />
  );
}

export default MyListFull;
