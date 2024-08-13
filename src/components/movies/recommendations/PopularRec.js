import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';

function PopularRecommendations({
  popularMovies,
  handleShowOptions,
  navigation,
}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('PopularRecScreen')}>
        <Text style={styles.sectionTitle}>Popular Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={popularMovies}
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
            </TouchableOpacity>
          </View>
        )}
        horizontal
      />
    </View>
  );
}

export default PopularRecommendations;
