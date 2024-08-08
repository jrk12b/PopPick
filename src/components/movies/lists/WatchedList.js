import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';

function WatchedList({watchedList, handleShowOptions, navigation}) {
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
                {/* <Text style={styles.title}>{item.title}</Text> */}
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
