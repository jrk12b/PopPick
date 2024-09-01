import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Poster from '../general/Poster';
import styles from '../../styles/styles';

/**
 * MyList Component
 *
 * This component renders a FlatList displaying a row of media items from the user's personal list.
 * The media items could be video games, movies, books, or TV shows. Each item is displayed as a
 * Poster component, with optional icons indicating whether it is in the liked, personal, or watched list.
 *
 * Props:
 * - myList: Array - A list of media items added to the user's personal list.
 * - likedList: Array - (Optional) A list of media items the user has liked.
 * - watchedList: Array - (Optional) A list of media items the user has already watched or played.
 * - handleShowOptions: Function - A callback function to handle actions when a media item is selected.
 * - navigation: Object - Navigation object for handling screen transitions.
 * - mediaType: String - The type of media being displayed (e.g., 'movies', 'videoGames', 'books', 'tvShows').
 *
 * Behavior:
 * - If myList is empty, the component displays a message indicating that no items have been added yet.
 * - Media items are displayed in a single horizontal row allowing for scrolling, with each item showing
 *   the poster image and relevant icons based on its presence in the liked, personal, or watched/played list.
 * - Clicking the "My List" header navigates the user to the full My List screen specific to the media type.
 * - Clicking on a specific media item triggers the handleShowOptions function to display available options.
 */
function MyList({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  navigation,
  mediaType,
}) {
  const keyExtractor = item => item.id?.toString() || item.key;
  // Determine the appropriate page title based on the media type
  const page = `My List ${mediaType}`;

  return (
    <View style={styles.sectionContainer}>
      {/* Navigate to the full My List screen when the header is clicked */}
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>My List ({myList.length})</Text>
      </TouchableOpacity>

      {/* Display a message if the personal list is empty */}
      {myList.length === 0 ? (
        <Text style={styles.text}>No items added yet.</Text>
      ) : (
        // Render the personal list media items as a horizontal scrolling list
        <FlatList
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
          horizontal
        />
      )}
    </View>
  );
}

export default MyList;
