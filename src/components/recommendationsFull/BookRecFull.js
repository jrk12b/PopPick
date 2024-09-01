import React from 'react';
import {Text, FlatList} from 'react-native';
import styles from '../../styles/styles';
import Poster from '../general/Poster';
import flattenData from '../../hooks/books/flattenData';
import {keyExtractor} from '../../components/general/ListConstants';

/**
 * BookRecFull Component
 *
 * This component renders a FlatList displaying a grid of popular books that have been recommended to the user.
 * Each book is displayed as a Poster component, allowing users to view additional details.
 *
 * Props:
 * - books: Array - A list of popular books recommended to the user.
 * - handleShowOptions: Function - A callback function invoked when a book is selected to display options.
 * - mediaType: String - The type of media being displayed (e.g., 'Books').
 * - bookSubject: String - The subject category of the books being recommended (e.g., 'Fiction').
 *
 * Behavior:
 * - If books is empty, the component displays a message "No books added yet."
 * - Books are displayed in a grid layout with 3 columns, showcasing each book's poster image.
 * - If a specific book is clicked, handleShowOptions is called to provide options for that book.
 * - If books are not yet loaded, a loading message "Loading..." is displayed.
 */
function BookRecFull({books, handleShowOptions, mediaType, bookSubject}) {
  // Show loading message if books data is not yet available
  if (!books) {
    return <Text>Loading...</Text>;
  }

  let flattenedData = [];

  if (mediaType === 'Books' && books?.items) {
    // When mediaType is 'Books', extract the items array from the books object
    flattenedData = flattenData(books);
  } else if (Array.isArray(books)) {
    // For other media types, use the data as is
    flattenedData = books;
  }

  // Set the header title dynamically based on the book subject
  const header = `${bookSubject} Recommendations`;

  return (
    <FlatList
      style={styles.FlatList} // Styles for the FlatList
      data={flattenedData} // Data source for the FlatList
      keyExtractor={keyExtractor} // Unique key extractor function for each item
      renderItem={({item}) => (
        <Poster
          item={item} // Individual book item to render
          handleShowOptions={handleShowOptions} // Function to show options for the book
          mediaType={mediaType} // Media type for context
        />
      )}
      numColumns={3} // Display items in a grid with 3 columns
      columnWrapperStyle={styles.columnWrapper} // Style for the column wrapper
      contentContainerStyle={styles.gridContainer} // Container style for the grid layout
      ListHeaderComponent={
        <Text style={styles.sectionTitle}>
          {header} ({flattenedData.length}){' '}
          {/* Display header with item count */}
        </Text>
      }
      ListEmptyComponent={<Text style={styles.text}>No books added yet.</Text>} // Message if no data available
    />
  );
}

export default BookRecFull;
