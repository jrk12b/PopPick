import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../../../styles/styles';
import MoviePoster from '../../MoviePoster';

function MyListFull({myList, likedList, watchedList, handleShowOptions}) {
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
          listType="myList"
        />
      )}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>My List ({myList.length})</Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default MyListFull;
