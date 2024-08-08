import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import fullListStyles from '../../../styles/fullListStyles';

function LikedListFull({likedList, handleShowOptions}) {
  return (
    <FlatList
      style={fullListStyles.FlatList}
      data={likedList}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={fullListStyles.movieContainer}>
          <TouchableOpacity
            onPress={() => handleShowOptions(item, 'likedList')}>
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
          Liked ({likedList.length})
        </Text>
      }
      ListEmptyComponent={
        <Text style={fullListStyles.text}>No movies added yet.</Text>
      }
    />
  );
}

export default LikedListFull;
