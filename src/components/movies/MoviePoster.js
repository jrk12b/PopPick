import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';

/**
 * MoviePoster Component
 *
 * This functional component renders a movie item within a list, displaying its poster,
 * title, and relevant icons based on whether the movie is liked, saved, or watched.
 *
 * Props:
 * - item: Object - The movie data to be displayed, including its id, title, and poster path.
 * - likedList: Array (optional) - A list of movies that have been liked by the user.
 * - myList: Array (optional) - A list of movies that have been saved by the user.
 * - watchedList: Array (optional) - A list of movies that have been watched by the user.
 * - handleShowOptions: Function - A callback function triggered when the movie item is pressed.
 * - listType: String - A string indicating the type of list the movie belongs to (e.g., "likedList").
 *
 * Behavior:
 * - The component checks if the movie is liked, saved, or watched by comparing the movie's ID
 *   with the IDs in the provided lists.
 * - If the movie is liked, saved, or watched, the corresponding icon is displayed over the poster.
 * - When the movie item is pressed, the handleShowOptions function is invoked with the movie item
 *   and the listType as arguments.
 *
 * Rendering:
 * - The movie's poster is displayed using the provided URI.
 * - Icons are conditionally rendered based on the movie's status (liked, saved, or watched).
 * - The movie's title is displayed beneath the poster.
 */
const MoviePoster = ({
  item,
  likedList = [],
  myList = [],
  watchedList = [],
  handleShowOptions,
  listType,
}) => {
  // Check if lists are defined and not empty
  const isLiked = likedList && likedList.some(movie => movie.id === item.id);
  const isSaved = myList && myList.some(movie => movie.id === item.id);
  const isWatched =
    watchedList && watchedList.some(movie => movie.id === item.id);

  return (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handleShowOptions(item, listType)}>
        <Image
          style={styles.poster}
          source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        />
        {isLiked && (
          <Icon
            name="favorite"
            size={18}
            color="white"
            style={styles.favoriteIcon}
          />
        )}
        {isSaved && (
          <Icon
            name="bookmark"
            size={18}
            color="white"
            style={styles.savedIcon}
          />
        )}
        {isWatched && (
          <Icon
            name="remove-red-eye"
            size={18}
            color="white"
            style={styles.watchedIcon}
          />
        )}
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoviePoster;
