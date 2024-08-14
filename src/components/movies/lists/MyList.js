import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import MoviePoster from '../MoviePoster';
import styles from '../../../styles/styles';

function MyList({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  navigation,
}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('My List')}>
        <Text style={styles.sectionTitle}>My List ({myList.length})</Text>
      </TouchableOpacity>

      {myList.length === 0 ? (
        <Text style={styles.text}>No movies added yet.</Text>
      ) : (
        <FlatList
          data={myList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <MoviePoster
              item={item}
              likedList={likedList}
              myList={myList}
              watchedList={watchedList}
              handleShowOptions={handleShowOptions}
              listType="myList"
            />
          )}
          horizontal
        />
      )}
    </View>
  );
}

export default MyList;
