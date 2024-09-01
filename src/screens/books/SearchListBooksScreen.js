import React from 'react';
import {View} from 'react-native';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import OptionsModal from '../../components/general/OptionsModal';
import SearchList from '../../components/lists/SearchList';
import styles from '../../styles/styles';

/**
 * SearchListBooksScreen Component
 *
 * This component displays a list of search results for books. Users can interact
 * with each book item through a modal that provides options for adding or
 * removing books from their various lists (my list, liked, watched).
 */
function SearchListBooksScreen() {
  // Custom hook to manage movie lists and their state
  const {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useBookLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedBook,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useBookModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  // Wrapper function to pass movie and list type to the handleShowOptions function
  const handleShowOptionsWrapper = book => {
    handleShowOptions(book);
  };

  return (
    <View style={styles.sectionContainer}>
      {/* Component to display the search results */}
      <SearchList
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        handleShowOptions={handleShowOptionsWrapper}
        mediaType="Books"
      />
      {/* Modal for displaying options related to the selected book */}
      <OptionsModal
        selectedItem={selectedBook}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        mediaType="Books"
      />
    </View>
  );
}

export default SearchListBooksScreen;
