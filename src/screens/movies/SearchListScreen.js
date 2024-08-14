import React from 'react';
import {View} from 'react-native';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../../components/movies/OptionsModal';
import SearchList from '../../components/movies/lists/SearchList';
import styles from '../../styles/styles';

function SearchListScreen() {
  const {
    myList,
    likedList,
    watchedList,
    searchList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useMovieLists();

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
    <View style={styles.sectionContainer}>
      <SearchList
        searchList={searchList}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        handleShowOptions={handleShowOptionsWrapper}
      />
      <OptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
      />
    </View>
  );
}

export default SearchListScreen;
