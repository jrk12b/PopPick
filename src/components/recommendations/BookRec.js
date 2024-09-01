import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';
import flattenData from '../../hooks/books/flattenData';
import {keyExtractor} from '../../components/general/ListConstants';

/**
 * BookRec Component
 *
 * This component displays a list of book recommendations, allowing users
 * to navigate to a detailed page for more recommendations based on a
 * specific book subject. It conditionally flattens the data structure
 * based on the media type.
 *
 * Props:
 * - books: The data source for the book recommendations, which may include
 *   an 'items' array for book objects.
 * - handleShowOptions: Function to handle showing options for a book.
 * - navigation: Navigation object for navigating to the recommendations page.
 * - mediaType: Specifies the type of media (e.g., 'Books').
 * - bookSubject: The subject/category of the books for recommendations.
 */
function BookRec({
  books,
  handleShowOptions,
  navigation,
  mediaType,
  bookSubject,
}) {
  // Define the page name for navigation based on book subject
  const page = `${bookSubject} Recs`;

  let flattenedData = [];

  // Check the media type and flatten the book data if necessary
  if (mediaType === 'Books' && books?.items) {
    // When mediaType is 'Books', extract the items array and flatten it
    flattenedData = flattenData(books);
  } else if (Array.isArray(books)) {
    // For other media types, use the data as is
    flattenedData = books;
  }

  // Dynamic section title based on bookSubject
  const sectionTitle =
    mediaType === 'Books' && bookSubject
      ? `${bookSubject} Recommendations` // Title for specific book subject
      : 'Fiction Recommendations'; // Default title for fiction recommendations

  return (
    <View style={styles.sectionContainer}>
      {/* Button to navigate to the recommendations page */}
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </TouchableOpacity>

      {/* Render list of books if data is available */}
      {flattenedData.length > 0 ? (
        <FlatList
          data={flattenedData} // Data source for the FlatList
          keyExtractor={keyExtractor} // Function to extract unique keys for each item
          renderItem={({item}) => (
            <Poster
              item={item} // Individual book item to render
              handleShowOptions={handleShowOptions} // Function to show options for the book
              mediaType={mediaType} // Media type for context
            />
          )}
          horizontal // Display list items horizontally
        />
      ) : (
        // Display a message if no data is available
        <Text>No data available</Text>
      )}
    </View>
  );
}

export default BookRec;
