import React, {useEffect} from 'react';
import TopRecFull from '../../components/recommendationsFull/TopRecFull';
import useMovieLists from '../../hooks/movies/useMovieLists';
import useMovieModal from '../../hooks/movies/useMovieModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * TopRecScreen Component
 *
 * This screen displays popular movie recommendations. It fetches top
 * movies when the component mounts and manages user interactions with movie
 * options through a modal.
 */
function TopRecScreen() {
  const {
    topMovies,
    myList,
    likedList,
    watchedList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchRecommendations,
  } = useMovieLists();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const {
    selectedMovie,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      <TopRecFull
        topMovies={topMovies}
        handleShowOptions={handleShowOptions}
        mediaType="Movies"
      />
      <OptionsModal
        selectedItem={selectedMovie}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        mediaType="Movies"
      />
    </>
  );
}

export default TopRecScreen;
