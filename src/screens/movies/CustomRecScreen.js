import React, {useEffect} from 'react';
import CustomRecFull from '../../components/movies/recommendations/recFull/CustomRecFull';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../../components/movies/OptionsModal';

/**
 * PersonalRecScreen Component
 *
 * This screen displays personalized movie recommendations based on the user's
 * liked movies. It fetches recommendations when the component mounts and
 * provides functionality for managing movie lists and viewing movie options.
 */
function CustomRecScreen() {
  const {
    myList,
    likedList,
    watchedList,
    customMovies,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchCustomRecs,
  } = useMovieLists();

  useEffect(() => {
    fetchCustomRecs();
  }, [fetchCustomRecs]);

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
      <CustomRecFull
        customMovies={customMovies}
        handleShowOptions={handleShowOptions}
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
    </>
  );
}

export default CustomRecScreen;