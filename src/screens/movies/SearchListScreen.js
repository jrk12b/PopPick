import React from 'react';
import {View} from 'react-native';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../../components/movies/OptionsModal';
import SearchList from '../../components/movies/lists/SearchList';
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
    searchList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useMovieLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  // Wrapper function to pass movie and list type to the handleShowOptions function
  const handleShowOptionsWrapper = (movie, listType) => {
    handleShowOptions(movie, listType);
  };

  return (
    <View style={styles.sectionContainer}>
      {/* Component to display the search results */}
      <SearchList
        searchList={searchList}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        handleShowOptions={handleShowOptionsWrapper}
        mediaType="movies"
      />
      {/* Modal for displaying options related to the selected movie */}
      <OptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
      />
    </View>
  );
}

export default SearchListScreen;
