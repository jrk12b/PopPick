/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import MoviePoster from '../VideoGamePoster';

function PersonalRec({personalVideoGames, navigation}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Personal Recs')}>
        <Text style={styles.sectionTitle}>Personal Video Games</Text>
      </TouchableOpacity>
      {/* Display the titles of the personal video games */}
      <View style={{marginVertical: 10}}>
        {personalVideoGames.map(game => (
          <Text key={game.id} style={styles.gameTitle}>
            {game.name}
          </Text>
        ))}
      </View>

      <FlatList
        data={personalVideoGames}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MoviePoster item={item} listType="recommendations" />
        )}
        horizontal
      />
    </View>
  );
}

export default PersonalRec;
