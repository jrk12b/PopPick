import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import myListFullStyles from '../../../styles/myListFullStyles';

function MyListFull({myList, handleShowOptions}) {
  return (
    <FlatList
      style={myListFullStyles.FlatList}
      data={myList}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={myListFullStyles.movieContainer}>
          <TouchableOpacity onPress={() => handleShowOptions(item, 'myList')}>
            <Image
              style={myListFullStyles.poster}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
            <Text style={myListFullStyles.title}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      )}
      numColumns={3}
      columnWrapperStyle={myListFullStyles.columnWrapper}
      contentContainerStyle={myListFullStyles.gridContainer}
      ListHeaderComponent={
        <Text style={myListFullStyles.sectionTitle}>
          My List ({myList.length})
        </Text>
      }
      ListEmptyComponent={
        <Text style={myListFullStyles.text}>No movies added yet.</Text>
      }
    />
  );
}

export default MyListFull;
