import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import fullListStyles from '../../../../styles/fullListStyles';
import styles from '../../../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

function WatchedListFull({watchedList, likedList, myList, handleShowOptions}) {
  const isLiked = movieId => likedList.some(movie => movie.id === movieId);
  const isSaved = movieId => myList.some(movie => movie.id === movieId);
  const isWatched = movieId => watchedList.some(movie => movie.id === movieId);
  return (
    <FlatList
      style={fullListStyles.FlatList}
      data={watchedList}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={fullListStyles.movieContainer}>
          <TouchableOpacity
            onPress={() => handleShowOptions(item, 'watchedList')}>
            <Image
              style={fullListStyles.poster}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
            {isLiked(item.id) && (
              <Icon
                name="favorite"
                size={18}
                color="white"
                style={styles.favoriteIcon}
              />
            )}
            {isSaved(item.id) && (
              <Icon
                name="bookmark"
                size={18}
                color="white"
                style={styles.savedIcon}
              />
            )}
            {isWatched(item.id) && (
              <Icon
                name="remove-red-eye"
                size={18}
                color="white"
                style={styles.watchedIcon}
              />
            )}
            <Text style={fullListStyles.title}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      )}
      numColumns={3}
      columnWrapperStyle={fullListStyles.columnWrapper}
      contentContainerStyle={fullListStyles.gridContainer}
      ListHeaderComponent={
        <Text style={fullListStyles.sectionTitle}>
          Watched List ({watchedList.length})
        </Text>
      }
      ListEmptyComponent={
        <Text style={fullListStyles.text}>No movies added yet.</Text>
      }
    />
  );
}

export default WatchedListFull;
