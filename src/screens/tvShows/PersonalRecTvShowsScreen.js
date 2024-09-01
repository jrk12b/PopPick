import React, {useEffect} from 'react';
import PersonalRecFull from '../../components/recommendationsFull/PersonalRecFull';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * PersonalRecTvShowsScreen Component
 *
 * This screen displays personalized TV show recommendations based on the user's
 * liked TV shows. It fetches recommendations when the component mounts and
 * provides functionality for managing TV show lists and viewing options for
 * each recommendation.
 */
function PersonalRecTvShowsScreen() {
  const {
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
    personalTvShows,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchRecommendations,
  } = useTvShowLists();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const {
    selectedTvShow,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useTvShowModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      <PersonalRecFull
        personalMovies={personalTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="TV Shows"
      />
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

export default PersonalRecTvShowsScreen;
