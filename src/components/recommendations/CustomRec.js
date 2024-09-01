import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Poster from '../general/Poster';
import styles from '../../styles/styles';
import {getPageName} from '../../components/general/ListConstants';

function CustomRec({customMovies, handleShowOptions, navigation, mediaType}) {
  const page = getPageName(mediaType);

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>Custom Recommendations</Text>
      </TouchableOpacity>
      <FlatList
        data={customMovies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({item}) => (
          <Poster
            item={item}
            handleShowOptions={handleShowOptions}
            mediaType={mediaType}
          />
        )}
        horizontal
      />
    </View>
  );
}

export default CustomRec;
