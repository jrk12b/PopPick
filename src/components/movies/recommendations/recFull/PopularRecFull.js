import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../../styles/styles';

function PopularRecFull({popularMovies, handleShowOptions}) {
  if (!popularMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={styles.FlatList}
      data={popularMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.movieContainerFull}>
          <TouchableOpacity
            onPress={() => handleShowOptions(item, 'popularMovies')}>
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
      numColumns={3}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>
          Popular Recommendations ({popularMovies.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default PopularRecFull;
