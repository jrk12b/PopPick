import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from '../../styles/styles';

function BooksScreen() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>Books Screen</Text>
      </View>
    </ScrollView>
  );
}

export default BooksScreen;
