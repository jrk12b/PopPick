import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import fullListStyles from '../../../styles/fullListStyles';

function WatchedList({watchedList, handleShowOptions}) {
  return (
    <FlatList
      style={fullListStyles.FlatList}
      data={watchedList}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={fullListStyles.movieContainer}>
          <TouchableOpacity
            onPress={() => handleShowOptions(item, 'watchedList')}>
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
          Watched List ({watchedList.length})
        </Text>
      }
      ListEmptyComponent={
        <Text style={fullListStyles.text}>No movies added yet.</Text>
      }
    />
  );
}

export default WatchedList;
