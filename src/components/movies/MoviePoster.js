import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';

const MovieItem = ({
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

export default MovieItem;
