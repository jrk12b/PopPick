import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

function WatchedList({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  navigation,
}) {
  const isLiked = movieId => likedList.some(movie => movie.id === movieId);
  const isSaved = movieId => myList.some(movie => movie.id === movieId);
  const isWatched = movieId => watchedList.some(movie => movie.id === movieId);
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('WatchedListScreen')}>
        <Text style={styles.sectionTitle}>Watched ({watchedList.length})</Text>
      </TouchableOpacity>
      {watchedList.length === 0 ? (
        <Text style={styles.text}>No movies added yet.</Text>
      ) : (
        <FlatList
          data={watchedList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <TouchableOpacity
                onPress={() => handleShowOptions(item, 'watchedList')}>
                <Image
                  style={styles.poster}
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
              </TouchableOpacity>
            </View>
          )}
          horizontal
        />
      )}
    </View>
  );
}

export default WatchedList;
