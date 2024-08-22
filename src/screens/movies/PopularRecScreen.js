import React, {useEffect} from 'react';
import PopularRecFull from '../../components/recommendationsFull/PopularRecFull';
import useMovieLists from '../../hooks/movies/useMovieLists';
import useMovieModal from '../../hooks/movies/useMovieModal';
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
    popularMovies,
    likedList,
    watchedList,
    myList,
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
      <PopularRecFull
        popularMovies={popularMovies}
        handleShowOptions={handleShowOptions}
        mediaType="movies"
      />
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
    </>
  );
}

export default PopularRecScreen;
