import React from 'react';
import {View} from 'react-native';
import useMovieLists from '../../hooks/movies/useMovieLists';
import useMovieModal from '../../hooks/movies/useMovieModal';
import OptionsModal from '../../components/general/OptionsModal';
import SearchList from '../../components/lists/SearchList';
import styles from '../../styles/styles';

/**
 * SearchListScreen Component
 *
 * This screen displays a list of search results for movies. Users can interact
 * with each movie item through a modal that provides options for adding or
 * removing movies from different lists.
 */
function SearchListScreen() {
  // Custom hook to manage movie lists and their state
  const {
    myList,
    likedList,
    watchedList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useMovieLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedMovie,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  // Wrapper function to pass movie and list type to the handleShowOptions function
  const handleShowOptionsWrapper = movie => {
    handleShowOptions(movie);
  };

  return (
    <View style={styles.sectionContainer}>
      {/* Component to display the search results */}
      <SearchList
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        handleShowOptions={handleShowOptionsWrapper}
        mediaType="movies"
      />
      {/* Modal for displaying options related to the selected movie */}
      <OptionsModal
        selectedItem={selectedMovie}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        mediaType="movies"
      />
    </View>
  );
}

export default SearchListScreen;
