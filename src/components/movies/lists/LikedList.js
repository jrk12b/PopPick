import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';

function LikedList({likedList, handleShowOptions, navigation}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('LikedListScreen')}>
        <Text style={styles.sectionTitle}>Liked ({likedList.length})</Text>
      </TouchableOpacity>
      {likedList.length === 0 ? (
        <Text style={styles.text}>No movies added yet.</Text>
      ) : (
        <FlatList
          data={likedList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <TouchableOpacity
                onPress={() => handleShowOptions(item, 'likedList')}>
                <Image
                  style={styles.poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          horizontal
        />
      )}
    </View>
  );
}

export default LikedList;
