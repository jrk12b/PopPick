import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';

function MyList({myList, handleShowOptions}) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>My List ({myList.length})</Text>
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
                <Image
                  style={styles.poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
                <Text style={styles.title}>{item.title}</Text>
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
