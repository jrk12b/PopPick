import React, {useEffect} from 'react';
import UpcomingRecFull from '../components/movies/recommendations/UpcomingRecFull';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../components/movies/OptionsModal';

function UpcomingRecScreen() {
  const {
    upcomingMovies,
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
      />
      <OptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
      />
    </>
  );
}

export default UpcomingRecScreen;
