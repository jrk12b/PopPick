import React from 'react';
import LikedListFull from '../../components/listsFull/LikedListFull';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * LikedListTvShowsScreen Component
 *
 * This screen displays the user's list of liked TV shows and provides functionality
 * for managing the list and viewing options for each show. It leverages custom hooks
 * to manage the state of TV show lists and the modal, rendering both the liked shows
 * and a modal for additional actions.
 */
function LikedListTvShowsScreen() {
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

  return (
    <>
      {/* Component to display the list of liked TV shows */}
      <LikedListFull
        likedList={likedListTvShows}
        myList={myListTvShows}
        watchedList={watchedListTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="TV Shows"
      />
      {/* Modal for displaying options related to the selected TV show */}
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
    </>
  );
}

export default LikedListTvShowsScreen;
