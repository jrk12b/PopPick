import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';

const SearchResults = ({results}) => {
  // Display only the top three results
  const topResults = results.slice(0, 2);

  return (
    <View style={styles.container}>
      {topResults.length > 0 ? (
        <FlatList
          data={topResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.resultItem}>
              {item.poster_path && (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.poster}
                />
              )}
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No results found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBF4F4',
  },
});

export default SearchResults;
