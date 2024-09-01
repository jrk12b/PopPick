import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';
import flattenData from '../../hooks/books/flattenData';

function BookRec({
  books,
  handleShowOptions,
  navigation,
  mediaType,
  bookSubject,
}) {
  const page = `${bookSubject} Recs`;

  let flattenedData = [];

  if (mediaType === 'Books' && books?.items) {
    // When mediaType is 'books', extract the items array
    flattenedData = flattenData(books);
  } else if (Array.isArray(books)) {
    // For other media types, use the data as is
    flattenedData = books;
  }

  const keyExtractor = item => item.id?.toString() || item.key;

  // Dynamic section title based on bookSubject
  const sectionTitle =
    mediaType === 'Books' && bookSubject
      ? `${bookSubject} Recommendations`
      : 'Fiction Recommendations';

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </TouchableOpacity>
      {flattenedData.length > 0 ? (
        <FlatList
          data={flattenedData}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <Poster
              item={item}
              handleShowOptions={handleShowOptions}
              mediaType={mediaType}
            />
          )}
          horizontal
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
}

export default BookRec;
