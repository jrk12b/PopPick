import React, {useEffect} from 'react';
import TopRecFull from '../../components/recommendationsFull/TopRecFull';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * TopRecTvShowsScreen Component
 *
 * This screen displays top TV show recommendations. It fetches the top
 * TV shows when the component mounts and manages user interactions
 * with TV show options through a modal.
 */
function TopRecTvShowsScreen() {
  const {
    topTvShows,
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
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
      <TopRecFull
        topMovies={topTvShows}
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

export default TopRecTvShowsScreen;
