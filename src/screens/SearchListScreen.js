import React from 'react';
import {View} from 'react-native';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../components/movies/OptionsModal';
import SearchList from '../components/movies/lists/SearchList';
import fullListStyles from '../styles/fullListStyles';

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
    <View style={fullListStyles.sectionContainer}>
      <SearchList
        searchList={searchList}
        handleShowOptions={handleShowOptionsWrapper}
      />
      <OptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
      />
    </View>
  );
}

export default SearchListScreen;