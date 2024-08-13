import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../../styles/styles';

function MyList({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  navigation,
}) {
  // Helper function to check if a movie is in the likedList
  const isLiked = movieId => likedList.some(movie => movie.id === movieId);
  const isSaved = movieId => myList.some(movie => movie.id === movieId);
  const isWatched = movieId => watchedList.some(movie => movie.id === movieId);

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('MyListScreen')}>
        <Text style={styles.sectionTitle}>My List ({myList.length})</Text>
      </TouchableOpacity>

      {myList.length === 0 ? (
        <Text style={styles.text}>No movies added yet.</Text>
      ) : (
        <FlatList
          data={myList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <TouchableOpacity
                onPress={() => handleShowOptions(item, 'myList')}>
                <View style={styles.posterContainer}>
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
                </View>
              </TouchableOpacity>
            </View>
          )}
          horizontal
        />
      )}
    </View>
  );
}

export default MyList;
