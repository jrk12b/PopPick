import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import MoviePoster from '../MoviePoster';

/**
 * WatchedList Component
 *
 * This component renders a FlatList displaying a row of movies from the watched list data.
 * Each movie is displayed as a MoviePoster component. The component also handles optional
 * rendering of icons for movies in the liked, my list, or watched list.
 *
 * Props:
 * - watchedList: Array - A list of movies the user has already watched to display.
 * - myList: Array - (Optional) A list of movies in the user's personal list..
 * - likedList: Array - (Optional) A list of liked movies.
 * - watchedList: Array - (Optional) A list of movies the user has already watched.
 * - handleShowOptions: Function - A callback function to handle actions when a movie is selected.
 *
 * Behavior:
 * - If wacthedList is empty, the component displays a message "No movies added yet."
 * - Movies are displayed in a single row allowing for scrolling, with each movie showing the poster image and icons based on its presence in the liked, my list, or watched list.
 * - If the Watched List header text is clicked, the user is navigate to the Liked List screen (WatchedListFull)
 * - If a specific movie is clicked, handleShowOptions are displayed.
 * - navigation: navigation for the entire app
 */
function WatchedList({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  navigation,
}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Watched List')}>
        <Text style={styles.sectionTitle}>Watched ({watchedList.length})</Text>
      </TouchableOpacity>
      {watchedList.length === 0 ? (
        <Text style={styles.text}>No movies added yet.</Text>
      ) : (
        <FlatList
          data={watchedList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <MoviePoster
              item={item}
              likedList={likedList}
              myList={myList}
              watchedList={watchedList}
              handleShowOptions={handleShowOptions}
              listType="watchedList"
            />
          )}
          horizontal
        />
      )}
    </View>
  );
}

export default WatchedList;
