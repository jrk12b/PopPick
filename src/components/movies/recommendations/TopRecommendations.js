import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';

function TopRecommendations({topMovies, handleShowOptions}) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Top Rated Recommendations</Text>
      <FlatList
        data={topMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.movieContainer}>
            <TouchableOpacity
              onPress={() => handleShowOptions(item, 'recommendations')}>
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
    </View>
  );
}

export default TopRecommendations;
