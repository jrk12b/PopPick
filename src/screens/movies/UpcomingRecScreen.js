import React, {useEffect} from 'react';
import UpcomingRecFull from '../../components/recommendationsFull/UpcomingRecFull';
import useMovieLists from '../../hooks/movies/useMovieLists';
import useMovieModal from '../../hooks/movies/useMovieModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * UpcomingRecScreen Component
 *
 * This screen displays popular movie recommendations. It fetches upcoming
 * movies when the component mounts and manages user interactions with movie
 * options through a modal.
 */
function UpcomingRecScreen() {
  const {
    upcomingMovies,
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
      <UpcomingRecFull
        upcomingMovies={upcomingMovies}
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

export default UpcomingRecScreen;
