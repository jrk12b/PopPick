import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from '../../styles/styles';

function VideoGamesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>Video Games Screen</Text>
      </View>
    </ScrollView>
  );
}

export default VideoGamesScreen;
