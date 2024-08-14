import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import MoviePoster from '../MoviePoster';

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
