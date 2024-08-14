import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../../../styles/styles';
import MoviePoster from '../../MoviePoster';

function WatchedListFull({watchedList, likedList, myList, handleShowOptions}) {
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
          listType="watchedList"
        />
      )}
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>
          Watched List ({watchedList.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default WatchedListFull;
