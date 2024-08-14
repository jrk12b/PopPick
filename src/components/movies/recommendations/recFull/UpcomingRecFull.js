import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../../styles/styles';

function UpcomingRecFull({upcomingMovies, handleShowOptions}) {
  if (!upcomingMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={styles.FlatList}
      data={upcomingMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.movieContainerFull}>
          <TouchableOpacity
            onPress={() => handleShowOptions(item, 'upcomingMovies')}>
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
          Upcoming Recommendations ({upcomingMovies.length})
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No movies added yet.</Text>}
    />
  );
}

export default UpcomingRecFull;
