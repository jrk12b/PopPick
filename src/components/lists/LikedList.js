import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';

/**
 * LikedList Component
 *
 * This component renders a FlatList displaying a row of liked media items, which could be
 * video games, movies, books, or TV shows. Each item is displayed as a Poster component.
 * The component also handles optional rendering of icons indicating whether an item is in
 * the liked list, personal list, or watched list.
 *
 * Props:
 * - likedList: Array - A list of liked media items to display.
 * - myList: Array - (Optional) A list of media items in the user's personal list.
 * - watchedList: Array - (Optional) A list of media items the user has already watched or played.
 * - handleShowOptions: Function - A callback function to handle actions when a media item is selected.
 * - navigation: Object - Navigation object for handling screen transitions.
 * - mediaType: String - The type of media being displayed (e.g., 'movies', 'videoGames', 'books', 'tvShows').
 *
 * Behavior:
 * - If likedList is empty, the component displays a message indicating that no items have been added yet.
 * - Media items are displayed in a single horizontal row allowing for scrolling, with each item showing
 *   the poster image and relevant icons based on its presence in the liked, personal, or watched/played list.
 * - Clicking the "Liked" header navigates the user to the full Liked List screen specific to the media type.
 * - Clicking on a specific media item triggers the handleShowOptions function to display available options.
 */
function LikedList({
  likedList,
  myList,
  watchedList,
  handleShowOptions,
  navigation,
  mediaType,
}) {
  const keyExtractor = item => item.id?.toString() || item.key;
  // Determine the appropriate page title based on the media type
  const page = `Liked List ${mediaType}`;

  return (
    <View style={styles.sectionContainer}>
      {/* Navigate to the full Liked List screen when the header is clicked */}
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>Liked ({likedList.length})</Text>
      </TouchableOpacity>

      {/* Display a message if the liked list is empty */}
      {likedList.length === 0 ? (
        <Text style={styles.text}>No items added yet.</Text>
      ) : (
        // Render the liked media items as a horizontal scrolling list
        <FlatList
          data={likedList}
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

export default LikedList;
