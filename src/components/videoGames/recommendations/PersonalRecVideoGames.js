import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../../styles/styles';
import VideoGamePoster from '../VideoGamePoster';

function PersonalRecVideoGames({
  personalVideoGames,
  handleShowOptions,
  navigation,
}) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Personal Recs')}>
        <Text style={styles.sectionTitle}>Personal Video Games</Text>
      </TouchableOpacity>

      <FlatList
        data={personalVideoGames}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <VideoGamePoster
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

export default PersonalRecVideoGames;
