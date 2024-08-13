import React, {useEffect} from 'react';
import TopRecFull from '../components/movies/recommendations/TopRecFull';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../components/movies/OptionsModal';

function TopRecScreen() {
  const {
    topMovies,
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
      <TopRecFull topMovies={topMovies} handleShowOptions={handleShowOptions} />
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

export default TopRecScreen;
