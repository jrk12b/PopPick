import React, {useEffect} from 'react';
import UpcomingRecFull from '../../components/movies/recommendations/recFull/UpcomingRecFull';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../../components/movies/OptionsModal';

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
    listType,
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
        mediaType="movies"
      />
      <OptionsModal
        selectedItem={selectedMovie}
        listType={listType}
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

export default UpcomingRecScreen;
