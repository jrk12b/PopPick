import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import MoviePoster from '../MoviePoster';

function UpcomingRecommendations({
  upcomingMovies,
  handleShowOptions,
  navigation,
}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('UpcomingRecScreen')}>
        <Text style={styles.sectionTitle}>Upcoming Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={upcomingMovies}
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

export default UpcomingRecommendations;
