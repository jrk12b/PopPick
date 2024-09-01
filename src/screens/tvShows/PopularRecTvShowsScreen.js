import React, {useEffect} from 'react';
import PopularRecFull from '../../components/recommendationsFull/PopularRecFull';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * PopularRecTvShowsScreen Component
 *
 * This screen displays popular TV show recommendations. It fetches popular
 * TV shows when the component mounts and manages user interactions with
 * TV show options through a modal. The component integrates with custom
 * hooks to handle the state and logic for the TV show lists and the
 * options modal.
 */
function PopularRecTvShowsScreen() {
  const {
    popularTvShows,
    likedListTvShows,
    watchedListTvShows,
    myListTvShows,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchRecommendations,
  } = useTvShowLists();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const {
    selectedMovie,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useTvShowModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      <PopularRecFull
        popularMovies={popularTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="TV Shows"
      />
      <OptionsModal
        selectedItem={selectedMovie}
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

export default PopularRecTvShowsScreen;
