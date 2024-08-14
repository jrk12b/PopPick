import React from 'react';
import {FlatList, Text} from 'react-native';
import styles from '../../../../styles/styles';
import MoviePoster from '../../MoviePoster';

function LikedListFull({likedList, myList, watchedList, handleShowOptions}) {
  return (
    <FlatList
      style={styles.FlatList}
      data={likedList}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <MoviePoster
          item={item}
          likedList={likedList}
          myList={myList}
          watchedList={watchedList}
          handleShowOptions={handleShowOptions}
          listType="likedList"
        />
      )}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>Liked ({likedList.length})</Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default LikedListFull;
