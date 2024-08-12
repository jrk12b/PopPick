import React from 'react';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../components/movies/OptionsModal';
import SearchList from '../components/movies/lists/SearchList';

function SearchListScreen() {
  const {searchList, handleAddToMyList, handleAddToLiked, handleAddToWatched} =
    useMovieLists();

  const {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  const handleShowOptionsWrapper = (movie, listType) => {
    handleShowOptions(movie, listType);
  };

  return (
    <>
      <SearchList
        searchList={searchList}
        handleShowOptions={handleShowOptionsWrapper} // Pass wrapped function
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

export default SearchListScreen;
