import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import fullListStyles from '../../../styles/fullListStyles';

function TopRecFull({topMovies, handleShowOptions}) {
  if (!topMovies) {
    return <Text>Loading...</Text>;
  }
  return (
    <FlatList
      style={fullListStyles.FlatList}
      data={topMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={fullListStyles.movieContainer}>
          <TouchableOpacity
            onPress={() => handleShowOptions(item, 'topMovies')}>
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
          Top Recommendations ({topMovies.length})
        </Text>
      }
      ListEmptyComponent={
        <Text style={fullListStyles.text}>No movies added yet.</Text>
      }
    />
  );
}

export default TopRecFull;
