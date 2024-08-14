import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import MoviePoster from '../MoviePoster';

function TopRecommendations({topMovies, handleShowOptions, navigation}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Top Recs')}>
        <Text style={styles.sectionTitle}>Top Rated Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={topMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MoviePoster
            item={item}
            handleShowOptions={handleShowOptions}
            listType="recommendations"
          />
        )}
        horizontal
      />
    </View>
  );
}

export default TopRecommendations;
