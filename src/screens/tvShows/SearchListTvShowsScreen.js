import React from 'react';
import {View} from 'react-native';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
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
function SearchListSearchListScreen() {
  // Custom hook to manage movie lists and their state
  const {
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useTvShowLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedTvShow,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useTvShowModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  // Wrapper function to pass movie and list type to the handleShowOptions function
  const handleShowOptionsWrapper = tvShows => {
    handleShowOptions(tvShows);
  };

  return (
    <View style={styles.sectionContainer}>
      {/* Component to display the search results */}
      <SearchList
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        handleShowOptions={handleShowOptionsWrapper}
        mediaType="TV Shows"
      />
      {/* Modal for displaying options related to the selected movie */}
      <OptionsModal
        selectedItem={selectedTvShow}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        mediaType="TV Shows"
      />
    </View>
  );
}

export default SearchListSearchListScreen;
