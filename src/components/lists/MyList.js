import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Poster from '../general/Poster';
import styles from '../../styles/styles';

function MyList({
  myList,
  likedList,
  watchedList,
  handleShowOptions,
  navigation,
  mediaType,
}) {
  const page = mediaType === 'movies' ? 'My List' : 'My List Video Games';
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>My List ({myList.length})</Text>
      </TouchableOpacity>

      {myList.length === 0 ? (
        <Text style={styles.text}>No items added yet.</Text>
      ) : (
        <FlatList
          data={myList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Poster
              item={item}
              likedList={likedList}
              myList={myList}
              watchedList={watchedList}
              handleShowOptions={handleShowOptions}
              mediaType={mediaType}
            />
          )}
          horizontal
        />
      )}
    </View>
  );
}

export default MyList;
