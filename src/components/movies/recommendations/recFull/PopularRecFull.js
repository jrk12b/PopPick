import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import fullListStyles from '../../../../styles/fullListStyles';

function PopularRecFull({popularMovies, handleShowOptions}) {
  if (!popularMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={fullListStyles.FlatList}
      data={popularMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={fullListStyles.movieContainer}>
          <TouchableOpacity
            onPress={() => handleShowOptions(item, 'popularMovies')}>
            <Image
              style={fullListStyles.poster}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
            <Text style={fullListStyles.title}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      )}
      numColumns={3}
      columnWrapperStyle={fullListStyles.columnWrapper}
      contentContainerStyle={fullListStyles.gridContainer}
      ListHeaderComponent={
        <Text style={fullListStyles.sectionTitle}>
          Popular Recommendations ({popularMovies.length})
        </Text>
      }
      ListEmptyComponent={
        <Text style={fullListStyles.text}>No movies added yet.</Text>
      }
    />
  );
}

export default PopularRecFull;
