import React, {useEffect} from 'react';
import PopularRecFull from '../../components/recommendationsFull/PopularRecFull';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * PopularRecScreen Component
 *
 * This screen displays popular movie recommendations. It fetches popular
 * movies when the component mounts and manages user interactions with movie
 * options through a modal.
 */
function PopularRecScreen() {
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

export default PopularRecScreen;
