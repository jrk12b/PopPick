import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * WatchedListFull Component
 *
 * This component renders a FlatList displaying a grid of media items (movies or video games) from the watched list data.
 * Each item is displayed as a Poster component. The component also handles optional
 * rendering of icons for items in the liked, my list, or watched list.
 *
 * Props:
 * - watchedList: Array - A list of media items that the user has already watched or played.
 * - myList: Array - (Optional) A list of media items in the user's personal list.
 * - likedList: Array - (Optional) A list of liked media items.
 * - handleShowOptions: Function - A callback function to handle actions when a media item is selected.
 * - mediaType: String - The type of media being displayed (either 'movies' or 'videoGames').
 *
 * Behavior:
 * - If watchedList is empty, the component displays a message "No movies/games added yet."
 * - Media items are displayed in a grid with 3 columns, with each item showing the poster image and icons based on its presence in the liked, my list, or watched list.
 * - If a specific media item is clicked, handleShowOptions is called to display options.
 */
function WatchedListFull({
  watchedList,
  likedList,
  myList,
  handleShowOptions,
  mediaType,
}) {
  const keyExtractor = item =>
    mediaType === 'books'
      ? item.cover_id?.toString() || item.key // fallback to a different key if cover_id is not available
      : item.id?.toString() || item.key;
  const title =
    mediaType === 'books'
      ? 'Read'
      : mediaType === 'movies' || mediaType === 'TV Shows'
      ? 'Watched'
      : 'Played';
  return (
    <FlatList
      style={styles.FlatList}
      data={watchedList}
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
        <Text style={styles.sectionTitle}>
          {title} List ({watchedList.length})
        </Text>
      }
      ListEmptyComponent={
        <Text style={styles.text}>
          No {mediaType === 'movies' ? 'movies' : 'games'} added yet.
        </Text>
      }
    />
  );
}

export default WatchedListFull;
