import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * WatchedList Component
 *
 * This component renders a FlatList displaying a row of items from the watched (or played) list data.
 * Each item is displayed as a Poster component. The component also handles optional
 * rendering of icons for items in the liked list, my list, or watched list.
 *
 * Props:
 * - watchedList: Array - A list of media items the user has already watched or played.
 * - myList: Array - (Optional) A list of media items in the user's personal list.
 * - likedList: Array - (Optional) A list of liked media items.
 * - handleShowOptions: Function - A callback function to handle actions when a media item is selected.
 * - navigation: Object - The navigation object for navigating between screens in the app.
 * - mediaType: String - The type of media being displayed (either 'movies' or 'videoGames').
 *
 * Behavior:
 * - If watchedList is empty, the component displays a message "No movies/games added yet."
 * - Media items are displayed in a single row allowing for horizontal scrolling, with each item showing the poster image and icons based on its presence in the liked, my list, or watched list.
 * - If the Watched/Played List header text is clicked, the user is navigated to the Watched/Played List screen (WatchedListFull or PlayedListFull).
 * - If a specific media item is clicked, handleShowOptions is called to display options.
 */
function WatchedList({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  navigation,
  mediaType,
}) {
  const keyExtractor = item =>
    mediaType === 'books'
      ? item.cover_id?.toString() || item.key // fallback to a different key if cover_id is not available
      : item.id?.toString() || item.key;
  // Determine the title based on the media type (Watched for movies, Played for video games)
  const title =
    mediaType === 'books'
      ? 'Read'
      : mediaType === 'movies' || mediaType === 'TV Shows'
      ? 'Watched'
      : 'Played';

  return (
    <View style={styles.sectionContainer}>
      {/* Navigates to the full Watched/Played List screen when the title is pressed */}
      <TouchableOpacity
        onPress={() => navigation.navigate(`${title} List ${mediaType}`)}>
        <Text style={styles.sectionTitle}>
          {title} ({watchedList.length})
        </Text>
      </TouchableOpacity>

      {/* Displays a message if there are no items in the watched/played list */}
      {watchedList.length === 0 ? (
        <Text style={styles.text}>
          No {mediaType === 'movies' ? 'movies' : 'games'} added yet.
        </Text>
      ) : (
        // Renders the watched/played items as a horizontal list of Poster components
        <FlatList
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
          horizontal
        />
      )}
    </View>
  );
}

export default WatchedList;
