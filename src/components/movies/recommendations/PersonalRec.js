import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import MoviePoster from '../MoviePoster';

function PersonalRecommendations({
  personalMovies,
  handleShowOptions,
  navigation,
}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Personal Recs')}>
        <Text style={styles.sectionTitle}>Personal Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={personalMovies}
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

export default PersonalRecommendations;
